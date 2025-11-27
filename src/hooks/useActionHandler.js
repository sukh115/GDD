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

        // 1. Check Costs
        const fatigueCost = actionConfig.cost.fatigue || 0;
        const goldCost = actionConfig.cost.gold || 0;

        // Check if we have enough gold (fatigue can go up, but gold usually can't go negative)
        if (resources.gold < goldCost) {
            console.log('Not enough gold!');
            return; // Or trigger a UI feedback
        }

        // 2. Apply Costs
        if (fatigueCost !== 0) updateResource('fatigue', fatigueCost);
        if (goldCost !== 0) updateResource('gold', -goldCost);

        // 3. Calculate & Apply Rewards
        // Logic for "Awakening" scaling:
        // Example: Slaughter scales with Karma (negative karma increases power?)
        // For now, we'll implement a simple multiplier if in awakening phase and karma is involved.

        let strReward = actionConfig.reward.str || 0;
        let dexReward = actionConfig.reward.dex || 0;
        let intReward = actionConfig.reward.int || 0;
        let luckReward = actionConfig.reward.luck || 0;
        let intuitionReward = actionConfig.reward.intuition || 0;
        let karmaReward = actionConfig.reward.karma || 0;
        let goldReward = actionConfig.reward.gold || 0;

        if (phase === 'awakening') {
            if (actionType === 'TRAIN') {
                // Slaughter: More negative karma = more strength gain
                const karmaBonus = Math.floor(Math.abs(stats.karma) * 0.5);
                strReward += karmaBonus;
                // Increase Threat
                updateResource('threat', 5);
            } else if (actionType === 'EARN') {
                // Plunder: Increase Threat
                updateResource('threat', 2);
            } else if (actionType === 'REST') {
                // Hibernate: Increase Bond
                updateResource('bond', 5);
            } else if (actionType === 'SPECIAL') {
                // Extort: Increase Threat
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

        // 4. Increment Event Counter
        incrementEventCounter();
    };

    return { handleAction };
};

export default useActionHandler;
