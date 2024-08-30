meta:
  id: mhgu
  title: MHGU Save File Parsing
  file-extension: na
  endian: le
  bit-endian: le

seq:
  - id: magic_header
    size: 36
  - id: save_file
    type: save_file
    size: 0x1C

types:
  player:
    instances:
      name:
        pos: 0x23B7D
        type: str
        encoding: utf8
        terminator: 0
      money:
        pos: 0x280F
        type: u4
      hunter_rank:
        pos: 0x28
        type: u2
      equipment:
        pos: 0x62EE
        type: equipment_box
        size: 72000
  equipment_box:
    seq:
      - id: gear_piece
        type: gear_piece
        size: 36
        repeat: eos
  
  gear_piece:
    instances:
        equipment_type: # bit flags, need to parse
          pos: 0x0
          type: b5
          enum: equip_type_class_enum
        equipment_id:
          pos: 0x2
          type:
            switch-on: equipment_type
            cases:
              'equip_type_class_enum::talisman': talisman_types
              'equip_type_class_enum::chest': talisman_types
        transmog_id:
          pos: 0x4
          type: u2
        skill1_name:
          pos: 12
          type: u1
          enum: skill_names_enum
        skill2_name:
          pos: 13
          type: u1
          enum: skill_names_enum
        skill1_value:
          pos: 14
          type: s1
        skill2_value:
          pos: 15
          type: s1
        slots:
          pos: 16
          type: u1
    enums:
      equip_type_class_enum:
          1: head
          2: chest
          3: arms
          4: waist
          5: legs
          6: talisman
          7: greatsword
          8: swordnshield
          9: hammer
          10: lance
          11: heavybowgun
          13: lightbowgun
          14: longsword
          15: switchaxe
          16: gunlance
          17: bow
          18: dualblades
          19: huntinghorn
          20: insectglaive
          21: chargeblade
      skill_names_enum:
          0: none
          1: poison
          2: paralysis
          3: sleep
          4: stun
          5: hearing
          6: wind_space_res
          7: tremor_space_res
          8: bind_space_res
          9: heat_space_res
          10: cold_space_res
          11: coldblooded
          12: hotblooded
          13: anti_dash_theft
          14: def_space_lock
          15: frenzy_space_res
          16: biology
          17: bleeding
          18: attack
          19: defense
          20: health
          21: fire_space_res
          22: water_space_res
          23: thunder_space_res
          24: ice_space_res
          25: dragon_space_res
          26: blight_space_res
          27: fire_space_atk
          28: water_space_atk
          29: thunder_space_atk
          30: ice_space_atk
          31: dragon_space_atk
          32: elemental
          33: status
          34: sharpener
          35: handicraft
          36: sharpness
          37: fencing
          38: grinder
          39: blunt
          40: crit_space_draw
          41: punish_space_draw
          42: sheathing
          43: sheathe_space_sharpen
          44: bladescale
          45: reload_space_spd
          46: recoil
          47: precision
          48: normal_space_up
          49: pierce_space_up
          50: pellet_space_up
          51: heavy_space_up
          52: normal_space_s_plus_
          53: pierce_space_s_plus_
          54: pellet_space_s_plus_
          55: crag_space_s_plus_
          56: clust_space_s_plus_
          57: poison_space_c_plus_
          58: para_space_c_plus_
          59: sleep_space_c_plus_
          60: power_space_c_plus_
          61: elem_space_c_plus_
          62: c_dot_range_space_c_plus_
          63: exhaust_space_c_plus_
          64: blast_space_c_plus_
          65: rapid_space_fire
          66: dead_space_eye
          67: loading
          68: haphazard
          69: ammo_space_saver
          70: expert
          71: tenderizer
          72: chain_space_crit
          73: crit_space_status
          74: crit_space_element
          75: critical_space_up
          76: negative_space_crit
          77: fastcharge
          78: stamina
          79: constitution
          80: stam_space_recov
          81: distance_space_runner
          82: evasion
          83: evade_space_dist
          84: bubble
          85: guard
          86: guard_space_up
          87: ko
          88: stam_space_drain
          89: maestro
          90: artillery
          91: destroyer
          92: bomb_space_boost
          93: gloves_space_off
          94: spirit
          95: unscathed
          96: chance
          97: dragon_space_spirit
          98: potential
          99: survivor
          100: furor
          101: crisis
          102: guts
          103: sense
          104: team_space_player
          105: teamleader
          106: mounting
          107: vault
          108: insight
          109: endurance
          110: prolong_space_sp
          111: psychic
          112: perception
          113: ranger
          114: transporter
          115: protection
          116: hero_space_shield
          117: rec_space_level
          118: rec_space_speed
          119: lasting_space_pwr
          120: wide_dash_range
          121: hunger
          122: gluttony
          123: eating
          124: light_space_eater
          125: carnivore
          126: mycology
          127: botany
          128: combo_space_rate
          129: combo_space_plus
          130: speed_space_setup
          131: gathering
          132: honey
          133: charmer
          134: whim
          135: fate
          136: carving
          137: capturer
          138: bherna
          139: kokoto
          140: pokke
          141: yukumo
          142: soaratorium
          143: flying_space_pub
          144: redhelm
          145: snowbaron
          146: stonefist
          147: drilltusk
          148: dreadqueen
          149: c_dot_beard
          150: silverwind
          151: deadeye
          152: dreadking
          153: thunderlord
          154: grimclaw
          155: hellblade
          156: nightcloak
          157: rustrazor
          158: soulseer
          159: boltreaver
          160: elderfrost
          161: bloodbath
          162: redhelm_space_x
          163: snowbaron_space_x
          164: stonefist_space_x
          165: drilltusk_space_x
          166: dreadqueen_space_x
          167: crystalbeard_space_x
          168: silverwind_space_x
          169: deadeye_space_x
          170: dreadking_space_x
          171: thunderlord_space_x
          172: grimclaw_space_x
          173: hellblade_space_x
          174: nightcloak_space_x
          175: rustrazor_space_x
          176: soulseer_space_x
          177: boltreaver_space_x
          178: elderfrost_space_x
          179: bloodbath_space_x
          180: d_dot__space_fencing
          181: edge_space_lore
          182: powereater
          183: mechanic
          184: brawn
          185: prayer
          186: covert
          187: edgemaster
          188: steadyhand
          189: status_space_res
          190: fury
          191: nimbleness
          192: readiness
          193: resilience
          194: brutality
          195: stalwart
          196: prudence
          197: amplify
          198: hoarding
          199: avarice
          200: anti_dash_kushala
          201: anti_dash_chameleos
          202: anti_dash_teostra
          203: torso_space_up
          204: secret_space_arts
          205: talisman_space_boost


        
  save_file:
    seq:
      - id: slot_magic
        size: 4
      - id: p1_exists
        size: 1
      - id: p2_exists
        size: 1
      - id: p3_exists
        size: 1
    instances:
      p1_offset:
        pos: 0x10
        type: u4
      p2_offset:
        pos: 0x14
        type: u4
      p3_offset:
        pos: 0x18
        type: u4
      player_1:
        io: _root._io
        type: player
        pos: p1_offset + 36
        size: 200000
      player_2:
        io: _root._io
        type: player
        pos: p2_offset + 36
        size: 200000
      player_3:
        io: _root._io
        type: player
        pos: p3_offset + 36
        size: 200000
        
  talisman_types:
    seq:
      - id: talisman_class
        type: u2
        enum: talisman_type_class_enum
    enums:
      talisman_type_class_enum:
        0: none
        1: pawn_talisman
        2: bishop_talisman
        3: knight_talisman
        4: rook_talisman
        5: queen_talisman
        6: king_talisman
        7: dragon_talisman
        8: hero_talisman
        9: legend_talisman
        10: creator_talisman
