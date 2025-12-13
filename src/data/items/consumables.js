// ====================================
// 소모품 (Consumables)
// ====================================

export const CONSUMABLES = {
    // --- 회복 ---
    bread: {
        id: 'bread', name: '빵',
        description: 'HP를 10 회복합니다.', price: 5,
        effect: { hp: 10 },
    },
    ration: {
        id: 'ration', name: '비상식량',
        description: 'HP를 20 회복합니다.', price: 15,
        effect: { hp: 20 },
    },
    potion_hp_small: {
        id: 'potion_hp_small', name: '하급 체력 포션',
        description: 'HP를 30 회복합니다.', price: 30,
        effect: { hp: 30 },
    },
    potion_hp_mid: {
        id: 'potion_hp_mid', name: '중급 체력 포션',
        description: 'HP를 60 회복합니다.', price: 80,
        effect: { hp: 60 },
    },
    potion_hp_large: {
        id: 'potion_hp_large', name: '상급 체력 포션',
        description: 'HP를 완전히 회복합니다.', price: 200,
        effect: { hp: 999 },
    },

    // --- 피로 ---
    herb_tea: {
        id: 'herb_tea', name: '허브차',
        description: '피로도를 10 감소시킵니다.', price: 10,
        effect: { fatigue: -10 },
    },
    potion_fatigue: {
        id: 'potion_fatigue', name: '활력제',
        description: '피로도를 30 감소시킵니다.', price: 50,
        effect: { fatigue: -30 },
    },
    energy_elixir: {
        id: 'energy_elixir', name: '정력제',
        description: '피로도를 완전히 제거합니다.', price: 150,
        effect: { fatigue: -999 },
    },

    // --- 복합 ---
    potion_full: {
        id: 'potion_full', name: '만병통치약',
        description: 'HP와 피로도를 완전히 회복합니다.', price: 300,
        effect: { hp: 999, fatigue: -999 },
    },

    // --- 버프 ---
    potion_str: {
        id: 'potion_str', name: '힘의 비약',
        description: '영구적으로 힘 +1.', price: 100,
        effect: { str: 1 },
    },
    potion_dex: {
        id: 'potion_dex', name: '민첩의 비약',
        description: '영구적으로 민첩 +1.', price: 100,
        effect: { dex: 1 },
    },
    potion_int: {
        id: 'potion_int', name: '지혜의 비약',
        description: '영구적으로 지능 +1.', price: 100,
        effect: { int: 1 },
    },
    potion_luck: {
        id: 'potion_luck', name: '행운의 비약',
        description: '영구적으로 행운 +1.', price: 150,
        effect: { luck: 1 },
    },

    // --- 기타 ---
    antidote: {
        id: 'antidote', name: '해독제',
        description: '독 상태를 해제합니다.', price: 30,
        effect: { removeStatus: 'poison' },
    },
    scroll_escape: {
        id: 'scroll_escape', name: '귀환 두루마리',
        description: '마을로 즉시 귀환합니다.', price: 50,
        effect: { teleport: 'village' },
    },
};
