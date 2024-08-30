// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['kaitai-struct/KaitaiStream'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('kaitai-struct/KaitaiStream'));
  } else {
    root.Mhgu = factory(root.KaitaiStream);
  }
}(typeof self !== 'undefined' ? self : this, function (KaitaiStream) {
var Mhgu = (function() {
  function Mhgu(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

    this._read();
  }
  Mhgu.prototype._read = function() {
    this.magicHeader = this._io.readBytes(36);
    this._raw_saveFile = this._io.readBytes(28);
    var _io__raw_saveFile = new KaitaiStream(this._raw_saveFile);
    this.saveFile = new SaveFile(_io__raw_saveFile, this, this._root);
  }

  var TalismanTypes = Mhgu.TalismanTypes = (function() {
    TalismanTypes.TalismanTypeClassEnum = Object.freeze({
      NONE: 0,
      PAWN_TALISMAN: 1,
      BISHOP_TALISMAN: 2,
      KNIGHT_TALISMAN: 3,
      ROOK_TALISMAN: 4,
      QUEEN_TALISMAN: 5,
      KING_TALISMAN: 6,
      DRAGON_TALISMAN: 7,
      HERO_TALISMAN: 8,
      LEGEND_TALISMAN: 9,
      CREATOR_TALISMAN: 10,

      0: "NONE",
      1: "PAWN_TALISMAN",
      2: "BISHOP_TALISMAN",
      3: "KNIGHT_TALISMAN",
      4: "ROOK_TALISMAN",
      5: "QUEEN_TALISMAN",
      6: "KING_TALISMAN",
      7: "DRAGON_TALISMAN",
      8: "HERO_TALISMAN",
      9: "LEGEND_TALISMAN",
      10: "CREATOR_TALISMAN",
    });

    function TalismanTypes(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    TalismanTypes.prototype._read = function() {
      this.talismanClass = this._io.readU2le();
    }

    return TalismanTypes;
  })();

  var Player = Mhgu.Player = (function() {
    function Player(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Player.prototype._read = function() {
    }
    Object.defineProperty(Player.prototype, 'name', {
      get: function() {
        if (this._m_name !== undefined)
          return this._m_name;
        var _pos = this._io.pos;
        this._io.seek(146301);
        this._m_name = KaitaiStream.bytesToStr(this._io.readBytesTerm(0, false, true, true), "utf8");
        this._io.seek(_pos);
        return this._m_name;
      }
    });
    Object.defineProperty(Player.prototype, 'money', {
      get: function() {
        if (this._m_money !== undefined)
          return this._m_money;
        var _pos = this._io.pos;
        this._io.seek(10255);
        this._m_money = this._io.readU4le();
        this._io.seek(_pos);
        return this._m_money;
      }
    });
    Object.defineProperty(Player.prototype, 'hunterRank', {
      get: function() {
        if (this._m_hunterRank !== undefined)
          return this._m_hunterRank;
        var _pos = this._io.pos;
        this._io.seek(40);
        this._m_hunterRank = this._io.readU2le();
        this._io.seek(_pos);
        return this._m_hunterRank;
      }
    });
    Object.defineProperty(Player.prototype, 'equipment', {
      get: function() {
        if (this._m_equipment !== undefined)
          return this._m_equipment;
        var _pos = this._io.pos;
        this._io.seek(25326);
        this._raw__m_equipment = this._io.readBytes(72000);
        var _io__raw__m_equipment = new KaitaiStream(this._raw__m_equipment);
        this._m_equipment = new EquipmentBox(_io__raw__m_equipment, this, this._root);
        this._io.seek(_pos);
        return this._m_equipment;
      }
    });

    return Player;
  })();

  var EquipmentBox = Mhgu.EquipmentBox = (function() {
    function EquipmentBox(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    EquipmentBox.prototype._read = function() {
      this._raw_gearPiece = [];
      this.gearPiece = [];
      var i = 0;
      while (!this._io.isEof()) {
        this._raw_gearPiece.push(this._io.readBytes(36));
        var _io__raw_gearPiece = new KaitaiStream(this._raw_gearPiece[this._raw_gearPiece.length - 1]);
        this.gearPiece.push(new GearPiece(_io__raw_gearPiece, this, this._root));
        i++;
      }
    }

    return EquipmentBox;
  })();

  var GearPiece = Mhgu.GearPiece = (function() {
    GearPiece.EquipTypeClassEnum = Object.freeze({
      HEAD: 1,
      CHEST: 2,
      ARMS: 3,
      WAIST: 4,
      LEGS: 5,
      TALISMAN: 6,
      GREATSWORD: 7,
      SWORDNSHIELD: 8,
      HAMMER: 9,
      LANCE: 10,
      HEAVYBOWGUN: 11,
      LIGHTBOWGUN: 13,
      LONGSWORD: 14,
      SWITCHAXE: 15,
      GUNLANCE: 16,
      BOW: 17,
      DUALBLADES: 18,
      HUNTINGHORN: 19,
      INSECTGLAIVE: 20,
      CHARGEBLADE: 21,

      1: "HEAD",
      2: "CHEST",
      3: "ARMS",
      4: "WAIST",
      5: "LEGS",
      6: "TALISMAN",
      7: "GREATSWORD",
      8: "SWORDNSHIELD",
      9: "HAMMER",
      10: "LANCE",
      11: "HEAVYBOWGUN",
      13: "LIGHTBOWGUN",
      14: "LONGSWORD",
      15: "SWITCHAXE",
      16: "GUNLANCE",
      17: "BOW",
      18: "DUALBLADES",
      19: "HUNTINGHORN",
      20: "INSECTGLAIVE",
      21: "CHARGEBLADE",
    });

    GearPiece.SkillNamesEnum = Object.freeze({
      NONE: 0,
      POISON: 1,
      PARALYSIS: 2,
      SLEEP: 3,
      STUN: 4,
      HEARING: 5,
      WIND_SPACE_RES: 6,
      TREMOR_SPACE_RES: 7,
      BIND_SPACE_RES: 8,
      HEAT_SPACE_RES: 9,
      COLD_SPACE_RES: 10,
      COLDBLOODED: 11,
      HOTBLOODED: 12,
      ANTI_DASH_THEFT: 13,
      DEF_SPACE_LOCK: 14,
      FRENZY_SPACE_RES: 15,
      BIOLOGY: 16,
      BLEEDING: 17,
      ATTACK: 18,
      DEFENSE: 19,
      HEALTH: 20,
      FIRE_SPACE_RES: 21,
      WATER_SPACE_RES: 22,
      THUNDER_SPACE_RES: 23,
      ICE_SPACE_RES: 24,
      DRAGON_SPACE_RES: 25,
      BLIGHT_SPACE_RES: 26,
      FIRE_SPACE_ATK: 27,
      WATER_SPACE_ATK: 28,
      THUNDER_SPACE_ATK: 29,
      ICE_SPACE_ATK: 30,
      DRAGON_SPACE_ATK: 31,
      ELEMENTAL: 32,
      STATUS: 33,
      SHARPENER: 34,
      HANDICRAFT: 35,
      SHARPNESS: 36,
      FENCING: 37,
      GRINDER: 38,
      BLUNT: 39,
      CRIT_SPACE_DRAW: 40,
      PUNISH_SPACE_DRAW: 41,
      SHEATHING: 42,
      SHEATHE_SPACE_SHARPEN: 43,
      BLADESCALE: 44,
      RELOAD_SPACE_SPD: 45,
      RECOIL: 46,
      PRECISION: 47,
      NORMAL_SPACE_UP: 48,
      PIERCE_SPACE_UP: 49,
      PELLET_SPACE_UP: 50,
      HEAVY_SPACE_UP: 51,
      NORMAL_SPACE_S_PLUS_: 52,
      PIERCE_SPACE_S_PLUS_: 53,
      PELLET_SPACE_S_PLUS_: 54,
      CRAG_SPACE_S_PLUS_: 55,
      CLUST_SPACE_S_PLUS_: 56,
      POISON_SPACE_C_PLUS_: 57,
      PARA_SPACE_C_PLUS_: 58,
      SLEEP_SPACE_C_PLUS_: 59,
      POWER_SPACE_C_PLUS_: 60,
      ELEM_SPACE_C_PLUS_: 61,
      C_DOT_RANGE_SPACE_C_PLUS_: 62,
      EXHAUST_SPACE_C_PLUS_: 63,
      BLAST_SPACE_C_PLUS_: 64,
      RAPID_SPACE_FIRE: 65,
      DEAD_SPACE_EYE: 66,
      LOADING: 67,
      HAPHAZARD: 68,
      AMMO_SPACE_SAVER: 69,
      EXPERT: 70,
      TENDERIZER: 71,
      CHAIN_SPACE_CRIT: 72,
      CRIT_SPACE_STATUS: 73,
      CRIT_SPACE_ELEMENT: 74,
      CRITICAL_SPACE_UP: 75,
      NEGATIVE_SPACE_CRIT: 76,
      FASTCHARGE: 77,
      STAMINA: 78,
      CONSTITUTION: 79,
      STAM_SPACE_RECOV: 80,
      DISTANCE_SPACE_RUNNER: 81,
      EVASION: 82,
      EVADE_SPACE_DIST: 83,
      BUBBLE: 84,
      GUARD: 85,
      GUARD_SPACE_UP: 86,
      KO: 87,
      STAM_SPACE_DRAIN: 88,
      MAESTRO: 89,
      ARTILLERY: 90,
      DESTROYER: 91,
      BOMB_SPACE_BOOST: 92,
      GLOVES_SPACE_OFF: 93,
      SPIRIT: 94,
      UNSCATHED: 95,
      CHANCE: 96,
      DRAGON_SPACE_SPIRIT: 97,
      POTENTIAL: 98,
      SURVIVOR: 99,
      FUROR: 100,
      CRISIS: 101,
      GUTS: 102,
      SENSE: 103,
      TEAM_SPACE_PLAYER: 104,
      TEAMLEADER: 105,
      MOUNTING: 106,
      VAULT: 107,
      INSIGHT: 108,
      ENDURANCE: 109,
      PROLONG_SPACE_SP: 110,
      PSYCHIC: 111,
      PERCEPTION: 112,
      RANGER: 113,
      TRANSPORTER: 114,
      PROTECTION: 115,
      HERO_SPACE_SHIELD: 116,
      REC_SPACE_LEVEL: 117,
      REC_SPACE_SPEED: 118,
      LASTING_SPACE_PWR: 119,
      WIDE_DASH_RANGE: 120,
      HUNGER: 121,
      GLUTTONY: 122,
      EATING: 123,
      LIGHT_SPACE_EATER: 124,
      CARNIVORE: 125,
      MYCOLOGY: 126,
      BOTANY: 127,
      COMBO_SPACE_RATE: 128,
      COMBO_SPACE_PLUS: 129,
      SPEED_SPACE_SETUP: 130,
      GATHERING: 131,
      HONEY: 132,
      CHARMER: 133,
      WHIM: 134,
      FATE: 135,
      CARVING: 136,
      CAPTURER: 137,
      BHERNA: 138,
      KOKOTO: 139,
      POKKE: 140,
      YUKUMO: 141,
      SOARATORIUM: 142,
      FLYING_SPACE_PUB: 143,
      REDHELM: 144,
      SNOWBARON: 145,
      STONEFIST: 146,
      DRILLTUSK: 147,
      DREADQUEEN: 148,
      C_DOT_BEARD: 149,
      SILVERWIND: 150,
      DEADEYE: 151,
      DREADKING: 152,
      THUNDERLORD: 153,
      GRIMCLAW: 154,
      HELLBLADE: 155,
      NIGHTCLOAK: 156,
      RUSTRAZOR: 157,
      SOULSEER: 158,
      BOLTREAVER: 159,
      ELDERFROST: 160,
      BLOODBATH: 161,
      REDHELM_SPACE_X: 162,
      SNOWBARON_SPACE_X: 163,
      STONEFIST_SPACE_X: 164,
      DRILLTUSK_SPACE_X: 165,
      DREADQUEEN_SPACE_X: 166,
      CRYSTALBEARD_SPACE_X: 167,
      SILVERWIND_SPACE_X: 168,
      DEADEYE_SPACE_X: 169,
      DREADKING_SPACE_X: 170,
      THUNDERLORD_SPACE_X: 171,
      GRIMCLAW_SPACE_X: 172,
      HELLBLADE_SPACE_X: 173,
      NIGHTCLOAK_SPACE_X: 174,
      RUSTRAZOR_SPACE_X: 175,
      SOULSEER_SPACE_X: 176,
      BOLTREAVER_SPACE_X: 177,
      ELDERFROST_SPACE_X: 178,
      BLOODBATH_SPACE_X: 179,
      D_DOT__SPACE_FENCING: 180,
      EDGE_SPACE_LORE: 181,
      POWEREATER: 182,
      MECHANIC: 183,
      BRAWN: 184,
      PRAYER: 185,
      COVERT: 186,
      EDGEMASTER: 187,
      STEADYHAND: 188,
      STATUS_SPACE_RES: 189,
      FURY: 190,
      NIMBLENESS: 191,
      READINESS: 192,
      RESILIENCE: 193,
      BRUTALITY: 194,
      STALWART: 195,
      PRUDENCE: 196,
      AMPLIFY: 197,
      HOARDING: 198,
      AVARICE: 199,
      ANTI_DASH_KUSHALA: 200,
      ANTI_DASH_CHAMELEOS: 201,
      ANTI_DASH_TEOSTRA: 202,
      TORSO_SPACE_UP: 203,
      SECRET_SPACE_ARTS: 204,
      TALISMAN_SPACE_BOOST: 205,

      0: "NONE",
      1: "POISON",
      2: "PARALYSIS",
      3: "SLEEP",
      4: "STUN",
      5: "HEARING",
      6: "WIND_SPACE_RES",
      7: "TREMOR_SPACE_RES",
      8: "BIND_SPACE_RES",
      9: "HEAT_SPACE_RES",
      10: "COLD_SPACE_RES",
      11: "COLDBLOODED",
      12: "HOTBLOODED",
      13: "ANTI_DASH_THEFT",
      14: "DEF_SPACE_LOCK",
      15: "FRENZY_SPACE_RES",
      16: "BIOLOGY",
      17: "BLEEDING",
      18: "ATTACK",
      19: "DEFENSE",
      20: "HEALTH",
      21: "FIRE_SPACE_RES",
      22: "WATER_SPACE_RES",
      23: "THUNDER_SPACE_RES",
      24: "ICE_SPACE_RES",
      25: "DRAGON_SPACE_RES",
      26: "BLIGHT_SPACE_RES",
      27: "FIRE_SPACE_ATK",
      28: "WATER_SPACE_ATK",
      29: "THUNDER_SPACE_ATK",
      30: "ICE_SPACE_ATK",
      31: "DRAGON_SPACE_ATK",
      32: "ELEMENTAL",
      33: "STATUS",
      34: "SHARPENER",
      35: "HANDICRAFT",
      36: "SHARPNESS",
      37: "FENCING",
      38: "GRINDER",
      39: "BLUNT",
      40: "CRIT_SPACE_DRAW",
      41: "PUNISH_SPACE_DRAW",
      42: "SHEATHING",
      43: "SHEATHE_SPACE_SHARPEN",
      44: "BLADESCALE",
      45: "RELOAD_SPACE_SPD",
      46: "RECOIL",
      47: "PRECISION",
      48: "NORMAL_SPACE_UP",
      49: "PIERCE_SPACE_UP",
      50: "PELLET_SPACE_UP",
      51: "HEAVY_SPACE_UP",
      52: "NORMAL_SPACE_S_PLUS_",
      53: "PIERCE_SPACE_S_PLUS_",
      54: "PELLET_SPACE_S_PLUS_",
      55: "CRAG_SPACE_S_PLUS_",
      56: "CLUST_SPACE_S_PLUS_",
      57: "POISON_SPACE_C_PLUS_",
      58: "PARA_SPACE_C_PLUS_",
      59: "SLEEP_SPACE_C_PLUS_",
      60: "POWER_SPACE_C_PLUS_",
      61: "ELEM_SPACE_C_PLUS_",
      62: "C_DOT_RANGE_SPACE_C_PLUS_",
      63: "EXHAUST_SPACE_C_PLUS_",
      64: "BLAST_SPACE_C_PLUS_",
      65: "RAPID_SPACE_FIRE",
      66: "DEAD_SPACE_EYE",
      67: "LOADING",
      68: "HAPHAZARD",
      69: "AMMO_SPACE_SAVER",
      70: "EXPERT",
      71: "TENDERIZER",
      72: "CHAIN_SPACE_CRIT",
      73: "CRIT_SPACE_STATUS",
      74: "CRIT_SPACE_ELEMENT",
      75: "CRITICAL_SPACE_UP",
      76: "NEGATIVE_SPACE_CRIT",
      77: "FASTCHARGE",
      78: "STAMINA",
      79: "CONSTITUTION",
      80: "STAM_SPACE_RECOV",
      81: "DISTANCE_SPACE_RUNNER",
      82: "EVASION",
      83: "EVADE_SPACE_DIST",
      84: "BUBBLE",
      85: "GUARD",
      86: "GUARD_SPACE_UP",
      87: "KO",
      88: "STAM_SPACE_DRAIN",
      89: "MAESTRO",
      90: "ARTILLERY",
      91: "DESTROYER",
      92: "BOMB_SPACE_BOOST",
      93: "GLOVES_SPACE_OFF",
      94: "SPIRIT",
      95: "UNSCATHED",
      96: "CHANCE",
      97: "DRAGON_SPACE_SPIRIT",
      98: "POTENTIAL",
      99: "SURVIVOR",
      100: "FUROR",
      101: "CRISIS",
      102: "GUTS",
      103: "SENSE",
      104: "TEAM_SPACE_PLAYER",
      105: "TEAMLEADER",
      106: "MOUNTING",
      107: "VAULT",
      108: "INSIGHT",
      109: "ENDURANCE",
      110: "PROLONG_SPACE_SP",
      111: "PSYCHIC",
      112: "PERCEPTION",
      113: "RANGER",
      114: "TRANSPORTER",
      115: "PROTECTION",
      116: "HERO_SPACE_SHIELD",
      117: "REC_SPACE_LEVEL",
      118: "REC_SPACE_SPEED",
      119: "LASTING_SPACE_PWR",
      120: "WIDE_DASH_RANGE",
      121: "HUNGER",
      122: "GLUTTONY",
      123: "EATING",
      124: "LIGHT_SPACE_EATER",
      125: "CARNIVORE",
      126: "MYCOLOGY",
      127: "BOTANY",
      128: "COMBO_SPACE_RATE",
      129: "COMBO_SPACE_PLUS",
      130: "SPEED_SPACE_SETUP",
      131: "GATHERING",
      132: "HONEY",
      133: "CHARMER",
      134: "WHIM",
      135: "FATE",
      136: "CARVING",
      137: "CAPTURER",
      138: "BHERNA",
      139: "KOKOTO",
      140: "POKKE",
      141: "YUKUMO",
      142: "SOARATORIUM",
      143: "FLYING_SPACE_PUB",
      144: "REDHELM",
      145: "SNOWBARON",
      146: "STONEFIST",
      147: "DRILLTUSK",
      148: "DREADQUEEN",
      149: "C_DOT_BEARD",
      150: "SILVERWIND",
      151: "DEADEYE",
      152: "DREADKING",
      153: "THUNDERLORD",
      154: "GRIMCLAW",
      155: "HELLBLADE",
      156: "NIGHTCLOAK",
      157: "RUSTRAZOR",
      158: "SOULSEER",
      159: "BOLTREAVER",
      160: "ELDERFROST",
      161: "BLOODBATH",
      162: "REDHELM_SPACE_X",
      163: "SNOWBARON_SPACE_X",
      164: "STONEFIST_SPACE_X",
      165: "DRILLTUSK_SPACE_X",
      166: "DREADQUEEN_SPACE_X",
      167: "CRYSTALBEARD_SPACE_X",
      168: "SILVERWIND_SPACE_X",
      169: "DEADEYE_SPACE_X",
      170: "DREADKING_SPACE_X",
      171: "THUNDERLORD_SPACE_X",
      172: "GRIMCLAW_SPACE_X",
      173: "HELLBLADE_SPACE_X",
      174: "NIGHTCLOAK_SPACE_X",
      175: "RUSTRAZOR_SPACE_X",
      176: "SOULSEER_SPACE_X",
      177: "BOLTREAVER_SPACE_X",
      178: "ELDERFROST_SPACE_X",
      179: "BLOODBATH_SPACE_X",
      180: "D_DOT__SPACE_FENCING",
      181: "EDGE_SPACE_LORE",
      182: "POWEREATER",
      183: "MECHANIC",
      184: "BRAWN",
      185: "PRAYER",
      186: "COVERT",
      187: "EDGEMASTER",
      188: "STEADYHAND",
      189: "STATUS_SPACE_RES",
      190: "FURY",
      191: "NIMBLENESS",
      192: "READINESS",
      193: "RESILIENCE",
      194: "BRUTALITY",
      195: "STALWART",
      196: "PRUDENCE",
      197: "AMPLIFY",
      198: "HOARDING",
      199: "AVARICE",
      200: "ANTI_DASH_KUSHALA",
      201: "ANTI_DASH_CHAMELEOS",
      202: "ANTI_DASH_TEOSTRA",
      203: "TORSO_SPACE_UP",
      204: "SECRET_SPACE_ARTS",
      205: "TALISMAN_SPACE_BOOST",
    });

    function GearPiece(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    GearPiece.prototype._read = function() {
    }
    Object.defineProperty(GearPiece.prototype, 'equipmentType', {
      get: function() {
        if (this._m_equipmentType !== undefined)
          return this._m_equipmentType;
        var _pos = this._io.pos;
        this._io.seek(0);
        this._m_equipmentType = this._io.readBitsIntLe(5);
        this._io.seek(_pos);
        return this._m_equipmentType;
      }
    });
    Object.defineProperty(GearPiece.prototype, 'skill1Value', {
      get: function() {
        if (this._m_skill1Value !== undefined)
          return this._m_skill1Value;
        var _pos = this._io.pos;
        this._io.seek(14);
        this._m_skill1Value = this._io.readS1();
        this._io.seek(_pos);
        return this._m_skill1Value;
      }
    });
    Object.defineProperty(GearPiece.prototype, 'slots', {
      get: function() {
        if (this._m_slots !== undefined)
          return this._m_slots;
        var _pos = this._io.pos;
        this._io.seek(16);
        this._m_slots = this._io.readU1();
        this._io.seek(_pos);
        return this._m_slots;
      }
    });
    Object.defineProperty(GearPiece.prototype, 'skill2Value', {
      get: function() {
        if (this._m_skill2Value !== undefined)
          return this._m_skill2Value;
        var _pos = this._io.pos;
        this._io.seek(15);
        this._m_skill2Value = this._io.readS1();
        this._io.seek(_pos);
        return this._m_skill2Value;
      }
    });
    Object.defineProperty(GearPiece.prototype, 'transmogId', {
      get: function() {
        if (this._m_transmogId !== undefined)
          return this._m_transmogId;
        var _pos = this._io.pos;
        this._io.seek(4);
        this._m_transmogId = this._io.readU2le();
        this._io.seek(_pos);
        return this._m_transmogId;
      }
    });
    Object.defineProperty(GearPiece.prototype, 'equipmentId', {
      get: function() {
        if (this._m_equipmentId !== undefined)
          return this._m_equipmentId;
        var _pos = this._io.pos;
        this._io.seek(2);
        switch (this.equipmentType) {
        case Mhgu.GearPiece.EquipTypeClassEnum.TALISMAN:
          this._m_equipmentId = new TalismanTypes(this._io, this, this._root);
          break;
        case Mhgu.GearPiece.EquipTypeClassEnum.CHEST:
          this._m_equipmentId = new TalismanTypes(this._io, this, this._root);
          break;
        }
        this._io.seek(_pos);
        return this._m_equipmentId;
      }
    });
    Object.defineProperty(GearPiece.prototype, 'skill2Name', {
      get: function() {
        if (this._m_skill2Name !== undefined)
          return this._m_skill2Name;
        var _pos = this._io.pos;
        this._io.seek(13);
        this._m_skill2Name = this._io.readU1();
        this._io.seek(_pos);
        return this._m_skill2Name;
      }
    });
    Object.defineProperty(GearPiece.prototype, 'skill1Name', {
      get: function() {
        if (this._m_skill1Name !== undefined)
          return this._m_skill1Name;
        var _pos = this._io.pos;
        this._io.seek(12);
        this._m_skill1Name = this._io.readU1();
        this._io.seek(_pos);
        return this._m_skill1Name;
      }
    });

    return GearPiece;
  })();

  var SaveFile = Mhgu.SaveFile = (function() {
    function SaveFile(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    SaveFile.prototype._read = function() {
      this.slotMagic = this._io.readBytes(4);
      this.p1Exists = this._io.readBytes(1);
      this.p2Exists = this._io.readBytes(1);
      this.p3Exists = this._io.readBytes(1);
    }
    Object.defineProperty(SaveFile.prototype, 'player1', {
      get: function() {
        if (this._m_player1 !== undefined)
          return this._m_player1;
        var io = this._root._io;
        var _pos = io.pos;
        io.seek((this.p1Offset + 36));
        this._raw__m_player1 = io.readBytes(200000);
        var _io__raw__m_player1 = new KaitaiStream(this._raw__m_player1);
        this._m_player1 = new Player(_io__raw__m_player1, this, this._root);
        io.seek(_pos);
        return this._m_player1;
      }
    });
    Object.defineProperty(SaveFile.prototype, 'p2Offset', {
      get: function() {
        if (this._m_p2Offset !== undefined)
          return this._m_p2Offset;
        var _pos = this._io.pos;
        this._io.seek(20);
        this._m_p2Offset = this._io.readU4le();
        this._io.seek(_pos);
        return this._m_p2Offset;
      }
    });
    Object.defineProperty(SaveFile.prototype, 'p3Offset', {
      get: function() {
        if (this._m_p3Offset !== undefined)
          return this._m_p3Offset;
        var _pos = this._io.pos;
        this._io.seek(24);
        this._m_p3Offset = this._io.readU4le();
        this._io.seek(_pos);
        return this._m_p3Offset;
      }
    });
    Object.defineProperty(SaveFile.prototype, 'player2', {
      get: function() {
        if (this._m_player2 !== undefined)
          return this._m_player2;
        var io = this._root._io;
        var _pos = io.pos;
        io.seek((this.p2Offset + 36));
        this._raw__m_player2 = io.readBytes(200000);
        var _io__raw__m_player2 = new KaitaiStream(this._raw__m_player2);
        this._m_player2 = new Player(_io__raw__m_player2, this, this._root);
        io.seek(_pos);
        return this._m_player2;
      }
    });
    Object.defineProperty(SaveFile.prototype, 'p1Offset', {
      get: function() {
        if (this._m_p1Offset !== undefined)
          return this._m_p1Offset;
        var _pos = this._io.pos;
        this._io.seek(16);
        this._m_p1Offset = this._io.readU4le();
        this._io.seek(_pos);
        return this._m_p1Offset;
      }
    });
    Object.defineProperty(SaveFile.prototype, 'player3', {
      get: function() {
        if (this._m_player3 !== undefined)
          return this._m_player3;
        var io = this._root._io;
        var _pos = io.pos;
        io.seek((this.p3Offset + 36));
        this._raw__m_player3 = io.readBytes(200000);
        var _io__raw__m_player3 = new KaitaiStream(this._raw__m_player3);
        this._m_player3 = new Player(_io__raw__m_player3, this, this._root);
        io.seek(_pos);
        return this._m_player3;
      }
    });

    return SaveFile;
  })();

  return Mhgu;
})();
return Mhgu;
}));
