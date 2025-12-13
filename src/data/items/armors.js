// ====================================
// 방어구 (Armors)
// ====================================

export const ARMORS = {
    // === 경갑 ===
    armor_cloth: {
        id: 'armor_cloth', name: '천 옷', slot: 'armor',
        description: '평범한 천 옷.', price: 20,
        stats: { dex: 1 },
    },
    armor_leather: {
        id: 'armor_leather', name: '가죽 갑옷', slot: 'armor',
        description: '기본적인 가죽 갑옷.', price: 80,
        stats: { dex: 3 },
    },
    armor_studded: {
        id: 'armor_studded', name: '징박이 가죽갑옷', slot: 'armor',
        description: '금속 징이 박힌 가죽갑옷.', price: 150,
        stats: { dex: 5, str: 1 },
    },

    // === 중갑 ===
    armor_chain: {
        id: 'armor_chain', name: '사슬 갑옷', slot: 'armor',
        description: '촘촘한 사슬로 엮은 갑옷.', price: 250,
        stats: { dex: 8 },
    },
    armor_scale: {
        id: 'armor_scale', name: '비늘 갑옷', slot: 'armor',
        description: '비늘 모양 금속판의 갑옷.', price: 400,
        stats: { dex: 12 },
    },
    armor_plate: {
        id: 'armor_plate', name: '판금 갑옷', slot: 'armor',
        description: '두꺼운 철판으로 만든 갑옷.', price: 700,
        stats: { dex: 18, str: 2 },
    },
    armor_dragon: {
        id: 'armor_dragon', name: '용린 갑옷', slot: 'armor',
        description: '용의 비늘로 만든 최상급 갑옷.', price: 2000,
        stats: { dex: 25, str: 5 },
    },

    // === 로브 ===
    robe_basic: {
        id: 'robe_basic', name: '마법사 로브', slot: 'armor',
        description: '기본적인 마법사 로브.', price: 100,
        stats: { int: 3 },
    },
    robe_silk: {
        id: 'robe_silk', name: '비단 로브', slot: 'armor',
        description: '고급 비단으로 만든 로브.', price: 250,
        stats: { int: 6, luck: 2 },
    },
    robe_arcane: {
        id: 'robe_arcane', name: '비전 로브', slot: 'armor',
        description: '마력이 증폭되는 로브.', price: 500,
        stats: { int: 12, dex: 3 },
    },
    robe_sage: {
        id: 'robe_sage', name: '현자의 로브', slot: 'armor',
        description: '현자가 입던 로브.', price: 1000,
        stats: { int: 18, intuition: 5 },
    },
};
