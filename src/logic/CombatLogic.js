// ====================================
// CombatLogic - 전투 관련 로직
// ====================================

import { getMonster } from '../data/monsters';

/**
 * 전투 시작
 * @param {string} monsterId - 몬스터 ID
 * @returns {Object|null} 전투 상태
 */
export function startCombat(monsterId) {
    const monster = getMonster(monsterId);
    if (!monster) return null;

    return {
        monster: { ...monster, currentHp: monster.hp },
        turn: 1,
        isPlayerTurn: true,
    };
}

/**
 * 전투 액션 실행
 * @param {string} action - attack | defend | flee
 * @param {Object} combatState - 전투 상태
 * @param {Object} playerStats - 플레이어 스탯
 * @returns {Object} 결과
 */
export function executeAction(action, combatState, playerStats) {
    switch (action) {
        case 'attack':
            return attack(combatState, playerStats);
        case 'defend':
            return defend(combatState);
        case 'flee':
            return flee(combatState, playerStats);
        default:
            return { newCombatState: combatState };
    }
}

function attack(combatState, playerStats) {
    const { monster } = combatState;
    const baseDamage = playerStats.str || 10;
    const isCritical = Math.random() < (playerStats.luck * 0.02);

    let damage = Math.max(1, baseDamage - (monster.defense || 0));
    if (isCritical) damage = Math.floor(damage * 2);

    const newMonsterHp = monster.currentHp - damage;
    const isVictory = newMonsterHp <= 0;

    return {
        damage,
        isCritical,
        isVictory,
        log: isCritical ? `💥 치명타! ${damage} 피해!` : `⚔️ ${damage} 피해.`,
        logType: isCritical ? 'special' : 'normal',
        newCombatState: isVictory ? null : {
            ...combatState,
            monster: { ...monster, currentHp: newMonsterHp },
            isPlayerTurn: false,
        },
    };
}

function defend(combatState) {
    return {
        log: '🛡️ 방어.',
        logType: 'system',
        newCombatState: {
            ...combatState,
            isPlayerTurn: false,
            isDefending: true,
        },
    };
}

function flee(combatState, playerStats) {
    const fleeChance = 0.5 + (playerStats.dex * 0.01);
    const success = Math.random() < fleeChance;

    return {
        isFlee: success,
        log: success ? '🏃 도망 성공!' : '🏃 도망 실패!',
        logType: success ? 'success' : 'danger',
        newCombatState: success ? null : {
            ...combatState,
            isPlayerTurn: false,
        },
    };
}

/**
 * 적 턴
 * @param {Object} combatState - 전투 상태
 * @param {Object} playerStats - 플레이어 스탯
 * @returns {Object} 결과
 */
export function enemyTurn(combatState, playerStats) {
    const { monster, isDefending } = combatState;
    let damage = Math.max(1, monster.attack - (playerStats.dex || 0));

    if (isDefending) damage = Math.floor(damage / 2);

    const dodgeChance = playerStats.dex * 0.01;
    const isDodged = Math.random() < dodgeChance;

    return {
        damage: isDodged ? 0 : damage,
        isDodged,
        log: isDodged ? '🌀 회피!' : `💢 ${damage} 피해!`,
        logType: isDodged ? 'special' : 'danger',
        newCombatState: {
            ...combatState,
            turn: combatState.turn + 1,
            isPlayerTurn: true,
            isDefending: false,
        },
    };
}
