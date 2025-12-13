// ====================================
// 전설 아이템 (Legendary)
// ====================================

export const LEGENDARY = {
    // === 무기 ===
    holy_sword: {
        id: 'holy_sword', name: '성검', slot: 'weapon',
        description: '마왕을 멸할 수 있는 전설의 검.', price: 0,
        stats: { str: 40, karma: 10 },
        legendary: true,
        effectOnDemonLord: 2.0,
    },
    demon_blade: {
        id: 'demon_blade', name: '마검', slot: 'weapon',
        description: '어둠의 힘이 깃든 저주받은 검.', price: 0,
        stats: { str: 50, karma: -30 },
        legendary: true,
        cursed: true,
    },
    staff_sage: {
        id: 'staff_sage', name: '현자의 지팡이', slot: 'weapon',
        description: '고대 현자가 사용하던 지팡이.', price: 0,
        stats: { int: 35, intuition: 10 },
        legendary: true,
    },
    bow_elven: {
        id: 'bow_elven', name: '엘프의 활', slot: 'weapon',
        description: '엘프 장인이 만든 전설의 활.', price: 0,
        stats: { dex: 30, luck: 10 },
        legendary: true,
    },

    // === 방어구 ===
    armor_invincible: {
        id: 'armor_invincible', name: '불멸의 갑옷', slot: 'armor',
        description: '신이 내린 갑옷.', price: 0,
        stats: { str: 15, dex: 15 },
        legendary: true,
    },

    // === 악세서리 ===
    crown_usurper: {
        id: 'crown_usurper', name: '찬탈자의 왕관', slot: 'accessory',
        description: '왕좌를 빼앗은 자의 상징.', price: 0,
        stats: { str: 10, dex: 10, karma: -50 },
        legendary: true,
        flag: 'USURPED_THRONE',
    },
    amulet_immortal: {
        id: 'amulet_immortal', name: '불멸의 목걸이', slot: 'accessory',
        description: '착용자에게 불사의 힘을 부여한다.', price: 0,
        stats: { str: 5, dex: 5 },
        legendary: true,
        onDeath: 'revive',
    },
    ring_destiny: {
        id: 'ring_destiny', name: '운명의 반지', slot: 'accessory',
        description: '운명을 바꾸는 힘이 깃든 반지.', price: 0,
        stats: { luck: 20, intuition: 10 },
        legendary: true,
    },
    cloak_invisibility: {
        id: 'cloak_invisibility', name: '투명 망토', slot: 'accessory',
        description: '착용자를 투명하게 만드는 망토.', price: 0,
        stats: { dex: 20, luck: 15 },
        legendary: true,
    },
};
