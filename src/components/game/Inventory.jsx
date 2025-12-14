import React, { useState } from 'react';
import useGameStore from '../../store/gameStore';
import { ITEMS } from '../../data/items';
import { calculateEquipmentBonus, equipItem, unequipItem } from '../../logic/InventoryLogic';

/**
 * 인벤토리 및 장비 관리 패널
 * - 장착 슬롯 표시 (무기, 갑옷, 장신구)
 * - 장비 효과 합계 표시
 * - 아이템 사용/장착/해제
 */
function Inventory() {
    const { inventory, equipped, resources, _applyResource, _applyStat, _addLog, setState } = useGameStore();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    // 장비 효과 합계
    const equipBonus = calculateEquipmentBonus(equipped);

    const handleEquip = (index) => {
        const invItem = inventory[index];
        if (!invItem) return;

        const itemData = ITEMS[invItem.id];
        if (!itemData || !itemData.slot) return;

        const result = equipItem(invItem.id, equipped);
        if (!result.success) return;

        // 기존 장비를 인벤토리로
        let newInventory = [...inventory];
        newInventory.splice(index, 1); // 장착할 아이템 제거

        if (result.unequipped) {
            newInventory.push({ id: result.unequipped, quantity: 1 });
        }

        setState({
            inventory: newInventory,
            equipped: result.newEquipped
        });
        _addLog(`⚔️ ${itemData.name} 장착!`, 'success');
        setSelectedItem(null);
    };

    const handleUnequip = (slot) => {
        const itemId = equipped[slot];
        if (!itemId) return;

        const itemData = ITEMS[itemId];
        const result = unequipItem(slot, equipped);
        if (!result.success) return;

        setState({
            inventory: [...inventory, { id: result.unequippedItem, quantity: 1 }],
            equipped: result.newEquipped
        });
        _addLog(`🎽 ${itemData?.name || '장비'} 해제`, 'system');
    };

    const handleUseItem = (index) => {
        const invItem = inventory[index];
        if (!invItem) return;

        const itemData = ITEMS[invItem.id];
        if (!itemData || itemData.type !== 'consumable') return;

        // 효과 적용
        if (itemData.effect) {
            for (const [key, value] of Object.entries(itemData.effect)) {
                if (['hp', 'fatigue', 'gold', 'bond', 'threat'].includes(key)) {
                    _applyResource(key, value);
                } else if (['str', 'dex', 'int', 'luck', 'intuition', 'karma'].includes(key)) {
                    _applyStat(key, value);
                }
            }
        }

        // 인벤토리에서 제거
        const newInventory = [...inventory];
        newInventory.splice(index, 1);
        setState({ inventory: newInventory });

        _addLog(`🧪 ${itemData.name} 사용!`, 'success');
        setSelectedItem(null);
    };

    const getSlotIcon = (slot) => {
        switch (slot) {
            case 'weapon': return '⚔️';
            case 'armor': return '🛡️';
            case 'accessory': return '💍';
            default: return '📦';
        }
    };

    const getSlotName = (slot) => {
        switch (slot) {
            case 'weapon': return '무기';
            case 'armor': return '방어구';
            case 'accessory': return '장신구';
            default: return slot;
        }
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case 'consumable': return '🧪';
            case 'weapon': return '⚔️';
            case 'armor': return '🛡️';
            case 'accessory': return '💍';
            case 'legendary': return '✨';
            default: return '📦';
        }
    };

    return (
        <div className="glass-card p-3 mb-4">
            {/* 헤더 */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between text-sm"
            >
                <div className="flex items-center gap-2">
                    <span className="text-gray-400">🎒 인벤토리 ({inventory.length})</span>
                    {Object.keys(equipBonus).length > 0 && (
                        <span className="text-xs text-green-400">
                            {Object.entries(equipBonus).slice(0, 3).map(([s, v]) =>
                                `${s}+${v}`
                            ).join(' ')}
                        </span>
                    )}
                </div>
                <span className="text-xs text-gray-500">{isOpen ? '▲' : '▼'}</span>
            </button>

            {isOpen && (
                <div className="mt-3 space-y-3">
                    {/* 장착 슬롯 */}
                    <div className="grid grid-cols-3 gap-2">
                        {['weapon', 'armor', 'accessory'].map((slot) => {
                            const itemId = equipped[slot];
                            const itemData = itemId ? ITEMS[itemId] : null;

                            return (
                                <div key={slot} className="text-center">
                                    <div className="text-xs text-gray-500 mb-1">
                                        {getSlotIcon(slot)} {getSlotName(slot)}
                                    </div>
                                    {itemData ? (
                                        <button
                                            onClick={() => handleUnequip(slot)}
                                            className="w-full p-2 bg-purple-500/20 rounded text-xs hover:bg-purple-500/40 border border-purple-500/30"
                                            title={itemData.description}
                                        >
                                            <div className="font-medium">{itemData.name}</div>
                                            {itemData.stats && (
                                                <div className="text-green-400 text-[10px] mt-1">
                                                    {Object.entries(itemData.stats).slice(0, 2).map(([s, v]) =>
                                                        `${s}${v > 0 ? '+' : ''}${v}`
                                                    ).join(' ')}
                                                </div>
                                            )}
                                        </button>
                                    ) : (
                                        <div className="p-2 bg-white/5 rounded text-xs text-gray-600 border border-gray-700/30">
                                            비어있음
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* 장비 효과 합계 */}
                    {Object.keys(equipBonus).length > 0 && (
                        <div className="p-2 bg-green-900/20 rounded text-xs text-green-400 flex flex-wrap gap-2">
                            <span className="text-gray-400">장비 효과:</span>
                            {Object.entries(equipBonus).map(([stat, value]) => (
                                <span key={stat}>{stat} {value > 0 ? '+' : ''}{value}</span>
                            ))}
                        </div>
                    )}

                    {/* 인벤토리 목록 */}
                    {inventory.length > 0 ? (
                        <div className="space-y-1 max-h-48 overflow-y-auto">
                            {inventory.map((invItem, index) => {
                                const itemData = ITEMS[invItem.id];
                                if (!itemData) return null;

                                return (
                                    <div
                                        key={index}
                                        className={`flex items-center justify-between p-2 rounded text-sm cursor-pointer transition-colors ${selectedItem === index
                                                ? 'bg-blue-500/30 border border-blue-500/50'
                                                : 'bg-black/20 hover:bg-black/30'
                                            }`}
                                        onClick={() => setSelectedItem(selectedItem === index ? null : index)}
                                    >
                                        <div className="flex items-center gap-2">
                                            <span>{getTypeIcon(itemData.type)}</span>
                                            <div>
                                                <div className={itemData.legendary ? 'text-yellow-400' : ''}>
                                                    {itemData.name}
                                                </div>
                                                {selectedItem === index && (
                                                    <div className="text-xs text-gray-400 mt-1">
                                                        {itemData.description}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {selectedItem === index && (
                                            <div className="flex gap-1">
                                                {itemData.type === 'consumable' && (
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); handleUseItem(index); }}
                                                        className="px-2 py-1 bg-green-500/30 rounded text-xs hover:bg-green-500/50"
                                                    >
                                                        사용
                                                    </button>
                                                )}
                                                {itemData.slot && (
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); handleEquip(index); }}
                                                        className="px-2 py-1 bg-blue-500/30 rounded text-xs hover:bg-blue-500/50"
                                                    >
                                                        장착
                                                    </button>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <p className="text-center text-gray-600 text-xs py-2">
                            아이템이 없습니다.
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}

export default Inventory;