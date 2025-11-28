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
    EXPLORE: {
        exploration: {
            label: '탐험',
            cost: { fatigue: 15 },
            reward: { str: 0, dex: 1, int: 0, luck: 1, karma: 0, gold: 0 },
        },
        awakening: {
            label: '정찰',
            cost: { fatigue: 10 },
            reward: { str: 0, dex: 2, int: 0, luck: 0, karma: 0, gold: 0 },
        },
    },
    PRAY: {
        exploration: {
            label: '기도',
            cost: { fatigue: 5 },
            reward: { str: 0, dex: 0, int: 0, luck: 1, karma: 2, gold: 0 },
        },
        awakening: {
            label: '저주',
            cost: { fatigue: 20 },
            reward: { str: 0, dex: 0, int: 0, luck: 0, karma: -5, gold: 0 },
        },
    },
    HUNT: {
        exploration: {
            label: '사냥',
            cost: { fatigue: 20 },
            reward: { str: 1, dex: 1, int: 0, luck: 0, karma: 0, gold: 15 },
        },
        awakening: {
            label: '학살',
            cost: { fatigue: 30 },
            reward: { str: 3, dex: 1, int: 0, luck: 0, karma: -5, gold: 30 },
        },
    },
    RESEARCH: {
        exploration: {
            label: '연구',
            cost: { fatigue: 10 },
            reward: { str: 0, dex: 0, int: 2, luck: 0, karma: 0, gold: 0 },
        },
        awakening: {
            label: '금기 연구',
            cost: { fatigue: 20 },
            reward: { str: 0, dex: 0, int: 3, luck: 0, karma: -5, gold: 0 },
        },
    },
    PATROL: {
        exploration: {
            label: '순찰',
            cost: { fatigue: 15 },
            reward: { str: 0, dex: 0, int: 0, luck: 0, karma: 1, reputation: 2, gold: 5 },
        },
        awakening: {
            label: '검문',
            cost: { fatigue: 10 },
            reward: { str: 0, dex: 0, int: 0, luck: 0, karma: -2, reputation: 0, gold: 20 },
        },
    },
};
