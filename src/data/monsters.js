export const MONSTERS = [
    // Tier 1: 0 - 20 Turns (Weak)
    {
        id: 'mon_slime',
        name: '슬라임',
        text: "끈적거리는 슬라임이 길을 막고 있습니다.",
        minTurn: 0,
        maxTurn: 20,
        stats: { str: 3, hp: 20 },
        reward: { gold: 5, exp: 5 }, // exp is placeholder for future
        options: [
            {
                label: "밟아버린다 (Str > 3)",
                reqStats: { str: 3 },
                cost: { fatigue: 5 },
                reward: { gold: 5, str: 1 },
                log: "슬라임을 밟아서 터뜨렸습니다. 신발이 더러워졌습니다."
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
        stats: { str: 5, hp: 30 },
        options: [
            {
                label: "싸운다 (Str > 5)",
                reqStats: { str: 5 },
                cost: { fatigue: 10 },
                reward: { gold: 8, dex: 1 },
                log: "쥐를 잡았습니다. 고기는 먹을 수 없을 것 같습니다."
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
        stats: { str: 15, hp: 80 },
        options: [
            {
                label: "맞서 싸운다 (Str > 15)",
                reqStats: { str: 15 },
                cost: { fatigue: 20, hp: -10 }, // Take damage
                reward: { gold: 20, str: 2 },
                log: "치열한 전투 끝에 늑대들을 물리쳤습니다."
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
        stats: { str: 20, hp: 100 },
        options: [
            {
                label: "돈을 준다 (-30 Gold)",
                cost: { gold: 30 },
                reward: {},
                log: "돈을 주자 산적들이 비웃으며 길을 비켜줍니다."
            },
            {
                label: "정의구현 (Str > 20)",
                reqStats: { str: 20 },
                cost: { fatigue: 25 },
                reward: { gold: 50, karma: 5, reputation: 5 },
                log: "산적들을 소탕하고 현상금을 챙겼습니다."
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
        stats: { str: 40, hp: 300 },
        options: [
            {
                label: "부순다 (Str > 40)",
                reqStats: { str: 40 },
                cost: { fatigue: 40 },
                reward: { gold: 100, str: 5 },
                log: "골렘이 무너져 내립니다. 희귀한 광석을 얻었습니다."
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
        stats: { str: 50, hp: 400 },
        options: [
            {
                label: "결투 신청 (Str > 50)",
                reqStats: { str: 50 },
                cost: { fatigue: 50, hp: -30 },
                reward: { gold: 200, reputation: 20, str: 5 },
                log: "기사의 투구가 땅에 떨어집니다. 명예로운 승리입니다."
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
