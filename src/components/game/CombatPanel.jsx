import React from 'react';
import useGameStore from '../../store/gameStore';

const CombatPanel = () => {
    const { combatState, stats, resources, combatAction } = useGameStore();

    if (!combatState) return null;

    const { monster, isPlayerTurn } = combatState;

    return (
        <div className="w-full max-w-md bg-red-900/20 border-2 border-red-600 rounded-lg p-4 mb-4 relative overflow-hidden">
            {/* Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-red-900/50 pointer-events-none" />

            {/* Monster Info */}
            <div className="relative z-10 text-center mb-6">
                <h2 className="text-2xl font-bold text-red-500 mb-2">{monster.name}</h2>
                <div className="w-full bg-gray-700 h-4 rounded-full overflow-hidden border border-gray-600">
                    <div
                        className="bg-red-600 h-full transition-all duration-500"
                        style={{ width: `${(monster.currentHp / monster.maxHp) * 100}%` }}
                    />
                </div>
                <p className="text-sm text-gray-300 mt-1">HP: {monster.currentHp} / {monster.maxHp}</p>
                <div className="flex justify-center gap-4 mt-2 text-sm text-gray-400">
                    <span>STR: {monster.stats.str}</span>
                    <span>DEF: {monster.stats.def}</span>
                </div>
            </div>

            {/* Player Status (Brief) */}
            <div className="relative z-10 flex justify-between items-center mb-6 px-4 py-2 bg-black/30 rounded">
                <div className="text-green-400">HP: {resources.hp}</div>
                <div className="text-blue-400">Fatigue: {resources.fatigue}</div>
            </div>

            {/* Actions */}
            <div className="relative z-10 grid grid-cols-3 gap-2">
                <button
                    onClick={() => combatAction('attack')}
                    disabled={!isPlayerTurn}
                    className={`p-3 rounded font-bold transition-all ${isPlayerTurn
                            ? 'bg-red-600 hover:bg-red-500 text-white shadow-lg hover:shadow-red-500/50'
                            : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        }`}
                >
                    ⚔️ 공격
                </button>
                <button
                    onClick={() => combatAction('defend')}
                    disabled={!isPlayerTurn}
                    className={`p-3 rounded font-bold transition-all ${isPlayerTurn
                            ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg hover:shadow-blue-500/50'
                            : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        }`}
                >
                    🛡️ 방어
                </button>
                <button
                    onClick={() => combatAction('flee')}
                    disabled={!isPlayerTurn}
                    className={`p-3 rounded font-bold transition-all ${isPlayerTurn
                            ? 'bg-yellow-600 hover:bg-yellow-500 text-white shadow-lg hover:shadow-yellow-500/50'
                            : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        }`}
                >
                    🏃 도망
                </button>
            </div>

            {/* Turn Indicator */}
            <div className="relative z-10 text-center mt-4 text-sm font-bold">
                {isPlayerTurn ? (
                    <span className="text-green-400 animate-pulse">당신의 턴입니다!</span>
                ) : (
                    <span className="text-red-400">적의 턴입니다...</span>
                )}
            </div>
        </div>
    );
};

export default CombatPanel;
