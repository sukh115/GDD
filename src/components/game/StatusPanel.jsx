import React from 'react';
import useGameStore from '../../store/gameStore';

function StatusPanel() {
    const { stats, resources, phase } = useGameStore();

    // 주요 자원 바
    const resourceBars = [
        { key: 'hp', label: 'HP', value: resources.hp, max: resources.maxHp, color: 'hp' },
        { key: 'fatigue', label: '피로', value: resources.fatigue, max: 100, color: 'fatigue' },
        { key: 'threat', label: '위협', value: resources.threat, max: 100, color: 'threat' },
    ];

    if (phase === 'awakening') {
        resourceBars.push({ key: 'bond', label: '결속', value: resources.bond, max: 100, color: 'bond' });
    }

    return (
        <div className="glass-card p-4 mb-4">
            {/* 골드 표시 */}
            <div className="flex justify-between items-center mb-4">
                <span className="text-yellow-400 font-bold">
                    💰 {resources.gold} Gold
                </span>
                <span className="text-xs text-gray-500">
                    Karma: <span className={stats.karma >= 0 ? 'text-blue-400' : 'text-red-400'}>
                        {stats.karma > 0 ? '+' : ''}{stats.karma}
                    </span>
                </span>
            </div>

            {/* 자원 바 */}
            <div className="space-y-3 mb-4">
                {resourceBars.map(bar => (
                    <div key={bar.key}>
                        <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-400">{bar.label}</span>
                            <span>{bar.value}/{bar.max}</span>
                        </div>
                        <div className="stat-bar">
                            <div
                                className={`stat-bar-fill ${bar.color}`}
                                style={{ width: `${(bar.value / bar.max) * 100}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* 스탯 그리드 */}
            <div className="grid grid-cols-3 gap-2 text-center text-sm">
                <StatBox label="힘" value={stats.str} icon="⚔️" />
                <StatBox label="민첩" value={stats.dex} icon="🏃" />
                <StatBox label="지능" value={stats.int} icon="📚" />
                <StatBox label="행운" value={stats.luck} icon="🍀" />
                <StatBox label="직감" value={stats.intuition} icon="👁️" />
                <div className="p-2 bg-white/5 rounded-lg">
                    <span className="text-xs text-gray-500">Karma</span>
                    <div className={`font-bold ${stats.karma >= 0 ? 'text-blue-400' : 'text-red-400'}`}>
                        {stats.karma >= 0 ? '☀️' : '🌙'} {stats.karma}
                    </div>
                </div>
            </div>

            {/* DEV: 테스트 버튼 */}
            {import.meta.env.DEV && phase === 'exploration' && (
                <div className="mt-3 pt-3 border-t border-white/10">
                    <button
                        onClick={() => useGameStore.getState()._flowEnterAwakening()}
                        className="w-full py-2 bg-red-900/50 hover:bg-red-800/50 rounded text-xs text-red-300"
                    >
                        🧪 DEV: 각성 모드 진입
                    </button>
                </div>
            )}
        </div>
    );
}

function StatBox({ label, value, icon }) {
    return (
        <div className="p-2 bg-white/5 rounded-lg">
            <span className="text-xs text-gray-500">{label}</span>
            <div className="font-bold">{icon} {value}</div>
        </div>
    );
}

export default StatusPanel;
