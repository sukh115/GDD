// ====================================
// Items Index - 모든 아이템 통합 export
// ====================================

import { CONSUMABLES } from './consumables';
import { WEAPONS } from './weapons';
import { ARMORS } from './armors';
import { ACCESSORIES } from './accessories';
import { LEGENDARY } from './legendary';

export const ITEM_TYPES = {
    CONSUMABLE: 'consumable',
    WEAPON: 'weapon',
    ARMOR: 'armor',
    ACCESSORY: 'accessory',
    LEGENDARY: 'legendary',
};

// 타입 추가
const addType = (items, type) => {
    return Object.fromEntries(
        Object.entries(items).map(([id, item]) => [id, { ...item, type }])
    );
};

// 모든 아이템 통합
export const ITEMS = {
    ...addType(CONSUMABLES, ITEM_TYPES.CONSUMABLE),
    ...addType(WEAPONS, ITEM_TYPES.WEAPON),
    ...addType(ARMORS, ITEM_TYPES.ARMOR),
    ...addType(ACCESSORIES, ITEM_TYPES.ACCESSORY),
    ...addType(LEGENDARY, ITEM_TYPES.LEGENDARY),
};

// 헬퍼 함수
export const getItem = (id) => ITEMS[id] || null;

export const getItemsByType = (type) => {
    return Object.values(ITEMS).filter(item => item.type === type);
};

/**
 * 가격대별 아이템 필터
 * @param {number} maxPrice - 최대 가격
 * @param {string} type - 아이템 타입 (옵션)
 */
export const getItemsByPrice = (maxPrice, type = null) => {
    return Object.values(ITEMS).filter(item => {
        if (item.price === 0) return false; // 전설템 제외
        if (item.price > maxPrice) return false;
        if (type && item.type !== type) return false;
        return true;
    });
};

/**
 * 상점용 아이템 (위험도 기반 동적 생성)
 * @param {number} dangerLevel - 지역 위험도 (0~5)
 * @param {Array} preferredTypes - 선호 타입 배열
 */
export const getShopItemsByDanger = (dangerLevel = 0, preferredTypes = null) => {
    // 위험도에 따른 가격대 설정
    const priceRange = {
        0: { min: 0, max: 100 },    // 마을
        1: { min: 50, max: 300 },   // 안전
        2: { min: 100, max: 500 },  // 보통
        3: { min: 200, max: 800 },  // 위험
        4: { min: 300, max: 1200 }, // 고위험
        5: { min: 500, max: 2000 }, // 극한
    };

    const range = priceRange[dangerLevel] || priceRange[0];

    return Object.values(ITEMS).filter(item => {
        if (item.price === 0 || item.legendary) return false;
        if (item.price < range.min || item.price > range.max) return false;
        if (preferredTypes && !preferredTypes.includes(item.type)) return false;
        return true;
    });
};

// 개별 export
export { CONSUMABLES, WEAPONS, ARMORS, ACCESSORIES, LEGENDARY };
