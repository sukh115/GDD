// ====================================
// ShopLogic - 상점 관련 로직
// ====================================

import { ITEMS, getItemsByType, ITEM_TYPES } from '../data/items';
import { SHOP_PRICE_RANGE } from '../constants/gameRules';

/**
 * 상점 아이템 생성 (위험도 기반)
 * @param {number} dangerLevel - 지역 위험도 (0~5)
 * @param {number} itemCount - 표시할 아이템 수 (기본 8)
 * @returns {Array} 상점 아이템 목록
 */
export function generateShopItems(dangerLevel = 0, itemCount = 8) {
    const range = SHOP_PRICE_RANGE[dangerLevel] || SHOP_PRICE_RANGE[0];

    // 가격대에 맞는 아이템 필터
    const available = Object.values(ITEMS).filter(item => {
        if (item.price === 0 || item.legendary) return false;
        return item.price >= range.min && item.price <= range.max;
    });

    // 랜덤 셔플 후 선택
    const shuffled = [...available].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, itemCount);
}

/**
 * 아이템 구매
 * @param {string} itemId - 아이템 ID
 * @param {Object} state - 게임 상태
 * @returns {Object} { success, message, newGold, item }
 */
export function buyItem(itemId, state) {
    const item = ITEMS[itemId];
    if (!item) {
        return { success: false, message: '아이템을 찾을 수 없습니다.' };
    }

    if (state.resources.gold < item.price) {
        return { success: false, message: '골드가 부족합니다!' };
    }

    return {
        success: true,
        message: `${item.name}을(를) 구매했습니다.`,
        newGold: state.resources.gold - item.price,
        item,
    };
}

/**
 * 아이템 판매
 * @param {string} itemId - 아이템 ID
 * @param {Object} state - 게임 상태
 * @returns {Object} { success, message, newGold, sellPrice }
 */
export function sellItem(itemId, state) {
    const item = ITEMS[itemId];
    if (!item) {
        return { success: false, message: '아이템을 찾을 수 없습니다.' };
    }

    // 전설템/저주템은 판매 불가
    if (item.legendary) {
        return { success: false, message: '이 아이템은 판매할 수 없습니다.' };
    }

    const sellPrice = Math.floor(item.price * 0.5);

    return {
        success: true,
        message: `${item.name}을(를) ${sellPrice}G에 판매했습니다.`,
        newGold: state.resources.gold + sellPrice,
        sellPrice,
    };
}

/**
 * 아이템 사용 (소모품)
 * @param {string} itemId - 아이템 ID
 * @returns {Object} { canUse, effects }
 */
export function useItem(itemId) {
    const item = ITEMS[itemId];
    if (!item || item.type !== ITEM_TYPES.CONSUMABLE) {
        return { canUse: false };
    }

    return {
        canUse: true,
        effects: item.effect,
        message: `${item.name}을(를) 사용했습니다.`,
    };
}
