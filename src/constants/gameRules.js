// ====================================
// The Awakening - Game Rules & Constants
// GDD Version 3.0
// ====================================

// === 이벤트 임계치 ===
export const EVENT_THRESHOLD_MIN = 15;
export const EVENT_THRESHOLD_MAX = 30;

// === 이벤트 타입 확률 ===
export const EVENT_TYPE_WEIGHTS = {
    travel: 60,    // 이동 이벤트
    combat: 20,    // 전투
    relation: 15,  // 인연
    special: 5,    // 기연 (Pity Timer 적용)
};

// === 액션 정의 ===
export const ACTIONS = {
    // 탐색 모드 액션
    exploration: {
        REST: {
            id: 'REST',
            label: '휴식',
            description: '피로를 회복합니다.',
            cost: {},
            reward: { fatigue: -20 },
            locations: ['village', 'forest', 'dungeon'],
        },
        WORK: {
            id: 'WORK',
            label: '일',
            description: '골드를 벌어들입니다.',
            cost: { fatigue: 10 },
            reward: { gold: 15 },
            locations: ['village', 'castle'],
        },
        TRAIN: {
            id: 'TRAIN',
            label: '수련',
            description: '힘을 기릅니다.',
            cost: { fatigue: 15 },
            reward: { str: 1 },
            locations: ['village', 'dungeon'],
        },
        STUDY: {
            id: 'STUDY',
            label: '연구',
            description: '지식을 쌓습니다.',
            cost: { fatigue: 10 },
            reward: { int: 1 },
            locations: ['castle', 'tower'],
        },
        EXPLORE: {
            id: 'EXPLORE',
            label: '탐험',
            description: '주변을 탐험합니다.',
            cost: { fatigue: 20 },
            reward: { dex: 1, gold: 10 },
            locations: ['forest', 'dungeon'],
        },
        PRAY: {
            id: 'PRAY',
            label: '기도',
            description: '신에게 기도합니다.',
            cost: { fatigue: 5 },
            reward: { karma: 3, luck: 1 },
            locations: ['village', 'castle'],
        },
        MEDITATE: {
            id: 'MEDITATE',
            label: '명상',
            description: '직감을 기릅니다.',
            cost: { fatigue: 10 },
            reward: { intuition: 1, karma: 1 },
            locations: ['village', 'tower', 'dungeon'],
        },
        HUNT: {
            id: 'HUNT',
            label: '사냥',
            description: '몬스터를 사냥합니다.',
            cost: { fatigue: 25 },
            reward: { gold: 25, str: 1 },
            locations: ['forest'],
        },
        SHOP: {
            id: 'SHOP',
            label: '상점',
            description: '상점을 방문합니다.',
            cost: {},
            reward: {},
            special: 'openShop',
            locations: ['village', 'castle'],
        },
    },

    // 각성 모드 액션
    awakening: {
        SLAUGHTER: {
            id: 'SLAUGHTER',
            label: '학살',
            description: '주민들을 학살합니다. Karma에 비례해 강해집니다.',
            cost: { fatigue: 30 },
            reward: { str: 5, dex: 2, karma: -10 },
            locations: ['village', 'castle'],
        },
        EXTORT: {
            id: 'EXTORT',
            label: '징수',
            description: '주민들에게서 강제로 자원을 빼앗습니다.',
            cost: { fatigue: 15 },
            reward: { gold: 100, karma: -5 },
            locations: ['village', 'castle'],
        },
        PILLAGE: {
            id: 'PILLAGE',
            label: '약탈',
            description: '상점을 약탈합니다.',
            cost: { fatigue: 20 },
            reward: { gold: 200, karma: -15 },
            special: 'pillageShop',
            locations: ['village', 'castle'],
        },
        HIBERNATE: {
            id: 'HIBERNATE',
            label: '동면',
            description: '긴 휴식. 체력 완전 회복, Bond 대량 증가.',
            cost: {},
            reward: { hp: 100, fatigue: -100, bond: 10 },
            locations: ['village', 'forest', 'castle', 'dungeon', 'tower', 'demon_castle'],
        },
        GLUTTONY: {
            id: 'GLUTTONY',
            label: '폭식',
            description: '적의 능력을 흡수합니다. (희귀)',
            cost: { fatigue: 50 },
            reward: { str: 3, dex: 3, int: 3 },
            special: 'absorbAbility',
            locations: ['dungeon', 'demon_castle'],
        },
        FINAL_BATTLE: {
            id: 'FINAL_BATTLE',
            label: '최후의 결전',
            description: '용사와 마왕 연합군과의 최종 전투.',
            cost: {},
            reward: {},
            special: 'startFinalBattle',
            locations: ['demon_castle'],
        },
    },
};

// === 엔딩 조건 상수 ===
export const ENDING_THRESHOLDS = {
    TYCOON_GOLD: 1000,         // 거상 엔딩 골드
    USURPER_REPUTATION: 50,    // 찬탈자 엔딩 명성
    SAGE_INT: 50,              // 대현자 엔딩 지능
    WARRIOR_GOD_STR: 50,       // 무신 엔딩 힘
    COMMONER_MAX_TURNS: 30,    // 소시민 엔딩 최대 턴
    AWAKENING_BOND_HIGH: 50,   // 각성 패배 시 True Ending Bond
};

// === 전투 공식 ===
export const COMBAT_FORMULAS = {
    playerDamage: (str, weaponAtk = 0) => str + weaponAtk,
    critChance: (luck) => luck * 0.01,
    dodgeChance: (dex) => dex * 0.005,
    fleeChance: (dex) => 0.5 + (dex * 0.01),
};
