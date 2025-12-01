export const EVENTS = [
    {
        id: 'evt_merchant',
        type: 'relation',
        locations: ['loc_forest', 'loc_castle', 'loc_dungeon'],
        text: "떠돌이 상인이 짐을 풀고 있습니다.",
        options: [
            {
                label: "거래한다",
                action: "OPEN_SHOP",
                cost: {},
                reward: {}
            },
            {
                label: "무시한다",
                cost: {},
                reward: {},
                log: "상인을 지나쳐 갑니다."
            }
        ],
        weight: 10
    },
    {
        id: 'evt_shrine',
        type: 'special',
        locations: ['loc_forest', 'loc_dungeon'],
        text: "오래된 성소를 발견했습니다. 기이한 기운이 느껴집니다.",
        options: [
            {
                label: "기도한다 (-20 Fatigue)",
                cost: {},
                reward: { fatigue: -20, karma: 5 },
                log: "마음이 평온해집니다."
            },
            {
                label: "성물을 훔친다 (+100 Gold)",
                cost: {},
                reward: { gold: 100, karma: -20 },
                log: "성물을 훔쳤습니다. 등골이 서늘합니다."
            }
        ],
        weight: 5
    },
    {
        id: "evt_awakening_001",
        type: "relation",
        text: "그림자들이 당신에게 속삭입니다...",
        options: [
            {
                label: "귀기울인다.",
                action: "listen_shadows"
            },
            {
                label: "저항한다.",
                action: "resist_shadows"
            }
        ],
        requirements: {
            phase: "awakening"
        },
        weight: 10
    },
    {
        id: "evt_special_001",
        type: "special",
        text: "어둠 속에서 빛나는 희귀한 유물을 발견했습니다.",
        options: [
            {
                label: "가져간다.",
                action: "take_artifact",
                reward: { blue_gem: 1 }
            }
        ],
        requirements: {},
        weight: 1
    },
    // --- New Events ---
    {
        id: 'evt_lost_child',
        type: 'relation',
        locations: ['loc_village'],
        text: "울고 있는 아이를 발견했습니다.",
        options: [
            {
                label: "부모를 찾아준다 (-10 Fatigue)",
                reward: { karma: 10, reputation: 5, fatigue: 10 },
                log: "아이의 부모를 찾아주었습니다. 마을 사람들이 고마워합니다."
            },
            {
                label: "무시한다",
                reward: { karma: -5 },
                log: "아이를 외면하고 지나갑니다."
            }
        ],
        weight: 8
    },
    {
        id: 'evt_beggar',
        type: 'relation',
        locations: ['loc_village', 'loc_castle'],
        text: "거지가 구걸을 하고 있습니다.",
        options: [
            {
                label: "적선한다 (-10 Gold)",
                cost: { gold: 10 },
                reward: { karma: 5, reputation: 2 },
                log: "거지에게 동전을 던져주었습니다."
            },
            {
                label: "쫓아낸다",
                reward: { karma: -5, reputation: -2 },
                log: "거지를 쫓아냈습니다."
            }
        ],
        weight: 8
    },
    {
        id: 'evt_wild_dog',
        type: 'combat',
        locations: ['loc_village', 'loc_forest'],
        text: "사나운 들개가 길을 막습니다!",
        options: [
            {
                label: "싸운다",
                action: "COMBAT",
                cost: { hp: 10, fatigue: 5 },
                reward: { exp: 10 },
                log: "들개를 쫓아냈지만 상처를 입었습니다."
            },
            {
                label: "먹이를 던져준다 (-1 Ration)",
                cost: { item: 'ration_dried' },
                reward: { karma: 2 },
                log: "들개가 먹이를 물고 사라집니다."
            }
        ],
        weight: 6
    },
    {
        id: 'evt_mysterious_spring',
        type: 'special',
        locations: ['loc_forest'],
        text: "신비한 기운이 감도는 샘물을 발견했습니다.",
        options: [
            {
                label: "마신다",
                reward: { hp: 30, fatigue: -30 },
                log: "상쾌한 기분이 듭니다. 체력과 피로도가 회복됩니다."
            },
            {
                label: "지나친다",
                log: "의심스러운 샘물을 지나칩니다."
            }
        ],
        weight: 5
    },
    {
        id: 'evt_fallen_adventurer',
        type: 'special',
        locations: ['loc_dungeon', 'loc_forest'],
        text: "쓰러진 모험가의 시체를 발견했습니다...",
        options: [
            {
                label: "뒤진다",
                reward: { gold: 50, karma: -5 },
                log: "주머니에서 골드를 챙겼습니다."
            },
            {
                label: "묻어준다 (-20 Fatigue)",
                reward: { karma: 10, fatigue: 20 },
                log: "모험가를 묻어주었습니다. 마음이 무겁지만 뿌듯합니다."
            }
        ],
        weight: 4
    },
    {
        id: 'evt_trap_pit',
        type: 'hazard',
        locations: ['loc_dungeon', 'loc_forest'],
        text: "갑자기 바닥이 꺼집니다!",
        options: [
            {
                label: "낙법을 시도한다 (Dex)",
                reward: { hp: -10 },
                log: "간신히 충격을 줄였지만 다쳤습니다."
            }
        ],
        weight: 5
    },
    {
        id: 'evt_ancient_inscription',
        type: 'special',
        locations: ['loc_dungeon'],
        text: "알 수 없는 고대어가 적힌 비석입니다.",
        options: [
            {
                label: "해석을 시도한다 (Int)",
                reward: { intuition: 1, fatigue: 10 },
                log: "머리가 지끈거리지만 새로운 지식을 얻었습니다."
            },
            {
                label: "무시한다",
                log: "읽을 수 없는 글자입니다."
            }
        ],
        weight: 3
    },
    {
        id: 'evt_wandering_bard',
        type: 'relation',
        locations: ['loc_village', 'loc_castle'],
        text: "음유시인이 노래를 부르고 있습니다.",
        options: [
            {
                label: "노래를 듣는다 (-10 Fatigue)",
                reward: { fatigue: -10, reputation: 2 },
                log: "노래를 들으며 휴식을 취했습니다."
            },
            {
                label: "팁을 준다 (-5 Gold)",
                cost: { gold: 5 },
                reward: { reputation: 5, karma: 2 },
                log: "음유시인이 감사를 표합니다."
            }
        ],
        weight: 6
    },
    {
        id: 'evt_guard_patrol',
        type: 'relation',
        locations: ['loc_castle'],
        text: "경비병들이 순찰을 돌고 있습니다.",
        options: [
            {
                label: "인사한다",
                reward: { reputation: 2 },
                log: "경비병들이 가볍게 목례합니다."
            },
            {
                label: "숨는다",
                reward: { threat: 5 },
                log: "수상하게 여긴 경비병들의 눈초리를 받았습니다."
            }
        ],
        weight: 7
    },
    {
        id: 'evt_noble_carriage',
        type: 'relation',
        locations: ['loc_castle'],
        text: "귀족의 마차가 지나갑니다.",
        options: [
            {
                label: "길을 비킨다",
                reward: { reputation: 1 },
                log: "마차가 지나갑니다."
            },
            {
                label: "길을 막는다",
                reward: { reputation: -10, threat: 10 },
                log: "호위병들에게 위협을 받았습니다."
            }
        ],
        weight: 4
    },
    {
        id: 'evt_dark_ritual',
        type: 'special',
        locations: ['loc_dungeon'],
        text: "음산한 의식의 흔적을 발견했습니다.",
        options: [
            {
                label: "흔적을 조사한다",
                reward: { threat: 10, intuition: 2 },
                log: "불길한 예감이 듭니다. 위협도가 증가했습니다."
            },
            {
                label: "성수를 뿌린다",
                cost: { item: 'holy_water' },
                reward: { karma: 10, threat: -5 },
                log: "사악한 기운이 정화되었습니다."
            }
        ],
        weight: 3
    },
    {
        id: 'evt_goblin_thief',
        type: 'combat',
        locations: ['loc_forest', 'loc_dungeon'],
        text: "고블린 도둑이 당신의 주머니를 노립니다!",
        options: [
            {
                label: "공격한다",
                reward: { gold: 10, hp: -5 },
                log: "고블린을 물리치고 훔친 물건을 되찾았습니다."
            },
            {
                label: "돈을 주고 보낸다 (-20 Gold)",
                cost: { gold: 20 },
                log: "고블린이 돈을 챙겨 달아납니다."
            }
        ],
        weight: 5
    },
    {
        id: 'evt_storm',
        type: 'hazard',
        locations: ['loc_village', 'loc_forest', 'loc_castle'],
        text: "갑작스러운 폭풍우가 몰아칩니다!",
        options: [
            {
                label: "비를 피한다",
                reward: { fatigue: 10 },
                log: "비를 피하느라 시간이 지체되었습니다."
            },
            {
                label: "강행군한다",
                reward: { hp: -10, fatigue: 20 },
                log: "비바람을 뚫고 갔지만 지쳤습니다."
            }
        ],
        weight: 4
    },
    {
        id: 'evt_treasure_chest',
        type: 'special',
        locations: ['loc_dungeon'],
        text: "낡은 보물상자가 있습니다.",
        options: [
            {
                label: "연다",
                reward: { gold: 100 },
                log: "상자 안에서 금화를 발견했습니다!"
            },
            {
                label: "함정인지 확인한다 (Int)",
                reward: { intuition: 1 },
                log: "함정은 없는 것 같습니다."
            }
        ],
        weight: 3
    },
    {
        id: 'evt_training_ground',
        type: 'relation',
        locations: ['loc_castle'],
        text: "병사들이 훈련하는 연병장입니다.",
        options: [
            {
                label: "같이 훈련한다 (-20 Fatigue)",
                reward: { str: 1, fatigue: 20 },
                log: "땀을 흘리며 힘을 길렀습니다."
            },
            {
                label: "구경한다",
                log: "병사들의 훈련을 지켜봅니다."
            }
        ],
        weight: 5
    },
    {
        id: 'evt_library',
        type: 'relation',
        locations: ['loc_castle'],
        text: "왕립 도서관입니다.",
        options: [
            {
                label: "책을 읽는다 (-10 Fatigue)",
                reward: { int: 1, fatigue: 10 },
                log: "새로운 지식을 쌓았습니다."
            }
        ],
        weight: 4
    },
    {
        id: 'evt_gambler',
        type: 'relation',
        locations: ['loc_village'],
        text: "도박사가 내기를 제안합니다.",
        options: [
            {
                label: "내기한다 (-50 Gold)",
                cost: { gold: 50 },
                reward: { gold: 100 },
                log: "운이 좋았습니다! (임시: 무조건 승리)"
            },
            {
                label: "거절한다",
                log: "도박을 거절했습니다."
            }
        ],
        weight: 4
    },
    {
        id: 'evt_black_cat',
        type: 'special',
        locations: ['loc_village'],
        text: "검은 고양이가 앞을 가로지릅니다.",
        options: [
            {
                label: "지나가게 둔다",
                reward: { luck: 1 },
                log: "고양이가 당신을 빤히 쳐다보다 사라집니다."
            },
            {
                label: "쫓아낸다",
                reward: { luck: -1 },
                log: "고양이가 하악질을 하며 도망갑니다."
            }
        ],
        weight: 3
    },
    {
        id: 'evt_broken_cart',
        type: 'relation',
        locations: ['loc_forest'],
        text: "수레가 진흙탕에 빠져있습니다.",
        options: [
            {
                label: "도와준다 (Str)",
                reward: { karma: 5, str: 1, fatigue: 10 },
                log: "힘을 써서 수레를 빼내주었습니다."
            },
            {
                label: "무시한다",
                reward: { karma: -2 },
                log: "바쁜 척 지나갑니다."
            }
        ],
        weight: 5
    },
    {
        id: 'evt_ghost_whisper',
        type: 'special',
        locations: ['loc_dungeon'],
        text: "어디선가 흐느끼는 소리가 들립니다...",
        options: [
            {
                label: "귀를 기울인다",
                reward: { intuition: 2, threat: 5 },
                log: "원한 서린 목소리가 들립니다."
            },
            {
                label: "귀를 막는다",
                reward: { fatigue: 5 },
                log: "공포에 질려 서둘러 자리를 뜹니다."
            }
        ],
        weight: 4
    }
];