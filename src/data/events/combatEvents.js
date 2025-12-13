// ====================================
// 전투 이벤트 (Combat Events)
// 몬스터 조우 - monsters.js에서 데이터 참조
// ====================================

import { getMonstersByLocation } from '../monsters';

/**
 * 전투 이벤트 생성
 * @param {string} locationId - 현재 위치
 * @param {Object} state - 게임 상태
 * @returns {Object} 전투 이벤트
 */
export function generate(locationId, state) {
    // 해당 지역에서 출현 가능한 몬스터 가져오기
    const monsters = getMonstersByLocation(locationId, state.totalTurnCount);

    if (monsters.length === 0) {
        return {
            id: 'combat_nothing',
            type: 'combat',
            text: '적의 기척이 느껴졌지만 사라졌습니다.',
            options: [{ label: '계속한다', log: '안도의 한숨을 쉽니다.' }],
        };
    }

    // 랜덤 몬스터 선택
    const monster = monsters[Math.floor(Math.random() * monsters.length)];

    return {
        id: `combat_${monster.id}`,
        type: 'combat',
        text: `${monster.name}(이)가 나타났습니다!`,
        monster: monster, // 몬스터 정보 포함
        options: [
            {
                label: '싸운다!',
                action: 'START_COMBAT',
                monsterId: monster.id,
                log: '전투 시작!'
            },
            {
                label: '도망친다',
                cost: { fatigue: 15 + (monster.level || 1) * 5 },
                log: '도망쳤습니다.'
            },
        ],
    };
}
