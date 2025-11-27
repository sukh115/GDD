export const EVENTS = [
    {
        id: 'evt_merchant',
        type: 'relation',
        text: "떠돌이 상인이 수상한 물약을 권합니다.",
        options: [
            {
                label: "구매한다 (-10 Gold)",
                cost: { gold: 10 },
                reward: { fatigue: -20 },
                log: "물약을 마시니 피로가 씻은 듯이 사라집니다."
            },
            {
                label: "무시한다",
                cost: {},
                reward: {},
                log: "상인을 무시하고 갈 길을 갑니다."
            },
            {
                label: "강탈한다 (+Karma 하락)",
                cost: { fatigue: 5 },
                reward: { gold: 50, karma: -10 },
                log: "상인을 위협해 돈을 뺏었습니다. 양심이 찔립니다."
            }
        ],
        weight: 10
    },
    {
        id: 'evt_goblin',
        type: 'combat',
        text: "수풀에서 고블린이 튀어나왔습니다! 조잡한 단검을 들고 있습니다.",
        options: [
            {
                label: "싸운다 (Str > 5)",
                reqStats: { str: 5 },
                cost: { fatigue: 10 },
                reward: { gold: 5, str: 1 },
                log: "고블린을 제압하고 전리품을 챙겼습니다."
            },
            {
                label: "도망친다 (+10 Fatigue)",
                cost: { fatigue: 10 },
                reward: {},
                log: "허겁지겁 도망쳤습니다. 숨이 찹니다."
            }
        ],
        weight: 8
    },
    {
        id: 'evt_shrine',
        type: 'special',
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
    }
];