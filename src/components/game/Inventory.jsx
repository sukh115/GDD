import React from 'react';
import useGameStore from '../../store/gameStore';

const Inventory = () => {
    const { inventory, consumeItem } = useGameStore();

    if (inventory.length === 0) {
        return (
            <div className="p-4 bg-gray-800 rounded-lg text-gray-500 text-center text-sm border border-gray-700">
                가방이 비어있습니다.
            </div>
        );
    }

    return (
        <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
            <h3 className="text-gray-400 text-xs uppercase mb-2">Inventory ({inventory.length})</h3>
            <div className="grid grid-cols-4 gap-2">
                {inventory.map((item, index) => (
                    <div 
                        key={index} 
                        className="group relative bg-gray-700 p-2 rounded border border-gray-600 hover:border-yellow-500 cursor-pointer transition-colors"
                        onClick={() => consumeItem(index)}
                        title={item.desc} // 마우스 오버 시 설명
                    >
                        <div className="text-xs text-center text-white truncate">{item.name}</div>
                        
                        {/* 툴팁 (선택 사항) */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 bg-black text-xs text-gray-300 p-2 rounded hidden group-hover:block z-10 pointer-events-none">
                            {item.desc}
                            <div className="text-yellow-500 mt-1">클릭하여 사용</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Inventory;