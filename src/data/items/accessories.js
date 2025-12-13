// ====================================
// 액세서리 (Accessories)
// ====================================

export const ACCESSORIES = {
    // === 반지 ===
    ring_copper: {
        id: 'ring_copper', name: '구리 반지', slot: 'accessory',
        description: '평범한 구리 반지.', price: 30,
        stats: { luck: 1 },
    },
    ring_silver: {
        id: 'ring_silver', name: '은 반지', slot: 'accessory',
        description: '은으로 만든 반지.', price: 100,
        stats: { luck: 3 },
    },
    ring_gold: {
        id: 'ring_gold', name: '금 반지', slot: 'accessory',
        description: '금으로 만든 반지.', price: 250,
        stats: { luck: 5, karma: 2 },
    },
    ring_str: {
        id: 'ring_str', name: '힘의 반지', slot: 'accessory',
        description: '힘을 높여주는 반지.', price: 200,
        stats: { str: 5 },
    },
    ring_dex: {
        id: 'ring_dex', name: '민첩의 반지', slot: 'accessory',
        description: '민첩을 높여주는 반지.', price: 200,
        stats: { dex: 5 },
    },
    ring_int: {
        id: 'ring_int', name: '지혜의 반지', slot: 'accessory',
        description: '지능을 높여주는 반지.', price: 200,
        stats: { int: 5 },
    },
    ring_intuition: {
        id: 'ring_intuition', name: '통찰의 반지', slot: 'accessory',
        description: '직감을 높여주는 반지.', price: 350,
        stats: { intuition: 5 },
    },

    // === 목걸이 ===
    amulet_bronze: {
        id: 'amulet_bronze', name: '청동 목걸이', slot: 'accessory',
        description: '평범한 청동 목걸이.', price: 50,
        stats: { dex: 2 },
    },
    amulet_protection: {
        id: 'amulet_protection', name: '수호의 목걸이', slot: 'accessory',
        description: '방어력을 높여주는 목걸이.', price: 300,
        stats: { dex: 5 },
    },
    amulet_vitality: {
        id: 'amulet_vitality', name: '활력의 목걸이', slot: 'accessory',
        description: 'HP 최대치를 높여주는 목걸이.', price: 400,
        stats: { str: 3, dex: 3 },
    },
    amulet_magic: {
        id: 'amulet_magic', name: '마력의 목걸이', slot: 'accessory',
        description: '마력을 증폭하는 목걸이.', price: 350,
        stats: { int: 8 },
    },

    // === 특수 ===
    cloak_shadow: {
        id: 'cloak_shadow', name: '그림자 망토', slot: 'accessory',
        description: '그림자에 녹아드는 망토.', price: 500,
        stats: { dex: 10, luck: 3 },
    },
    boots_speed: {
        id: 'boots_speed', name: '신속의 장화', slot: 'accessory',
        description: '빠르게 움직일 수 있는 장화.', price: 400,
        stats: { dex: 8 },
    },
    gloves_thief: {
        id: 'gloves_thief', name: '도적의 장갑', slot: 'accessory',
        description: '손재주가 좋아지는 장갑.', price: 300,
        stats: { dex: 5, luck: 3 },
    },
    belt_warrior: {
        id: 'belt_warrior', name: '전사의 벨트', slot: 'accessory',
        description: '전사의 힘을 높여주는 벨트.', price: 350,
        stats: { str: 6 },
    },
};
