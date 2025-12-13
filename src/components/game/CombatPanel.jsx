import React from 'react';
import useGameStore from '../../store/gameStore';

function CombatPanel() {
    const { combatState, resources, onCombatAction } = useGameStore();

    if (!combatState) return null;

    const { monster, turn, isPlayerTurn } = combatState;
    const monsterHp = (monster.currentHp / monster.hp) * 100;
    const playerHp = (resources.hp / resources.maxHp) * 100;

    return (
        <div className="glass-card p-4 mb-4 border-2 border-red-500/50">
            <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-bold text-red-400">⚔️ 전투 - Turn {turn}</span>
                <span className={`text-sm ${isPlayerTurn ? 'text-green-400' : 'text-yellow-400'}`}>
                    {isPlayerTurn ? '당신의 차례' : '적의 차례...'}
                </span>
            </div>

            {/* 몬스터 */}
            <div className="bg-black/30 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-lg">{monster.name}</span>
                    <span className="text-sm text-gray-400">{monster.currentHp}/{monster.hp}</span>
                </div>
                <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 transition-all" style={{ width: `${monsterHp}%` }} />
                </div>
            </div>

            {/* 플레이어 */}
            <div className="bg-black/30 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="font-bold">당신</span>
                    <span className="text-sm text-gray-400">{resources.hp}/{resources.maxHp}</span>
                </div>
                <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 transition-all" style={{ width: `${playerHp}%` }} />
                </div>
            </div>

            {/* 액션 */}
            <div className="grid grid-cols-3 gap-2">
                <button onClick={() => onCombatAction('attack')} disabled={!isPlayerTurn}
                    className="action-btn py-3 text-center disabled:opacity-50">⚔️ 공격</button>
                <button onClick={() => onCombatAction('defend')} disabled={!isPlayerTurn}
                    className="action-btn py-3 text-center disabled:opacity-50">🛡️ 방어</button>
                <button onClick={() => onCombatAction('flee')} disabled={!isPlayerTurn}
                    className="action-btn py-3 text-center disabled:opacity-50">🏃 도주</button>
            </div>
        </div>
    );
}

export default CombatPanel;
