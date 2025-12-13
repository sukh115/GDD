import React, { useState } from 'react';
import useGameStore from '../../store/gameStore';
import { getItem } from '../../data/items';

function Inventory() {
    const { inventory, equipped, resources } = useGameStore();
    const [isOpen, setIsOpen] = useState(false);

    const equipItem = (index) => {
        const item = inventory[index];
        if (!item || !item.slot) return;

        useGameStore.setState((state) => {
            const newInventory = [...state.inventory];
            const oldEquipped = state.equipped[item.slot];

            // 기존 장비 인벤토리로
            if (oldEquipped) {
                newInventory.push(oldEquipped);
            }

            // 새 아이템 장착 후 인벤토리에서 제거
            newInventory.splice(index, 1);

            return {
                inventory: newInventory,
                equipped: { ...state.equipped, [item.slot]: item }
            };
        });

        useGameStore.getState().addLog(`🎽 ${item.name}을(를) 장착했습니다.`, 'system');
    };

    const useItem = (index) => {
        const item = inventory[index];
        if (!item || item.type !== 'consumable') return;

        const { effect } = item;
        if (effect.resource) {
            useGameStore.getState().updateResource(effect.resource, effect.amount);
        }

        useGameStore.setState((state) => ({
            inventory: state.inventory.filter((_, i) => i !== index)
        }));

        useGameStore.getState().addLog(`🧪 ${item.name}을(를) 사용했습니다.`, 'success');
    };

    const unequipItem = (slot) => {
        const item = equipped[slot];
        if (!item) return;

        useGameStore.setState((state) => ({
            inventory: [...state.inventory, item],
            equipped: { ...state.equipped, [slot]: null }
        }));

        useGameStore.getState().addLog(`🎽 ${item.name}을(를) 해제했습니다.`, 'system');
    };

    const getSlotIcon = (slot) => {
        switch (slot) {
            case 'weapon': return '⚔️';
            case 'armor': return '🛡️';
            case 'accessory': return '💍';
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
                <span className="text-gray-400">🎒 인벤토리 ({inventory.length})</span>
                <span className="text-xs text-gray-500">{isOpen ? '▲' : '▼'}</span>
            </button>

            {isOpen && (
                <div className="mt-3 space-y-3">
                    {/* 장착 슬롯 */}
                    <div className="grid grid-cols-3 gap-2">
                        {['weapon', 'armor', 'accessory'].map((slot) => (
                            <div key={slot} className="text-center">
                                <div className="text-xs text-gray-500 mb-1">
                                    {getSlotIcon(slot)} {slot === 'weapon' ? '무기' : slot === 'armor' ? '갑옷' : '장신구'}
                                </div>
                                {equipped[slot] ? (
                                    <button
                                        onClick={() => unequipItem(slot)}
                                        className="w-full p-2 bg-purple-500/20 rounded text-xs hover:bg-purple-500/40"
                                    >
                                        {equipped[slot].name}
                                    </button>
                                ) : (
                                    <div className="p-2 bg-white/5 rounded text-xs text-gray-600">
                                        비어있음
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* 인벤토리 목록 */}
                    {inventory.length > 0 ? (
                        <div className="space-y-1 max-h-40 overflow-y-auto">
                            {inventory.map((item, index) => (
                                <div key={index} className="flex items-center justify-between p-2 bg-black/20 rounded text-sm">
                                    <span>{item.name}</span>
                                    <div className="flex gap-1">
                                        {item.type === 'consumable' && (
                                            <button
                                                onClick={() => useItem(index)}
                                                className="px-2 py-1 bg-green-500/30 rounded text-xs hover:bg-green-500/50"
                                            >
                                                사용
                                            </button>
                                        )}
                                        {item.slot && (
                                            <button
                                                onClick={() => equipItem(index)}
                                                className="px-2 py-1 bg-blue-500/30 rounded text-xs hover:bg-blue-500/50"
                                            >
                                                장착
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
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