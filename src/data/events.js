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
                action: "take_artifact"
            }
        ],
        requirements: {},
        weight: 1
    }
];