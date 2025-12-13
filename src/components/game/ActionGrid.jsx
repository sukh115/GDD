import React from 'react';
import useGameStore from '../../store/gameStore';
import { ACTIONS } from '../../constants/gameRules';

function ActionGrid({ location }) {
    const { phase, resources, onAction, _applyResource, _applyStat, _addLog, setState } = useGameStore();

    // 현재 페이즈에 따른 액션 목록
    const actionSet = phase === 'awakening' ? ACTIONS.awakening : ACTIONS.exploration;

    // 현재 위치에서 가능한 액션 필터
    const availableActions = Object.values(actionSet).filter(
        action => action.locations.includes(location.id)
    );

    const handleAction = (action) => {
        // 특수 액션 처리
        if (action.special === 'openShop') {
            setState({ phase: 'shop' });
            _addLog('🛒 상점을 열었습니다.', 'system');
            return;
        }

        // 코스트 체크
        for (const [resource, amount] of Object.entries(action.cost)) {
            if (resource === 'gold' && resources.gold < amount) {
                _addLog('💰 골드가 부족합니다!', 'danger');
                return;
            }
            if (resource === 'fatigue' && resources.fatigue + amount > 100) {
                _addLog('😰 너무 피곤합니다!', 'danger');
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

        // 로그
        _addLog(`✨ ${action.label} 완료!`, 'success');

        // 흐름: 액션 실행
        onAction(action.id);
    };

    return (
        <div className="glass-card p-4">
            <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-400">
                    {phase === 'awakening' ? '🌑 각성 행동' : '⚔️ 행동'}
                </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {availableActions.map(action => (
                    <ActionButton
                        key={action.id}
                        action={action}
                        isAwakening={phase === 'awakening'}
                        onClick={() => handleAction(action)}
                    />
                ))}
            </div>
        </div>
    );
}

function ActionButton({ action, isAwakening, onClick }) {
    const costText = Object.entries(action.cost)
        .map(([res, amt]) => res === 'fatigue' ? `피로+${amt}` : res === 'gold' ? `💰-${amt}` : `${res}${amt}`)
        .join(', ');

    const rewardText = Object.entries(action.reward)
        .filter(([, amt]) => amt !== 0)
        .map(([stat, amt]) => `${stat}${amt > 0 ? '+' : ''}${amt}`)
        .join(' ');

    return (
        <button onClick={onClick} className={`action-btn text-left ${isAwakening ? 'awakening' : ''}`}>
            <div className="font-bold mb-1">{action.label}</div>
            <div className="text-xs text-gray-400 mb-2">{action.description}</div>
            {costText && <div className="text-xs text-red-400 mb-1">{costText}</div>}
            {rewardText && <div className="text-xs text-green-400">{rewardText}</div>}
        </button>
    );
}

export default ActionGrid;
