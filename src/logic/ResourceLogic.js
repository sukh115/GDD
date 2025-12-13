// ====================================
// ResourceLogic - 자원/스탯 관련 로직
// ====================================

/**
 * 자원 적용
 * @param {string} resource - 자원 종류
 * @param {number} amount - 변화량
 * @param {Object} state - 현재 상태
 * @returns {Object} { resources, triggerDeath, triggerAwakening }
 */
export function applyResource(resource, amount, state) {
    let newVal = (state.resources[resource] || 0) + amount;

    // HP 범위 제한
    if (resource === 'hp') {
        newVal = Math.min(Math.max(0, newVal), state.resources.maxHp);
    }

    // 음수 방지
    if (['gold', 'fatigue', 'threat', 'bond'].includes(resource)) {
        newVal = Math.max(0, newVal);
    }

    const newResources = { ...state.resources, [resource]: newVal };

    return {
        resources: newResources,
        triggerDeath: resource === 'hp' && newVal <= 0 && state.gameStatus === 'playing',
        triggerAwakening: resource === 'threat' && newVal >= 100 && state.phase !== 'awakening',
    };
}
