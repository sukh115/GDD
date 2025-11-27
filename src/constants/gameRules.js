export const EVENT_THRESHOLD_MIN = 15;
export const EVENT_THRESHOLD_MAX = 30;

export const ACTIONS = {
    TRAIN: {
        exploration: {
            label: 'Train',
            cost: { fatigue: 10 },
            reward: { str: 1, dex: 0, int: 0, luck: 0, karma: 0, gold: 0 },
        },
        awakening: {
            label: 'Slaughter',
            cost: { fatigue: 20 },
            reward: { str: 5, dex: 2, int: 0, luck: 0, karma: -5, gold: 0 }, // Base reward, might scale
        },
    },
    EARN: {
        exploration: {
            label: 'Work',
            cost: { fatigue: 10 },
            reward: { str: 0, dex: 0, int: 0, luck: 0, karma: 0, gold: 10 },
        },
        awakening: {
            label: 'Plunder',
            cost: { fatigue: 20 },
            reward: { str: 0, dex: 0, int: 0, luck: 0, karma: -5, gold: 50 },
        },
    },
    REST: {
        exploration: {
            label: 'Rest',
            cost: { fatigue: -20 }, // Negative cost = recovery
            reward: { str: 0, dex: 0, int: 0, luck: 0, karma: 0, gold: 0 },
        },
        awakening: {
            label: 'Hibernate',
            cost: { fatigue: -50 },
            reward: { str: 0, dex: 0, int: 0, luck: 0, karma: 0, gold: 0 },
        },
    },
    SPECIAL: {
        exploration: {
            label: 'Meditate',
            cost: { fatigue: 5 },
            reward: { str: 0, dex: 0, int: 1, luck: 0, intuition: 1, karma: 1, gold: 0 },
        },
        awakening: {
            label: 'Extort',
            cost: { fatigue: 15 },
            reward: { str: 0, dex: 0, int: 0, luck: 0, karma: -10, gold: 100 }, // High gold, bad karma
        },
    },
};
