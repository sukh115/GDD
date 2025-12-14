// ====================================
// The Awakening - Actions Data
// 탐색/각성 모드 액션 정의
// ====================================

// === 탐색 모드 액션 ===
export const EXPLORATION_ACTIONS = {
    REST: {
        id: 'REST',
        label: '휴식',
        description: '피로를 회복합니다.',
        icon: '🛏️',
        cost: {},
        reward: { fatigue: -20 },
    },
    WORK: {
        id: 'WORK',
        label: '일',
        description: '골드를 벌어들입니다.',
        icon: '💼',
        cost: { fatigue: 10 },
        reward: { gold: 15 },
    },
    TRAIN: {
        id: 'TRAIN',
        label: '수련',
        description: '힘을 기릅니다.',
        icon: '⚔️',
        cost: { fatigue: 15 },
        reward: { str: 1 },
    },
    STUDY: {
        id: 'STUDY',
        label: '연구',
        description: '지식을 쌓습니다.',
        icon: '📚',
        cost: { fatigue: 10 },
        reward: { int: 1 },
    },
    EXPLORE: {
        id: 'EXPLORE',
        label: '탐험',
        description: '주변을 탐험합니다.',
        icon: '🔍',
        cost: { fatigue: 20 },
        reward: { dex: 1, gold: 10 },
    },
    PRAY: {
        id: 'PRAY',
        label: '기도',
        description: '신에게 기도합니다.',
        icon: '🙏',
        cost: { fatigue: 5 },
        reward: { karma: 3, luck: 1 },
    },
    MEDITATE: {
        id: 'MEDITATE',
        label: '명상',
        description: '직감을 기릅니다.',
        icon: '🧘',
        cost: { fatigue: 10 },
        reward: { intuition: 1, karma: 1 },
    },
    HUNT: {
        id: 'HUNT',
        label: '사냥',
        description: '몬스터를 사냥합니다.',
        icon: '🏹',
        cost: { fatigue: 25 },
        reward: { gold: 25, str: 1 },
    },
    SHOP: {
        id: 'SHOP',
        label: '상점',
        description: '상점을 방문합니다.',
        icon: '🛒',
        cost: {},
        reward: {},
        special: 'openShop',
    },
};

// === 각성 모드 액션 ===
export const AWAKENING_ACTIONS = {
    // 사람이 있는 곳에서만 (village, market, castle)
    SLAUGHTER: {
        id: 'SLAUGHTER',
        label: '학살',
        description: '주민들을 학살합니다.',
        icon: '💀',
        cost: { fatigue: 30 },
        reward: { str: 5, dex: 2, karma: -10 },
        locations: ['village', 'market', 'castle'],
    },
    EXTORT: {
        id: 'EXTORT',
        label: '징수',
        description: '주민들에게서 강제로 자원을 빼앗습니다.',
        icon: '💰',
        cost: { fatigue: 15 },
        reward: { gold: 100, karma: -5 },
        locations: ['village', 'market', 'castle'],
    },
    PILLAGE: {
        id: 'PILLAGE',
        label: '약탈',
        description: '상점을 약탈합니다.',
        icon: '🔥',
        cost: { fatigue: 20 },
        reward: { gold: 200, karma: -15 },
        special: 'pillageShop',
        locations: ['village', 'market'],
    },
    // 어디서든 가능
    HIBERNATE: {
        id: 'HIBERNATE',
        label: '동면',
        description: '긴 휴식. 체력 완전 회복.',
        icon: '🌙',
        cost: {},
        reward: { hp: 100, fatigue: -100, bond: 10 },
        locations: null, // 어디서든
    },
    // 몬스터 있는 곳에서만
    GLUTTONY: {
        id: 'GLUTTONY',
        label: '폭식',
        description: '적의 능력을 흡수합니다.',
        icon: '👹',
        cost: { fatigue: 50 },
        reward: { str: 3, dex: 3, int: 3 },
        special: 'absorbAbility',
        locations: ['forest', 'dungeon', 'mountain', 'demon_castle'],
    },
    // 자연 파괴
    DEVASTATE: {
        id: 'DEVASTATE',
        label: '파괴',
        description: '주변을 황폐화시킵니다.',
        icon: '🌪️',
        cost: { fatigue: 40 },
        reward: { str: 3, karma: -8 },
        locations: ['forest', 'field', 'mountain'],
    },
    // 마왕성에서만
    FINAL_BATTLE: {
        id: 'FINAL_BATTLE',
        label: '최후의 결전',
        description: '용사와 마왕 연합군과의 최종 전투.',
        icon: '⚡',
        cost: {},
        reward: {},
        special: 'startFinalBattle',
        locations: ['demon_castle'],
    },
};

// === 통합 ===
export const ACTIONS = {
    exploration: EXPLORATION_ACTIONS,
    awakening: AWAKENING_ACTIONS,
};

// === 헬퍼 함수 ===
export const getAction = (id, phase = 'exploration') => {
    const pool = phase === 'awakening' ? AWAKENING_ACTIONS : EXPLORATION_ACTIONS;
    return pool[id] || null;
};

export const getActionsForLocation = (locationActions, phase = 'exploration') => {
    const pool = phase === 'awakening' ? AWAKENING_ACTIONS : EXPLORATION_ACTIONS;
    return locationActions.map(id => pool[id]).filter(Boolean);
};

/**
 * 각성 모드 지역별 액션 필터
 * @param {string} locationId - 현재 위치
 * @returns {Array} 사용 가능한 각성 액션 목록
 */
export const getAwakeningActionsForLocation = (locationId) => {
    return Object.values(AWAKENING_ACTIONS).filter(action => {
        // locations가 null이면 어디서든 가능
        if (action.locations === null) return true;
        // locations 배열에 현재 위치가 포함되어 있으면 가능
        return action.locations?.includes(locationId);
    });
};
