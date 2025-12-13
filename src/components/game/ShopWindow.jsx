import React from 'react';
import useGameStore from '../../store/gameStore';

function ShopWindow() {
    const { resources, _applyResource, _addLog, onCloseShop } = useGameStore();

    const items = [
        { id: 'potion', name: '체력 포션', price: 30, effect: { hp: 30 } },
        { id: 'bread', name: '빵', price: 10, effect: { fatigue: -20 } },
    ];

    const handleBuy = (item) => {
        if (resources.gold < item.price) {
            _addLog('💰 골드 부족!', 'danger');
            return;
        }
        _applyResource('gold', -item.price);
        for (const [r, a] of Object.entries(item.effect)) {
            _applyResource(r, a);
        }
        _addLog(`🛒 ${item.name} 구매!`, 'success');
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

            <div className="space-y-2">
                {items.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                        <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-xs text-gray-400">
                                {Object.entries(item.effect).map(([r, a]) => `${r}${a > 0 ? '+' : ''}${a}`).join(' ')}
                            </div>
                        </div>
                        <button onClick={() => handleBuy(item)} disabled={resources.gold < item.price}
                            className={`px-4 py-2 rounded-lg font-bold ${resources.gold >= item.price ? 'bg-yellow-600 text-black' : 'bg-gray-600 text-gray-400'}`}>
                            {item.price}G
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ShopWindow;