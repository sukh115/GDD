import React from 'react';
import useGameStore from '../../store/gameStore';

const StatusPanel = () => {
    const { resources, stats } = useGameStore();

    return (
        <div className="flex justify-between items-center p-4 bg-gray-800 rounded-lg shadow-lg mb-4 text-white">
            <div className="flex flex-col items-center">
                <span className="text-xs text-gray-400 uppercase tracking-wider">HP</span>
                <span className="text-xl font-bold text-red-500">{resources.hp}</span>
            </div>

            <div className="flex flex-col items-center">
                <span className="text-xs text-gray-400 uppercase tracking-wider">Gold</span>
                <span className="text-xl font-bold text-yellow-400">{resources.gold}</span>
            </div>

            <div className="flex flex-col items-center">
                <span className="text-xs text-gray-400 uppercase tracking-wider">피로도</span>
                <span className={`text-xl font-bold ${resources.fatigue > 80 ? 'text-red-500 animate-pulse' : 'text-blue-400'}`}>
                    {resources.fatigue}
                </span>
            </div>

            {/* 추가된 힘(STR) 상태 표시 */}
            <div className="flex flex-col items-center border-l border-gray-700 pl-4 ml-4">
                <span className="text-xs text-gray-400 uppercase tracking-wider">Str</span>
                <span className="text-lg font-bold">{stats.str}</span>
            </div>
            {/* 추가된 민첩(Dex) 상태 표시 */}
            <div className="flex flex-col items-center border-l border-gray-700 pl-4 ml-4">
                <span className="text-xs text-gray-400 uppercase tracking-wider">Dex</span>
                <span className="text-lg font-bold">{stats.dex}</span>
            </div>
            {/* 추가된 지력(INT) 상태 표시 */}
            <div className="flex flex-col items-center border-l border-gray-700 pl-4 ml-4">
                <span className="text-xs text-gray-400 uppercase tracking-wider">INT</span>
                <span className="text-lg font-bold">{stats.int}</span>
            </div>
            {/* 추가된 운(Luck) 상태 표시 */}
            <div className="flex flex-col items-center border-l border-gray-700 pl-4 ml-4">
                <span className="text-xs text-gray-400 uppercase tracking-wider">Luck</span>
                <span className="text-lg font-bold">{stats.luck}</span>
            </div>
            {/* 추가된 카르마(Karma) 상태 표시
            <div className="flex flex-col items-center border-l border-gray-700 pl-4 ml-4">
                <span className="text-xs text-gray-400 uppercase tracking-wider">Karma</span>
                <span className="text-lg font-bold">{stats.karma}</span>
            </div> */}
        </div>
    );
};

export default StatusPanel;
