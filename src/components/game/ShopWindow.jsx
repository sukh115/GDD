import React, { useState, useEffect } from 'react';
import useGameStore from '../../store/gameStore';
import { generateShopItems, buyItem } from '../../logic/ShopLogic';
import { getLocation } from '../../data/locations';

function ShopWindow() {
    const { resources, location, _applyResource, _addLog, onCloseShop, inventory, setState } = useGameStore();
    const [shopItems, setShopItems] = useState([]);

    // 상점 아이템 동적 생성
    useEffect(() => {
        const loc = getLocation(location);
        const items = generateShopItems(loc.dangerLevel, 8);
        setShopItems(items);
    }, [location]);

    const handleBuy = (item) => {
        const result = buyItem(item.id, { resources });

        if (!result.success) {
            _addLog(`❌ ${result.message}`, 'danger');
            return;
        }

        _applyResource('gold', -item.price);

        // 소모품은 바로 사용, 장비는 인벤토리에
        if (item.type === 'consumable' && item.effect) {
            for (const [r, a] of Object.entries(item.effect)) {
                if (['gold', 'fatigue', 'hp', 'threat', 'bond'].includes(r)) {
                    _applyResource(r, a);
                }
            }
            _addLog(`🛒 ${item.name} 사용!`, 'success');
        } else {
            // 장비류는 인벤토리에 추가
            setState({ inventory: [...(inventory || []), { id: item.id, quantity: 1 }] });
            _addLog(`🛒 ${item.name} 구매!`, 'success');
        }
    };

    // 아이템 타입별 아이콘
    const getTypeIcon = (type) => {
        switch (type) {
            case 'weapon': return '⚔️';
            case 'armor': return '🛡️';
            case 'accessory': return '💍';
            case 'consumable': return '🧪';
            default: return '📦';
        }
    };

    return (
        <div className="glass-card p-4 mb-4 border-2 border-yellow-500/50">
            <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-bold text-yellow-400">🛒 상점</span>
                <div className="flex items-center gap-4">
                    <span className="text-yellow-400">💰 {resources.gold}G</span>
                    <button onClick={onCloseShop} className="text-sm px-3 py-1 bg-white/10 hover:bg-white/20 rounded">
                        닫기
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto">
                {shopItems.map((item, idx) => (
                    <div key={`${item.id}-${idx}`} className="flex flex-col p-3 bg-black/20 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                            <span>{getTypeIcon(item.type)}</span>
                            <span className="font-medium text-sm">{item.name}</span>
                        </div>
                        <div className="text-xs text-gray-400 mb-2 flex-grow">
                            {item.stats && Object.entries(item.stats).map(([s, v]) =>
                                `${s}${v > 0 ? '+' : ''}${v}`
                            ).join(' ')}
                            {item.effect && Object.entries(item.effect).filter(([k]) =>
                                ['hp', 'fatigue'].includes(k)
                            ).map(([r, a]) =>
                                `${r}${a > 0 ? '+' : ''}${a}`
                            ).join(' ')}
                        </div>
                        <button
                            onClick={() => handleBuy(item)}
                            disabled={resources.gold < item.price}
                            className={`w-full py-1 rounded text-sm font-bold ${resources.gold >= item.price
                                    ? 'bg-yellow-600 text-black hover:bg-yellow-500'
                                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                }`}
                        >
                            {item.price}G
                        </button>
                    </div>
                ))}
            </div>

            {shopItems.length === 0 && (
                <div className="text-center text-gray-400 py-8">
                    판매할 물건이 없습니다.
                </div>
            )}
        </div>
    );
}

export default ShopWindow;