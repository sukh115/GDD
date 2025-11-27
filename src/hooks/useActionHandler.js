import useGameStore from '../store/gameStore';
import { ACTIONS } from '../constants/gameRules';
import useEventTrigger from './useEventTrigger';

const useActionHandler = () => {
    const {
        phase,
        resources,
        stats,
        eventCounter,
        threshold,
        updateResource,
        updateStat,
        incrementEventCounter,
    } = useGameStore();

    const { triggerEvent } = useEventTrigger();

    const handleAction = (actionType) => {
        const actionConfig = ACTIONS[actionType]?.[phase];

        if (!actionConfig) {
            console.warn(`Action ${actionType} not defined for phase ${phase}`);
            return;
        }

        // 1. 비용 확인
        const fatigueCost = actionConfig.cost.fatigue || 0;
        const goldCost = actionConfig.cost.gold || 0;

        // 골드가 충분한지 확인 (피로도는 증가할 수 있지만, 골드는 보통 음수가 되지 않음)
        if (resources.gold < goldCost) {
            console.log('Not enough gold!');
            return; // Or trigger a UI feedback
        }

        // 2. 비용 적용
        if (fatigueCost !== 0) updateResource('fatigue', fatigueCost);
        if (goldCost !== 0) updateResource('gold', -goldCost);

        // 3. 보상 계산 및 적용
        // 'Awakening' 단계에서의 스케일링 로직:
        // 예: Slaughter는 카르마에 따라 증가함 (음수 카르마가 힘을 증가시키는가?)
        // 당분간 각성 단계이고 카르마가 관련된 경우 간단한 배율을 적용합니다.

        let strReward = actionConfig.reward.str || 0;
        let dexReward = actionConfig.reward.dex || 0;
        let intReward = actionConfig.reward.int || 0;
        let luckReward = actionConfig.reward.luck || 0;
        let intuitionReward = actionConfig.reward.intuition || 0;
        let karmaReward = actionConfig.reward.karma || 0;
        let goldReward = actionConfig.reward.gold || 0;

        if (phase === 'awakening') {
            if (actionType === 'TRAIN') {
                // Slaughter: 카르마가 더 음수일수록 힘 증가량이 늘어납니다
                const karmaBonus = Math.floor(Math.abs(stats.karma) * 0.5);
                strReward += karmaBonus;
                // 위협 수치 증가
                updateResource('threat', 5);
            } else if (actionType === 'EARN') {
                // Plunder: 위협 수치 증가
                updateResource('threat', 2);
            } else if (actionType === 'REST') {
                // Hibernate: 유대감 증가
                updateResource('bond', 5);
            } else if (actionType === 'SPECIAL') {
                // Extort: 위협 수치 증가
                updateResource('threat', 3);
            }
        }

        if (strReward !== 0) updateStat('str', strReward);
        if (dexReward !== 0) updateStat('dex', dexReward);
        if (intReward !== 0) updateStat('int', intReward);
        if (luckReward !== 0) updateStat('luck', luckReward);
        if (intuitionReward !== 0) updateStat('intuition', intuitionReward);
        if (karmaReward !== 0) updateStat('karma', karmaReward);
        if (goldReward !== 0) updateResource('gold', goldReward);

        // 4. 이벤트 카운터 증가
        incrementEventCounter();
    };

    return { handleAction };
};

export default useActionHandler;
