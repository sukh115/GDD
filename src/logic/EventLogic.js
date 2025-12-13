// ====================================
// EventLogic - 이벤트 흐름 관리
// ====================================

import { getLocation } from '../data/locations';
import * as RelationEvents from '../data/events/relationEvents';
import * as CombatEvents from '../data/events/combatEvents';
import * as SpecialEvents from '../data/events/specialEvents';
import * as FortuneEvents from '../data/events/fortuneEvents';
import * as MisfortuneEvents from '../data/events/misfortuneEvents';

// ====================================
// 이벤트 타입
// ====================================
export const EVENT_TYPES = {
    RELATION: 'relation',     // 인연
    COMBAT: 'combat',         // 전투
    SPECIAL: 'special',       // 지역별 특수 이벤트
    FORTUNE: 'fortune',       // 기연 (막대한 보상, Pity Timer)
    MISFORTUNE: 'misfortune', // 악연 (업보)
};

// ====================================
// 1. 임계값 계산
// ====================================
export function getNewThreshold(luck = 10) {
    const min = 15;
    const max = 30 + Math.floor(luck / 5);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ====================================
// 2. 이벤트 타입 선택 (지역별 가중치)
//    기연은 별도 Pity Timer로 처리
// ====================================
export function selectEventType(locationId) {
    const location = getLocation(locationId);
    const weights = location.eventWeights || { relation: 30, combat: 30, special: 10 };

    const adjustedWeights = {
        [EVENT_TYPES.RELATION]: weights.relation,
        [EVENT_TYPES.COMBAT]: weights.combat,
        [EVENT_TYPES.SPECIAL]: weights.special,
    };

    const total = Object.values(adjustedWeights).reduce((a, b) => a + b, 0);
    let random = Math.random() * total;

    for (const [type, weight] of Object.entries(adjustedWeights)) {
        random -= weight;
        if (random <= 0) return type;
    }

    return EVENT_TYPES.RELATION;
}

// ====================================
// 3. 이벤트 생성 (메인 흐름)
// ====================================
export function generateEvent(locationId, state) {
    // 1. 악연 체크 (업보 - 조건 기반)
    const misfortune = MisfortuneEvents.check(state);
    if (misfortune) {
        return misfortune;
    }

    // 2. 기연 체크 (Pity Timer - 매우 희귀)
    const fortune = FortuneEvents.generate(state);
    if (fortune) {
        return fortune;
    }

    // 3. 일반 이벤트 타입 선택 (지역별 확률)
    const eventType = selectEventType(locationId);

    // 4. 타입별 이벤트 생성
    switch (eventType) {
        case EVENT_TYPES.COMBAT:
            return CombatEvents.generate(locationId, state);
        case EVENT_TYPES.SPECIAL:
            return SpecialEvents.generate(locationId, state);
        case EVENT_TYPES.RELATION:
        default:
            return RelationEvents.generate(locationId, state);
    }
}

// ====================================
// 4. 선택지 해결
// ====================================
export function resolveOption(option, store) {
    // 코스트 적용
    if (option.cost) {
        for (const [r, a] of Object.entries(option.cost)) {
            store._applyResource(r, -a);
        }
    }

    // 리워드 적용
    if (option.reward) {
        for (const [k, a] of Object.entries(option.reward)) {
            if (['gold', 'fatigue', 'hp', 'threat', 'bond'].includes(k)) {
                store._applyResource(k, a);
            } else {
                store._applyStat(k, a);
            }
        }
    }

    // 플래그 추가
    if (option.flag) store._addFlag(option.flag);

    // 로그
    if (option.log) store._addLog(option.log, 'special');

    // 다음 단계 결정
    if (option.action === 'OPEN_SHOP') return { nextPhase: 'shop' };
    if (option.action === 'START_COMBAT') return { nextPhase: 'combat', monsterId: option.monsterId };
    return { nextPhase: 'travel' };
}
