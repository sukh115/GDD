import React from 'react';
import useGameStore from '../../store/gameStore';
import { getAwakeningActionsForLocation, AWAKENING_ACTIONS } from '../../data/actions';
import { getAllLocations } from '../../data/locations';

/**
 * 각성 모드 전용 패널
 * - 어두운 분위기 UI
 * - Bond 게이지 표시
 * - 지역별 각성 액션
 * - 자유 이동
 * - 최종 결전 버튼
 */
function AwakeningPanel() {
    const {
        resources,
        stats,
        location,
        _applyResource,
        _applyStat,
        _addLog,
        _addFlag,
        onAction,
        _flowStartCombat,
        setState,
    } = useGameStore();

    // 현재 위치에서 가능한 각성 액션
    const availableActions = getAwakeningActionsForLocation(location);

    // 최종 결전 가능 여부
    const canFinalBattle = location === 'demon_castle' && resources.bond >= 30;

    // 모든 지역 (자유 이동용)
    const allLocations = getAllLocations();

    const handleAwakeningAction = (action) => {
        // 코스트 체크
        for (const [resource, amount] of Object.entries(action.cost)) {
            if (resource === 'fatigue' && resources.fatigue + amount > 100) {
                _addLog('😰 너무 피곤합니다...', 'danger');
                return;
            }
        }

        // 코스트 적용
        for (const [resource, amount] of Object.entries(action.cost)) {
            _applyResource(resource, resource === 'fatigue' ? amount : -amount);
        }

        // 리워드 적용
        for (const [key, amount] of Object.entries(action.reward)) {
            if (['gold', 'fatigue', 'hp', 'threat', 'bond'].includes(key)) {
                _applyResource(key, amount);
            } else {
                _applyStat(key, amount);
            }
        }

        // 특수 처리
        if (action.special === 'startFinalBattle') {
            _addLog('⚡ 최후의 결전이 시작됩니다!', 'danger');
            _addFlag('FINAL_BATTLE_STARTED');
            _flowStartCombat('hero');
            return;
        }

        _addLog(`${action.icon} ${action.label} 완료!`, 'success');
        onAction(action.id);
    };

    const handleTravel = (destId) => {
        if (destId === location) return;
        setState({ location: destId });
        _addLog(`🌑 ${allLocations.find(l => l.id === destId)?.name || destId}(으)로 이동...`, 'system');
    };

    // Bond 게이지 색상
    const bondColor = resources.bond >= 50 ? 'from-purple-500 to-pink-500'
        : resources.bond >= 30 ? 'from-red-500 to-orange-500'
            : 'from-gray-600 to-gray-500';

    return (
        <div className="glass-card p-4 border-2 border-red-900/50 bg-black/40">
            {/* 헤더 */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <span className="text-2xl">🌑</span>
                    <span className="text-lg font-bold text-red-400">각성 모드</span>
                </div>
                <div className="text-sm text-gray-400">
                    카르마: <span className="text-red-400">{stats.karma}</span>
                </div>
            </div>

            {/* Bond 게이지 */}
            <div className="mb-4">
                <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">🔗 유대(Bond)</span>
                    <span className="text-purple-400">{resources.bond}/100</span>
                </div>
                <div className="w-full h-3 bg-black/40 rounded-full overflow-hidden">
                    <div
                        className={`h-full bg-gradient-to-r ${bondColor} transition-all duration-500`}
                        style={{ width: `${resources.bond}%` }}
                    />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                    {resources.bond >= 50 ? '인간과 마족의 화합이 가까워지고 있습니다...'
                        : resources.bond >= 30 ? '희망의 빛이 보이기 시작합니다.'
                            : '절대적 공포 앞에 세상이 떨고 있습니다.'}
                </p>
            </div>

            {/* 자유 이동 */}
            <div className="mb-4">
                <div className="text-xs text-gray-400 mb-2">🗺️ 자유 이동</div>
                <div className="flex flex-wrap gap-1">
                    {allLocations.map(loc => (
                        <button
                            key={loc.id}
                            onClick={() => handleTravel(loc.id)}
                            disabled={loc.id === location}
                            className={`px-2 py-1 text-xs rounded ${loc.id === location
                                    ? 'bg-red-700 text-white'
                                    : 'bg-black/30 text-gray-400 hover:bg-red-900/50 hover:text-red-300'
                                }`}
                        >
                            {loc.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* 각성 액션 */}
            <div className="mb-4">
                <div className="text-xs text-gray-400 mb-2">⚔️ 행동 (이 지역에서 가능)</div>
                <div className="grid grid-cols-2 gap-2">
                    {availableActions.filter(a => a.id !== 'FINAL_BATTLE').map(action => (
                        <button
                            key={action.id}
                            onClick={() => handleAwakeningAction(action)}
                            className="p-3 bg-red-900/30 hover:bg-red-800/40 rounded-lg text-left transition-colors border border-red-900/30"
                        >
                            <div className="flex items-center gap-2 mb-1">
                                <span>{action.icon}</span>
                                <span className="font-bold text-red-300 text-sm">{action.label}</span>
                            </div>
                            <p className="text-xs text-gray-400 mb-2">{action.description}</p>
                            <div className="flex gap-2 text-xs flex-wrap">
                                {Object.entries(action.cost).map(([r, a]) => (
                                    <span key={r} className="text-red-400">
                                        {r === 'fatigue' ? `피로+${a}` : `${r}-${a}`}
                                    </span>
                                ))}
                                {Object.entries(action.reward).filter(([, a]) => a !== 0).map(([s, a]) => (
                                    <span key={s} className="text-green-400">
                                        {s}{a > 0 ? '+' : ''}{a}
                                    </span>
                                ))}
                            </div>
                        </button>
                    ))}
                </div>
                {availableActions.filter(a => a.id !== 'FINAL_BATTLE').length === 0 && (
                    <p className="text-center text-gray-500 py-4">
                        이 지역에서 할 수 있는 행동이 없습니다.
                    </p>
                )}
            </div>

            {/* 최종 결전 버튼 (마왕성에서만) */}
            {location === 'demon_castle' && (
                <button
                    onClick={() => handleAwakeningAction(AWAKENING_ACTIONS.FINAL_BATTLE)}
                    disabled={!canFinalBattle}
                    className={`w-full p-4 rounded-lg font-bold text-lg transition-all ${canFinalBattle
                            ? 'bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-500 hover:to-red-500 text-white animate-pulse'
                            : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                        }`}
                >
                    ⚡ 최후의 결전
                    {!canFinalBattle && (
                        <span className="block text-xs mt-1">
                            (Bond 30 이상 필요)
                        </span>
                    )}
                </button>
            )}

            {/* 경고 메시지 */}
            <div className="mt-4 p-3 bg-red-900/20 rounded-lg border border-red-900/30">
                <p className="text-xs text-red-300/70 text-center">
                    ⚠️ 당신은 이제 인류의 적입니다. 모든 선택에는 대가가 따릅니다.
                </p>
            </div>
        </div>
    );
}

export default AwakeningPanel;
