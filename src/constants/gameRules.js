export const EVENT_THRESHOLD_MIN = 15;
export const EVENT_THRESHOLD_MAX = 30;

export const ACTIONS = {
    TRAIN: {
        exploration: {
            label: '수련',
            cost: { fatigue: 10 },
            reward: { str: 1, dex: 0, int: 0, luck: 0, karma: 0, gold: 0 },
        },
        awakening: {
            label: '도살',
            cost: { fatigue: 20 },
            reward: { str: 5, dex: 2, int: 0, luck: 0, karma: -5, gold: 0 },
        },
    },
    EARN: {
        exploration: {
            label: '일',
            cost: { fatigue: 10 },
            reward: { str: 0, dex: 0, int: 0, luck: 0, karma: 0, gold: 10 },
        },
        awakening: {
            label: '약탈',
            cost: { fatigue: 20 },
            reward: { str: 0, dex: 0, int: 0, luck: 0, karma: -5, gold: 50 },
        },
    },
    REST: {
        exploration: {
            label: '휴식',
            cost: { fatigue: -20 },
            reward: { str: 0, dex: 0, int: 0, luck: 0, karma: 0, gold: 0 },
        },
        awakening: {
            label: '긴 휴식',
            cost: { fatigue: -50 },
            reward: { str: 0, dex: 0, int: 0, luck: 0, karma: 0, gold: 0 },
        },
    },
    SPECIAL: {
        exploration: {
            label: '명상',
            cost: { fatigue: 5 },
            reward: { str: 0, dex: 0, int: 1, luck: 0, intuition: 1, karma: 1, gold: 0 },
        },
        awakening: {
            label: '착취',
            cost: { fatigue: 15 },
            reward: { str: 0, dex: 0, int: 0, luck: 0, karma: -10, gold: 100 },
        },
    },
};
