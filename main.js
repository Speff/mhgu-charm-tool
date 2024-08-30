const outputOptions = ['Do Nothing', 'Mystery Melding', 'Luminous Melding', 'Ancient Melding', 'Fabled Melding', 'Halcyon Melding', 'Juju Melding', 'Dump to CSV' ];
const sortOptions = ['Default Sort', 'Group By Skill 1', 'Group By Skill 2']

let saveFile = null;
let saveSlot = null;
let talismansLoaded = null;

let outputSelected = outputOptions[0];
let sortSelected = sortOptions[0];
let searchString = '';

function cleanSkillName(skillName){
	skillName = skillName.replace('_SPACE_', ' ');
	skillName = skillName.replace('_DOT_', '.');
	skillName = skillName.replace('_DASH_', '-');
	skillName = skillName.replace('_PLUS_', '+');

	return skillName;
};

function generateTalismanCSVDump(talismans){
	let out = '';

	talismans.forEach(function(talisman){
		const slots = talisman.slots;
		const sk1Name = cleanSkillName(Mhgu.GearPiece.SkillNamesEnum[talisman.skill1Name]);
		const sk2Name = cleanSkillName(Mhgu.GearPiece.SkillNamesEnum[talisman.skill2Name]);
		const sk1Val = talisman.skill1Value;
		const sk2Val = talisman.skill2Value;
		const talismanClass = talisman.equipmentId.talismanClass;

		out += ',' + slots;
		out += ',' + sk1Name;
		out += ',' + sk1Val;
		out += ',' + sk2Name;
		out += ',' + sk2Val + '\n';
	});

	return out;
};

function sortTalismans(talismans){
	const talismanGroups = Object.groupBy(talismans, (talisman) => talisman.equipmentId.talismanClass);
	const talismansSorted = [];
	for(let talismanClassId = 1; talismanClassId <= 10; talismanClassId++){
		try{ // Need a try/catch block because user may not own some classes of talismans
			talismansSorted.push(...talismanGroups[talismanClassId]);
		} catch (err) {};
	}

	return talismansSorted;
};

function paginateTalismans(talismans){
	const nPages = Math.ceil(talismans.length / 9.0);
	let talismanListsElement = [];
	for(let i = 0; i < nPages; i++){
		const pageHeaderElement = document.createElement('pre');
		let pageLine = '';
		pageLine += 'Page ' + (i + 1);
		pageLine += ' / ' + Math.ceil(talismans.length/9.0);
		pageHeaderElement.innerHTML = '\n' + pageLine.padStart(39) + '\n';
		
		talismanListsElement.push(pageHeaderElement);
	}

	talismans = sortTalismans(talismans);

	talismans.forEach((talisman, index) => {
		const pageIndex = Math.floor(index / 9.0);
		let linePrinted = ''

		const slots = talisman.slots;
		const sk1Name = cleanSkillName(Mhgu.GearPiece.SkillNamesEnum[talisman.skill1Name]);
		const sk2Name = cleanSkillName(Mhgu.GearPiece.SkillNamesEnum[talisman.skill2Name]);
		const sk1Val = talisman.skill1Value;
		const sk2Val = talisman.skill2Value;
		const talismanClass = talisman.equipmentId.talismanClass;

		linePrinted += sk1Name.padEnd(17);
		linePrinted += Intl.NumberFormat('en-US', {signDisplay: 'exceptZero'}).format(sk1Val).padEnd(4);
		if(sk2Name == 'NONE') linePrinted += ' '.repeat(21);
		else{
			linePrinted += sk2Name.padEnd(17);
			linePrinted += Intl.NumberFormat('en-US', {signDisplay: 'exceptZero'}).format(sk2Val).padEnd(4);
		}

		linePrinted += 'o'.repeat(slots).padEnd(3, '-');

		const lineElement = document.createElement('pre');
		lineElement.classList.add('mb-0', talisman.hasOwnProperty('highlighted') ? 'text-info' : null);
		//if(index % 9 % 2 == 0) lineElement.classList.add('.bg-dark', 'bg-gradient');
		lineElement.innerHTML = linePrinted;
		lineElement.talisman_index = talisman.original_index;
		lineElement.addEventListener('click', (event) => {
			event.originalTarget.classList.toggle('text-info');

			talismanIndex = event.originalTarget.talisman_index;
			if(event.originalTarget.classList.contains('text-info'))
				talismansLoaded[talismanIndex].highlighted = true;
			else
				delete talismansLoaded[talismanIndex].highlighted;
		});
		talismanListsElement[pageIndex].appendChild(lineElement);
	});

	for(let i = 0; i < nPages; i++){
		pageContainer = document.createElement('div');
		pageContainer.classList.add('col', 'col-auto');
		pageContainer.appendChild(talismanListsElement[i]);
		talismanListsElement[i] = pageContainer;
	}

	//const listsContainer = document.createElement('div');
	const listsRow = document.createElement('div');
	//listsContainer.classList.add('container');
	listsRow.classList.add('row', 'justify-content-around');
	listsRow.replaceChildren(...talismanListsElement);
	//listsContainer.appendChild(listsRow);

	return listsRow;
};

function generateSearchbar(outputArea){
	const searchContainer = document.createElement('div');
	const searchHintContainer = document.createElement('div');
	const searchHint = document.createElement('span');
	const searchbar = document.createElement('input');

	searchContainer.setAttribute('id', 'searchContainer');
	searchContainer.classList.add('input-group', 'mt-1', 'd-none');
	searchHintContainer.classList.add('input-group-prepend');
	searchHint.classList.add('input-group-text');
	searchbar.setAttribute('type', 'text');
	searchbar.classList.add('form-control');

	searchHint.innerHTML = 'Search';
	searchbar.addEventListener('keyup', (event) => {
		setSearch(outputArea, event);
	});

	searchHintContainer.replaceChildren(searchHint);
	searchContainer.replaceChildren(searchHintContainer, searchbar);
	return searchContainer;
}

function setNewOutputOption(outputArea, eventDetails){
	outputSelected = eventDetails.originalTarget.value;
	doSelectedOption(outputArea);
};

function setNewSortOption(outputArea, eventDetails){
	sortSelected = eventDetails.originalTarget.value;
	doSelectedOption(outputArea);
};

function setSearch(outputArea, eventDetails){
	searchString = eventDetails.originalTarget.value;
	doSelectedOption(outputArea);
};

function doSelectedOption(outputArea){
	searchContainer = document.getElementById('searchContainer');

	if(outputSelected == 'Do Nothing'){
		searchContainer.classList.add('d-none');
		outputArea.replaceChildren();
		return null;
	}

	if(outputSelected == 'Dump to CSV'){
		searchContainer.classList.add('d-none');
		const talismanDump = generateTalismanCSVDump(talismansLoaded);
		const talismanDumpElement = document.createElement('pre');
		talismanDumpElement.innerText = talismanDump;
		outputArea.replaceChildren(talismanDumpElement);
		return null;
	}

	var talismans;
	searchContainer.classList.remove('d-none');

	if(searchString){
		talismans = talismansLoaded.filter((talisman) => {
			const sk1Name = cleanSkillName(Mhgu.GearPiece.SkillNamesEnum[talisman.skill1Name]);
			const sk2Name = cleanSkillName(Mhgu.GearPiece.SkillNamesEnum[talisman.skill2Name]);
			
			if(sk1Name.toLowerCase().includes(searchString.toLowerCase())) return true;
			if(sk2Name.toLowerCase().includes(searchString.toLowerCase())) return true;
			return false;
		});
	}
	else talismans = talismansLoaded;

	if(outputSelected == 'Juju Melding'){
		outputArea.replaceChildren(paginateTalismans(talismans));
		return null;
	}
}

function loadSaveSlot(slot){
	if     (slot == 1) saveSlot = saveFile.saveFile.player1;
	else if(slot == 2) saveSlot = saveFile.saveFile.player2;
	else if(slot == 3) saveSlot = saveFile.saveFile.player3;
	else               console.log('Invalid slot called' + slot);


	const pDetails = document.getElementById('player-details');
	const pNameLabel = document.createElement('h2');
	const pNameTag = document.createElement('small');
	const outputArea = document.createElement('div');
	outputArea.classList.add('container');
	pNameLabel.innerText = saveSlot.name;
	pNameLabel.classList.add('display-6');
	pNameTag.classList.add('text-body-secondary');
	pNameTag.innerText = ' HR: ' + saveSlot.hunterRank;

	const selectOptionsContainer = document.createElement('div');
	const selectOutputContainer = document.createElement('div');
	const selectSortContainer = document.createElement('div');
	const selectOutput = document.createElement('select')
	const selectSort = document.createElement('select')
	selectOutput.classList.add('form-select', 'form-select-md');
	outputOptions.forEach((option) => {
		const selectOption = document.createElement('option');
		selectOption.innerText = option;
		selectOption.addEventListener('click', (event) => setNewOutputOption(outputArea, event));
		selectOutput.appendChild(selectOption);
	});
	selectSort.classList.add('form-select', 'form-select-md');
	sortOptions.forEach((option) => {
		const selectOption = document.createElement('option');
		selectOption.innerText = option;
		selectOption.addEventListener('click', (event) => setNewSortOption(outputArea, event));
		selectSort.appendChild(selectOption);
	});
	selectOutputContainer.classList.add('col-8', 'mt-2', 'mb-2')
	selectOutputContainer.replaceChildren(selectOutput);
	selectSortContainer.classList.add('col-4', 'mt-2', 'mb-2')
	selectSortContainer.replaceChildren(selectSort);
	selectOptionsContainer.classList.add('row');
	selectOptionsContainer.replaceChildren(selectOutputContainer, selectSortContainer);

	const searchArea = generateSearchbar(outputArea);

	const gear = saveSlot.equipment.gearPiece;
	talismansLoaded = gear.filter((eqpt) => Mhgu.GearPiece.EquipTypeClassEnum[eqpt.equipmentType] == 'TALISMAN');
	talismansLoaded.forEach((talisman, index) => {
		talisman.original_index = index;
	});

	pNameLabel.appendChild(pNameTag);
	pDetails.replaceChildren(...[pNameLabel, selectOptionsContainer, searchArea, outputArea]);
	//document.querySelector('.col-8 > select:nth-child(1) > option:nth-child(7)').click();
};

function loadSaveFile(arrayBuffer){
		saveFile = new Mhgu(new KaitaiStream(arrayBuffer));

	const slotSelect = document.getElementById('char-select-block');
	const pSelectSection = document.getElementById('player-select-section');
	slotSelect.classList.remove('d-none');

	let saveSlotsShown = [];
	if (saveFile.saveFile.p1Exists == 1){
		const save = saveFile.saveFile.player1;

		const pSelectSubSection = document.createElement('div');
		const pSelectForm = document.createElement('input');
		const pSelectLabel = document.createElement('label');
		pSelectSubSection.classList.add('form-check')
		pSelectSubSection.classList.add('form-check-inline')
		pSelectForm.setAttribute('name', 'pSelect');
		pSelectForm.setAttribute('id', 'p1-select');
		pSelectForm.setAttribute('type', 'radio');
		pSelectForm.setAttribute('value', '1');
		pSelectLabel.setAttribute('for', 'p1-select');
		pSelectLabel.innerText = save.name + ' (Slot 1)';
		pSelectForm.addEventListener('click', (event) => { loadSaveSlot(1); });
		pSelectSubSection.appendChild(pSelectForm);
		pSelectSubSection.appendChild(pSelectLabel);
		saveSlotsShown.push(pSelectSubSection);
	};
	if (saveFile.saveFile.p2Exists == 1){
		const save = saveFile.saveFile.player2;

		const pSelectSubSection = document.createElement('div');
		const pSelectForm = document.createElement('input');
		const pSelectLabel = document.createElement('label');
		pSelectSubSection.classList.add('form-check')
		pSelectSubSection.classList.add('form-check-inline')
		pSelectForm.setAttribute('name', 'pSelect');
		pSelectForm.setAttribute('id', 'p2-select');
		pSelectForm.setAttribute('type', 'radio');
		pSelectForm.setAttribute('value', '2');
		pSelectLabel.setAttribute('for', 'p2-select');
		pSelectLabel.innerText = save.name + ' (Slot 2)';
		pSelectForm.addEventListener('click', (event) => { loadSaveSlot(2); });
		pSelectSubSection.appendChild(pSelectForm);
		pSelectSubSection.appendChild(pSelectLabel);
		saveSlotsShown.push(pSelectSubSection);
	};
	if (saveFile.saveFile.p3Exists == 1){
		const save = saveFile.saveFile.player3;

		const pSelectSubSection = document.createElement('div');
		const pSelectForm = document.createElement('input');
		const pSelectLabel = document.createElement('label');
		pSelectSubSection.classList.add('form-check')
		pSelectSubSection.classList.add('form-check-inline')
		pSelectForm.setAttribute('name', 'pSelect');
		pSelectForm.setAttribute('id', 'p3-select');
		pSelectForm.setAttribute('type', 'radio');
		pSelectForm.setAttribute('value', '3');
		pSelectLabel.setAttribute('for', 'p3-select');
		pSelectLabel.innerText = save.name + ' (Slot 3)';
		pSelectForm.addEventListener('click', (event) => { loadSaveSlot(3); });
		pSelectSubSection.appendChild(pSelectForm);
		pSelectSubSection.appendChild(pSelectLabel);
		saveSlotsShown.push(pSelectSubSection);
	};

	pSelectSection.replaceChildren(...saveSlotsShown);

	//document.querySelector('#p1-select').click();
};

document.getElementById('formFileSm').addEventListener('input', (event) => {
	const file = event.target.files[0];
	if(!file) return null;

	reader = new FileReader();
	reader.addEventListener('load', (event) => {
		loadSaveFile(event.target.result);
	});
	reader.readAsArrayBuffer(file);
});

let dragCounter = 0;

document.querySelector('#upload-block').addEventListener('click', (event) => {
	document.getElementById('formFileSm').click();
});

document.querySelector('body').addEventListener('drop', (event) => {
	event.preventDefault();

	dragCounter = 0;
	document.querySelector('#drag-message').classList.remove('text-info');

	console.log('checking dragged')
	if(event.dataTransfer.items.length != 1 || event.dataTransfer.items[0].kind != 'file') return null;

	console.log('init dragged')
	const file = event.dataTransfer.items[0].getAsFile();
	if(!file) return null;

	console.log('init fr')
	reader = new FileReader();
	reader.addEventListener('load', (event) => {
		loadSaveFile(event.target.result);
	});
	reader.readAsArrayBuffer(file);
});
document.querySelector('body').addEventListener('dragover', (event) => {
	event.preventDefault();
});

document.querySelector('body').addEventListener('dragenter', (event) => {
	dragCounter++;
	document.querySelector('#drag-message').classList.add('text-info');
});
document.querySelector('body').addEventListener('dragleave', (event) => {
	dragCounter--;

	if(dragCounter === 0)
		document.querySelector('#drag-message').classList.remove('text-info');
});

//const oReq = new XMLHttpRequest();
//oReq.open('GET', './system', true);
//oReq.responseType = 'arraybuffer';
//
//oReq.onload = function (oEvent) {
//	const arrayBuffer = oReq.response;
//	loadSaveFile(arrayBuffer);
//};
//
//oReq.send(null);
