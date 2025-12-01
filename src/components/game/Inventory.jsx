import React from 'react';
import useGameStore from '../../store/gameStore';

const Inventory = () => {
    const { inventory, equipped, consumeItem, unequipItem } = useGameStore();

    return (
        <div className="flex flex-col gap-4">
            {/* 장비 창 */}
            <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                <h3 className="text-gray-400 text-xs uppercase mb-2">Equipped</h3>
                <div className="grid grid-cols-4 gap-2">
                    {['weapon', 'armor', 'offhand', 'accessory'].map((slot) => (
                        <div
                            key={slot}
                            className={`group relative p-2 rounded border transition-colors cursor-pointer min-h-[60px] flex flex-col items-center justify-center ${equipped[slot] ? 'bg-gray-700 border-yellow-500' : 'bg-gray-900 border-gray-700 border-dashed'
                                }`}
                            onClick={() => equipped[slot] && unequipItem(slot)}
                        >
                            <span className="text-[10px] text-gray-500 uppercase mb-1">{slot}</span>
                            {equipped[slot] ? (
                                <>
                                    <div className="text-xs text-center text-white truncate w-full">{equipped[slot].name}</div>
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 bg-black text-xs text-gray-300 p-2 rounded hidden group-hover:block z-10 pointer-events-none">
                                        {equipped[slot].description}
                                        <div className="text-red-400 mt-1">클릭하여 해제</div>
                                    </div>
                                </>
                            ) : (
                                <span className="text-xs text-gray-600">-</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* 인벤토리 창 */}
            <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                <h3 className="text-gray-400 text-xs uppercase mb-2">Inventory ({inventory.length})</h3>
                {inventory.length === 0 ? (
                    <div className="text-gray-500 text-center text-sm py-4">
                        가방이 비어있습니다.
                    </div>
                ) : (
                    <div className="grid grid-cols-4 gap-2">
                        {inventory.map((item, index) => (
                            <div
                                key={index}
                                className="group relative bg-gray-700 p-2 rounded border border-gray-600 hover:border-yellow-500 cursor-pointer transition-colors"
                                onClick={() => consumeItem(index)}
                            >
                                <div className="text-xs text-center text-white truncate">{item.name}</div>

                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 bg-black text-xs text-gray-300 p-2 rounded hidden group-hover:block z-10 pointer-events-none">
                                    {item.description}
                                    <div className="text-yellow-500 mt-1">
                                        {item.type === 'equipment' ? '클릭하여 장착' : '클릭하여 사용'}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Inventory;