// src/components/game/ShopWindow.jsx
import React from 'react';
import useGameStore from '../../store/gameStore';
import { ITEMS } from '../../data/items';
import GameButton from '../ui/GameButton';

const ShopWindow = () => {
    const { buyItem, setPhase, addLog } = useGameStore();

    // 상점에서 팔 목록 (나중에 랜덤화 가능)
    const shopList = ['potion_hp', 'potion_fatigue', 'elixir_strength', 'normal_sword', 'gem_blue'];

    const handleExit = () => {
        addLog("상점 문을 나섭니다.");
        setPhase('exploration'); // 탐색 모드로 복귀
    };

    return (
        <div className="p-6 bg-gray-800 rounded-lg border-2 border-yellow-600 shadow-xl w-full animate-fade-in">
            <h2 className="text-xl font-bold text-yellow-500 mb-2 uppercase">💰 General Store</h2>
            <p className="text-gray-400 text-sm mb-6">"필요한 게 있으면 골라보게나. 외상은 사절일세."</p>

            <div className="space-y-3 mb-6">
                {shopList.map((itemId) => {
                    const item = ITEMS[itemId];
                    return (
                        <div key={itemId} className="flex justify-between items-center bg-gray-700 p-3 rounded border border-gray-600">
                            <div>
                                <div className="font-bold text-white">{item.name}</div>
                                <div className="text-xs text-gray-400">{item.desc}</div>
                            </div>
                            <button
                                onClick={() => buyItem(itemId)}
                                className="px-3 py-1 bg-yellow-700 hover:bg-yellow-600 text-white text-sm rounded font-bold transition-colors"
                            >
                                {item.price} G
                            </button>
                        </div>
                    );
                })}
            </div>

            <GameButton label="나가기" onClick={handleExit} variant="default" />
        </div>
    );
};

export default ShopWindow;