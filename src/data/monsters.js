export const MONSTERS = [
    // Tier 1: 0 - 20 Turns (Weak)
    {
        id: 'mon_goblin',
        name: '고블린',
        text: "수풀에서 고블린이 튀어나왔습니다! 조잡한 단검을 들고 있습니다.",
        minTurn: 0,
        maxTurn: 20,
        locations: ['loc_forest', 'loc_dungeon'],
        stats: { str: 7, hp: 25, def: 1 },
        options: [
            {
                label: "전투 개시",
                action: 'START_COMBAT',
                cost: { fatigue: 5 },
                log: "무기를 꺼내들었습니다."
            },
            {
                label: "도망친다 (+10 Fatigue)",
                cost: { fatigue: 10 },
                reward: {},
                log: "허겁지겁 도망쳤습니다. 숨이 찹니다."
            }
        ]
    },
    {
        id: 'mon_slime',
        name: '슬라임',
        text: "끈적거리는 슬라임이 길을 막고 있습니다.",
        minTurn: 0,
        maxTurn: 20,
        locations: ['loc_forest', 'loc_dungeon'],
        stats: { str: 3, hp: 20, def: 0 },
        reward: { gold: 5, exp: 5 },
        options: [
            {
                label: "전투 개시",
                action: 'START_COMBAT',
                cost: { fatigue: 2 },
                log: "슬라임을 향해 돌진합니다."
            },
            {
                label: "도망친다",
                cost: { fatigue: 5 },
                reward: {},
                log: "슬라임의 속도는 느립니다. 쉽게 따돌렸습니다."
            }
        ]
    },
    {
        id: 'mon_rat',
        name: '거대 쥐',
        text: "집채만한 쥐가 이빨을 드러냅니다.",
        minTurn: 0,
        maxTurn: 25,
        locations: ['loc_village', 'loc_dungeon'],
        stats: { str: 5, hp: 30, def: 1 },
        options: [
            {
                label: "전투 개시",
                action: 'START_COMBAT',
                cost: { fatigue: 5 },
                log: "쥐를 잡기 위해 자세를 잡습니다."
            },
            {
                label: "먹이를 던져준다 (-5 Gold)",
                cost: { gold: 5 },
                reward: { karma: 1 },
                log: "쥐가 먹이를 물고 사라집니다."
            }
        ]
    },

    // Tier 2: 21 - 50 Turns (Medium)
    {
        id: 'mon_wolf',
        name: '굶주린 늑대',
        text: "눈이 붉게 충혈된 늑대 무리입니다.",
        minTurn: 21,
        maxTurn: 60,
        locations: ['loc_forest'],
        stats: { str: 15, hp: 80, def: 2 },
        options: [
            {
                label: "전투 개시",
                action: 'START_COMBAT',
                cost: { fatigue: 10 },
                log: "늑대 무리와 대치합니다."
            },
            {
                label: "나무 위로 숨는다 (Dex > 15)",
                reqStats: { dex: 15 },
                cost: { fatigue: 10 },
                reward: {},
                log: "늑대들이 포기하고 돌아갈 때까지 기다렸습니다."
            }
        ]
    },
    {
        id: 'mon_bandit',
        name: '산적',
        text: "산적들이 통행료를 요구합니다.",
        minTurn: 21,
        maxTurn: 100,
        locations: ['loc_forest', 'loc_castle'],
        stats: { str: 20, hp: 100, def: 5 },
        options: [
            {
                label: "돈을 준다 (-30 Gold)",
                cost: { gold: 30 },
                reward: {},
                log: "돈을 주자 산적들이 비웃으며 길을 비켜줍니다."
            },
            {
                label: "전투 개시",
                action: 'START_COMBAT',
                cost: { fatigue: 10 },
                log: "산적들을 향해 검을 뽑습니다."
            }
        ]
    },

    // Tier 3: 51+ Turns (Hard)
    {
        id: 'mon_golem',
        name: '스톤 골렘',
        text: "거대한 바위 덩어리가 움직입니다.",
        minTurn: 51,
        maxTurn: 9999,
        locations: ['loc_dungeon'],
        stats: { str: 40, hp: 300, def: 20 },
        options: [
            {
                label: "전투 개시",
                action: 'START_COMBAT',
                cost: { fatigue: 20 },
                log: "거대한 골렘에게 도전합니다."
            },
            {
                label: "약점을 노린다 (Int > 30)",
                reqStats: { int: 30 },
                cost: { fatigue: 20 },
                reward: { gold: 100, int: 3 },
                log: "마력 핵을 정확히 타격하여 골렘을 멈췄습니다."
            }
        ]
    },
    {
        id: 'mon_dark_knight',
        name: '타락한 기사',
        text: "검은 갑옷을 입은 기사가 길을 막습니다.",
        minTurn: 60,
        maxTurn: 9999,
        locations: ['loc_castle', 'loc_dungeon'],
        stats: { str: 50, hp: 400, def: 30 },
        options: [
            {
                label: "전투 개시",
                action: 'START_COMBAT',
                cost: { fatigue: 20 },
                log: "기사에게 결투를 신청합니다."
            },
            {
                label: "설득한다 (Karma > 20)",
                reqStats: { karma: 20 },
                cost: { fatigue: 10 },
                reward: { bond: 5, reputation: 10 },
                log: "기사는 당신의 고결함에 감복하여 길을 비켜줍니다."
            }
        ]
    }
];
