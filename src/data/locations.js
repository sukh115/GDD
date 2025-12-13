// ====================================
// The Awakening - Locations Data
// 지역별 배경 / 이벤트 가중치 / 접근 조건
// ====================================

export const LOCATIONS = {
    // === 초기 접근 가능 지역 ===
    village: {
        id: 'village',
        name: '평화로운 마을',
        description: '모험의 시작점. 안전하고 따뜻한 곳입니다.',
        dangerLevel: 0,
        eventWeights: { relation: 50, combat: 5, special: 15 },
        theme: {
            background: 'linear-gradient(135deg, #2d1f0f 0%, #5c3d2e 50%, #8b5a2b 100%)',
            accent: '#f4a460',
            glass: 'rgba(244, 164, 96, 0.15)',
            particle: '✨',
        },
        // 연결된 모든 지역 (여기서 랜덤 2개 선택)
        connections: ['forest', 'field', 'market'],
        // 접근 조건 (없음 = 누구나)
        accessRequirement: null,
        actions: ['REST', 'WORK', 'TRAIN', 'PRAY', 'SHOP'],
    },

    field: {
        id: 'field',
        name: '들판',
        description: '마을 외곽의 너른 들판. 여행자들이 오갑니다.',
        dangerLevel: 1,
        eventWeights: { relation: 35, combat: 25, special: 10 },
        theme: {
            background: 'linear-gradient(135deg, #1a2f1a 0%, #3d5c3a 50%, #5a7c52 100%)',
            accent: '#7cb342',
            glass: 'rgba(124, 179, 66, 0.15)',
            particle: '🌾',
        },
        connections: ['village', 'forest', 'crossroad'],
        accessRequirement: null,
        actions: ['REST', 'EXPLORE', 'TRAIN'],
    },

    market: {
        id: 'market',
        name: '상인 거리',
        description: '북적이는 시장. 온갖 물건이 거래됩니다.',
        dangerLevel: 0,
        eventWeights: { relation: 60, combat: 0, special: 15 },
        theme: {
            background: 'linear-gradient(135deg, #3d2b1f 0%, #6b4423 50%, #8b6914 100%)',
            accent: '#ffc107',
            glass: 'rgba(255, 193, 7, 0.15)',
            particle: '💰',
        },
        connections: ['village', 'castle'],
        accessRequirement: null,
        actions: ['SHOP', 'WORK', 'REST'],
    },

    forest: {
        id: 'forest',
        name: '어두운 숲',
        description: '안개 자욱한 위험한 숲. 몬스터가 출몰합니다.',
        dangerLevel: 2,
        eventWeights: { relation: 15, combat: 45, special: 10 },
        theme: {
            background: 'linear-gradient(135deg, #0a1a0f 0%, #1a3320 50%, #2d4a35 100%)',
            accent: '#4a7c59',
            glass: 'rgba(74, 124, 89, 0.15)',
            particle: '🌿',
        },
        connections: ['village', 'field', 'dungeon', 'crossroad'],
        accessRequirement: null,
        actions: ['REST', 'EXPLORE', 'HUNT', 'MEDITATE'],
    },

    crossroad: {
        id: 'crossroad',
        name: '갈림길',
        description: '여러 방향으로 나뉘는 교차로. 어디로 갈지 선택해야 합니다.',
        dangerLevel: 1,
        eventWeights: { relation: 30, combat: 20, special: 20 },
        theme: {
            background: 'linear-gradient(135deg, #2c2c2c 0%, #4a4a4a 50%, #696969 100%)',
            accent: '#9e9e9e',
            glass: 'rgba(158, 158, 158, 0.15)',
            particle: '🛤️',
        },
        connections: ['field', 'forest', 'castle', 'mountain'],
        accessRequirement: null,
        actions: ['REST', 'EXPLORE'],
    },

    // === 조건부 접근 지역 ===
    castle: {
        id: 'castle',
        name: '왕성',
        description: '왕국의 중심. 위엄과 권위가 느껴집니다.',
        dangerLevel: 1,
        eventWeights: { relation: 40, combat: 10, special: 20 },
        theme: {
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
            accent: '#4a90d9',
            glass: 'rgba(74, 144, 217, 0.15)',
            particle: '👑',
        },
        connections: ['market', 'crossroad', 'tower'],
        // 조건: 카르마 0 이상 또는 금화 100 이상
        accessRequirement: {
            type: 'OR',
            conditions: [
                { stat: 'karma', min: 0 },
                { resource: 'gold', min: 100 },
            ],
            failMessage: '수상한 자는 왕성에 들어갈 수 없습니다.',
        },
        actions: ['WORK', 'STUDY', 'PRAY', 'SHOP'],
    },

    tower: {
        id: 'tower',
        name: '마탑',
        description: '현자들의 연구소. 신비한 기운이 감돕니다.',
        dangerLevel: 2,
        eventWeights: { relation: 25, combat: 20, special: 30 },
        theme: {
            background: 'linear-gradient(135deg, #1a1a3e 0%, #2e1f4a 50%, #4a2c6a 100%)',
            accent: '#9b59d9',
            glass: 'rgba(155, 89, 217, 0.15)',
            particle: '🔮',
        },
        connections: ['castle', 'dungeon', 'demon_castle'],
        // 조건: 지능 15 이상 또는 MET_SAGE_SPIRIT 플래그
        accessRequirement: {
            type: 'OR',
            conditions: [
                { stat: 'int', min: 15 },
                { flag: 'MET_SAGE_SPIRIT' },
            ],
            failMessage: '마탑은 무지한 자를 받아들이지 않습니다.',
        },
        actions: ['REST', 'STUDY', 'MEDITATE'],
    },

    mountain: {
        id: 'mountain',
        name: '험준한 산',
        description: '거친 산길. 강한 자만이 오를 수 있습니다.',
        dangerLevel: 3,
        eventWeights: { relation: 10, combat: 40, special: 20 },
        theme: {
            background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 50%, #4a6572 100%)',
            accent: '#7f8c8d',
            glass: 'rgba(127, 140, 141, 0.15)',
            particle: '⛰️',
        },
        connections: ['crossroad', 'dungeon', 'hermit_cave'],
        // 조건: 힘 15 이상 또는 민첩 15 이상
        accessRequirement: {
            type: 'OR',
            conditions: [
                { stat: 'str', min: 15 },
                { stat: 'dex', min: 15 },
            ],
            failMessage: '약한 몸으로는 이 산을 오를 수 없습니다.',
        },
        actions: ['REST', 'TRAIN', 'EXPLORE'],
    },

    dungeon: {
        id: 'dungeon',
        name: '고대 던전',
        description: '강력한 마물과 보물이 잠든 위험한 곳.',
        dangerLevel: 3,
        eventWeights: { relation: 5, combat: 55, special: 15 },
        theme: {
            background: 'linear-gradient(135deg, #1a0a1a 0%, #2d1f3d 50%, #4a2c5a 100%)',
            accent: '#9b59b6',
            glass: 'rgba(155, 89, 182, 0.15)',
            particle: '🔥',
        },
        connections: ['forest', 'mountain', 'tower', 'demon_castle'],
        accessRequirement: null, // 누구나 가능 (위험 감수)
        actions: ['REST', 'EXPLORE', 'TRAIN', 'MEDITATE'],
    },

    // === 특수 접근 지역 ===
    hermit_cave: {
        id: 'hermit_cave',
        name: '은자의 동굴',
        description: '세상을 등진 현자가 사는 곳. 극히 드물게 발견됩니다.',
        dangerLevel: 1,
        eventWeights: { relation: 70, combat: 0, special: 30 },
        theme: {
            background: 'linear-gradient(135deg, #1a1a2e 0%, #2a2a3e 50%, #3a3a4e 100%)',
            accent: '#b0bec5',
            glass: 'rgba(176, 190, 197, 0.15)',
            particle: '🧙',
        },
        connections: ['mountain'],
        // 조건: 직감 15 이상
        accessRequirement: {
            type: 'AND',
            conditions: [
                { stat: 'intuition', min: 15 },
            ],
            failMessage: '이 동굴을 찾기엔 직감이 부족합니다.',
        },
        actions: ['REST', 'MEDITATE', 'STUDY'],
    },

    demon_castle: {
        id: 'demon_castle',
        name: '마왕성',
        description: '어둠의 지배자가 거주하는 최종 목적지.',
        dangerLevel: 5,
        eventWeights: { relation: 5, combat: 70, special: 10 },
        theme: {
            background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 50%, #2a0f0f 100%)',
            accent: '#c0392b',
            glass: 'rgba(192, 57, 43, 0.15)',
            particle: '💀',
        },
        connections: ['dungeon', 'tower'],
        // 조건: 턴 50 이상 또는 DEMON_CONTRACT 플래그
        accessRequirement: {
            type: 'OR',
            conditions: [
                { turn: 50 },
                { flag: 'DEMON_CONTRACT' },
            ],
            failMessage: '아직 마왕성에 도전하기엔 이릅니다.',
        },
        actions: ['REST', 'EXPLORE', 'TRAIN'],
    },
};

// === 헬퍼 함수 ===
export const getLocation = (id) => LOCATIONS[id] || LOCATIONS.village;

export const getAllLocations = () => Object.values(LOCATIONS);

/**
 * 접근 조건 체크
 * @param {Object} requirement - 접근 조건
 * @param {Object} state - 게임 상태
 * @returns {Object} { canAccess, failMessage }
 */
export function checkAccessRequirement(requirement, state) {
    if (!requirement) return { canAccess: true };

    const { type, conditions, failMessage } = requirement;

    const results = conditions.map(cond => {
        if (cond.stat) return (state.stats?.[cond.stat] || 0) >= cond.min;
        if (cond.resource) return (state.resources?.[cond.resource] || 0) >= cond.min;
        if (cond.flag) return state.flags?.has?.(cond.flag);
        if (cond.turn) return (state.totalTurnCount || 0) >= cond.turn;
        return false;
    });

    const canAccess = type === 'AND'
        ? results.every(r => r)
        : results.some(r => r);

    return { canAccess, failMessage: canAccess ? null : failMessage };
}

/**
 * 접근 가능한 연결 지역 목록
 * @param {string} locationId - 현재 위치
 * @param {Object} state - 게임 상태
 * @returns {Array} 접근 가능한 지역 목록
 */
export function getAccessibleConnections(locationId, state) {
    const location = getLocation(locationId);

    return location.connections
        .map(id => LOCATIONS[id])
        .filter(Boolean)
        .filter(dest => {
            const { canAccess } = checkAccessRequirement(dest.accessRequirement, state);
            return canAccess;
        });
}
