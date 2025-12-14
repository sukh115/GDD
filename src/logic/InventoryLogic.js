// ====================================
// InventoryLogic - 인벤토리 관련 로직
// ====================================

import { ITEMS, ITEM_TYPES } from '../data/items';

/**
 * 장비 효과 계산
 * @param {Object} equipped - 장착 정보 { weapon, armor, accessory }
 * @returns {Object} 스탯 보너스 { str, dex, int, luck, ... }
 */
export function calculateEquipmentBonus(equipped) {
    const bonus = {};

    for (const slotId of Object.values(equipped)) {
        if (!slotId) continue;
        const item = ITEMS[slotId];
        if (!item?.stats) continue;

        for (const [stat, value] of Object.entries(item.stats)) {
            bonus[stat] = (bonus[stat] || 0) + value;
        }
    }

    return bonus;
}

/**
 * 아이템 장착 가능 여부
 * @param {string} itemId - 아이템 ID
 * @returns {Object} { canEquip, slot, reason }
 */
export function canEquipItem(itemId) {
    const item = ITEMS[itemId];
    if (!item) return { canEquip: false, reason: '아이템 없음' };

    if (!item.slot) return { canEquip: false, reason: '장착 불가 아이템' };

    return { canEquip: true, slot: item.slot };
}

/**
 * 아이템 장착
 * @param {string} itemId - 아이템 ID
 * @param {Object} currentEquipped - 현재 장착 상태
 * @returns {Object} { success, newEquipped, unequipped }
 */
export function equipItem(itemId, currentEquipped) {
    const item = ITEMS[itemId];
    if (!item || !item.slot) {
        return { success: false };
    }

    const slot = item.slot;
    const unequipped = currentEquipped[slot];

    return {
        success: true,
        newEquipped: { ...currentEquipped, [slot]: itemId },
        unequipped,
    };
}

/**
 * 아이템 해제
 * @param {string} slot - 슬롯 (weapon/armor/accessory)
 * @param {Object} currentEquipped - 현재 장착 상태
 * @returns {Object} { success, newEquipped, unequippedItem }
 */
export function unequipItem(slot, currentEquipped) {
    const unequippedItem = currentEquipped[slot];
    if (!unequippedItem) {
        return { success: false };
    }

    return {
        success: true,
        newEquipped: { ...currentEquipped, [slot]: null },
        unequippedItem,
    };
}

/**
 * 인벤토리에서 아이템 추가
 * @param {string} itemId - 아이템 ID
 * @param {Array} inventory - 현재 인벤토리
 * @param {number} maxSize - 최대 인벤토리 크기
 * @returns {Object} { success, newInventory }
 */
export function addToInventory(itemId, inventory, maxSize = 20) {
    if (inventory.length >= maxSize) {
        return { success: false, reason: '인벤토리가 가득 찼습니다.' };
    }

    return {
        success: true,
        newInventory: [...inventory, { id: itemId, quantity: 1 }],
    };
}

/**
 * 인벤토리에서 아이템 제거
 * @param {number} index - 아이템 인덱스
 * @param {Array} inventory - 현재 인벤토리
 * @returns {Object} { success, newInventory, removedItem }
 */
export function removeFromInventory(index, inventory) {
    if (index < 0 || index >= inventory.length) {
        return { success: false };
    }

    const removedItem = inventory[index];
    const newInventory = inventory.filter((_, i) => i !== index);

    return { success: true, newInventory, removedItem };
}
