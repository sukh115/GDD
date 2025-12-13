// ====================================
// 무기 (Weapons)
// ====================================

export const WEAPONS = {
    // === 검 ===
    sword_rusty: {
        id: 'sword_rusty', name: '녹슨 검', slot: 'weapon',
        description: '녹이 슨 낡은 검.', price: 20,
        stats: { str: 2 },
    },
    sword_iron: {
        id: 'sword_iron', name: '철검', slot: 'weapon',
        description: '기본적인 철제 검.', price: 100,
        stats: { str: 5 },
    },
    sword_steel: {
        id: 'sword_steel', name: '강철검', slot: 'weapon',
        description: '단단한 강철로 만든 검.', price: 300,
        stats: { str: 10 },
    },
    sword_silver: {
        id: 'sword_silver', name: '은검', slot: 'weapon',
        description: '언데드에게 효과적인 은제 검.', price: 450,
        stats: { str: 8, luck: 3 },
        bonusVs: ['undead'],
    },
    sword_magic: {
        id: 'sword_magic', name: '마법검', slot: 'weapon',
        description: '마력이 깃든 검.', price: 800,
        stats: { str: 15, int: 5 },
    },
    sword_dragon: {
        id: 'sword_dragon', name: '용검', slot: 'weapon',
        description: '용의 비늘로 단조한 검.', price: 1500,
        stats: { str: 25 },
    },

    // === 단검 ===
    dagger_basic: {
        id: 'dagger_basic', name: '단검', slot: 'weapon',
        description: '빠른 공격에 적합한 단검.', price: 50,
        stats: { str: 3, dex: 2 },
    },
    dagger_assassin: {
        id: 'dagger_assassin', name: '암살단검', slot: 'weapon',
        description: '급소를 노리는 암살자의 무기.', price: 350,
        stats: { str: 7, dex: 8, luck: 3 },
    },
    dagger_poison: {
        id: 'dagger_poison', name: '독 단검', slot: 'weapon',
        description: '독이 묻은 단검.', price: 400,
        stats: { str: 6, dex: 5 },
        onHit: 'poison',
    },

    // === 도끼/둔기 ===
    axe_wood: {
        id: 'axe_wood', name: '벌목 도끼', slot: 'weapon',
        description: '나무를 베던 도끼.', price: 30,
        stats: { str: 4 },
    },
    axe_battle: {
        id: 'axe_battle', name: '전투 도끼', slot: 'weapon',
        description: '전투용 대형 도끼.', price: 250,
        stats: { str: 12 },
    },
    mace_iron: {
        id: 'mace_iron', name: '철퇴', slot: 'weapon',
        description: '묵직한 철제 철퇴.', price: 180,
        stats: { str: 8 },
    },
    hammer_war: {
        id: 'hammer_war', name: '전쟁 망치', slot: 'weapon',
        description: '강력한 일격의 전쟁 망치.', price: 400,
        stats: { str: 18, dex: -3 },
    },

    // === 지팡이 ===
    staff_wood: {
        id: 'staff_wood', name: '나무 지팡이', slot: 'weapon',
        description: '기본적인 마법 지팡이.', price: 80,
        stats: { int: 5 },
    },
    staff_oak: {
        id: 'staff_oak', name: '참나무 지팡이', slot: 'weapon',
        description: '튼튼한 참나무로 만든 지팡이.', price: 150,
        stats: { int: 8 },
    },
    staff_arcane: {
        id: 'staff_arcane', name: '비전 지팡이', slot: 'weapon',
        description: '강력한 마력이 담긴 지팡이.', price: 600,
        stats: { int: 15, str: 3 },
    },
    staff_crystal: {
        id: 'staff_crystal', name: '수정 지팡이', slot: 'weapon',
        description: '수정으로 만든 마법 증폭 지팡이.', price: 1000,
        stats: { int: 22, luck: 5 },
    },

    // === 활 ===
    bow_short: {
        id: 'bow_short', name: '단궁', slot: 'weapon',
        description: '가벼운 단궁.', price: 70,
        stats: { dex: 5 },
    },
    bow_long: {
        id: 'bow_long', name: '장궁', slot: 'weapon',
        description: '사거리가 긴 장궁.', price: 200,
        stats: { dex: 10 },
    },
    bow_composite: {
        id: 'bow_composite', name: '합성궁', slot: 'weapon',
        description: '강력한 합성 재료의 활.', price: 500,
        stats: { dex: 18, str: 3 },
    },
};
