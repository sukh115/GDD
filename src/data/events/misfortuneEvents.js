// ====================================
// 악연 이벤트 (Misfortune Events)
// 업보 - 확률 아닌 조건 기반
// ====================================

const MISFORTUNE_CONDITIONS = [
    {
        id: 'mis_exhaustion',
        name: '탈진',
        condition: (state) => state.resources?.fatigue >= 80,
        text: '극심한 피로가 몰려옵니다.',
        effect: (store) => {
            store._applyResource('hp', -10);
            store._addLog('⚠️ 피로로 HP 감소.', 'danger');
        },
        priority: 100, // 높을수록 우선
    },
    {
        id: 'mis_reputation',
        name: '추적자',
        condition: (state) => state.stats?.karma <= -30,
        text: '악행이 알려졌습니다. 추적자가 쫓아옵니다!',
        effect: (store) => {
            store._applyResource('threat', 10);
            store._addLog('🎯 추적자! 위협도 증가.', 'danger');
        },
        priority: 50,
    },
    {
        id: 'mis_cursed',
        name: '저주',
        condition: (state) => state.flags?.has?.('TOUCHED_DARK_ARTIFACT'),
        text: '어두운 기운이 잠식합니다.',
        effect: (store) => {
            store._applyStat('luck', -2);
            store._addLog('💀 저주! 행운 감소.', 'danger');
        },
        priority: 80,
    },
];

/**
 * 악연 체크 (조건 기반)
 * @param {Object} state - 게임 상태
 * @returns {Object|null} 악연 이벤트 또는 null
 */
export function check(state) {
    // 조건 만족하는 악연 찾기
    const applicable = MISFORTUNE_CONDITIONS.filter(m => m.condition(state));

    if (applicable.length === 0) return null;

    // 30% 확률로 발동 (너무 자주 나오면 안됨)
    if (Math.random() > 0.3) return null;

    // 우선순위 높은 것 선택
    applicable.sort((a, b) => b.priority - a.priority);
    const selected = applicable[0];

    return {
        id: selected.id,
        type: 'misfortune',
        text: selected.text,
        misfortuneEffect: selected.effect,
        options: [
            { label: '받아들인다', log: '업보를 감당합니다.' }
        ],
    };
}
