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
                <span className="text-xs text-gray-400 uppercase tracking-wider">Fatigue</span>
                <span className={`text-xl font-bold ${resources.fatigue > 80 ? 'text-red-500 animate-pulse' : 'text-blue-400'}`}>
                    {resources.fatigue}
                </span>
            </div>

            {/* Optional: Show Stats if needed, or keep it minimal as per request */}
            <div className="flex flex-col items-center border-l border-gray-700 pl-4 ml-4">
                <span className="text-xs text-gray-400 uppercase tracking-wider">Str</span>
                <span className="text-lg font-bold">{stats.str}</span>
            </div>
        </div>
    );
};

export default StatusPanel;
