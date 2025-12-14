import { create } from 'zustand';

// ====================================
// The Awakening - Game Store
// 순수 흐름(Flow)만 - 로직 없음
// ====================================

import * as EventLogic from '../logic/EventLogic';
import * as CombatLogic from '../logic/CombatLogic';
import * as TravelLogic from '../logic/TravelLogic';
import * as ResourceLogic from '../logic/ResourceLogic';

// === 초기 상태 ===
const INITIAL_STATE = {
    stats: { str: 10, dex: 10, int: 10, luck: 10, intuition: 5, karma: 0 },
    resources: { gold: 50, fatigue: 0, hp: 100, maxHp: 100, threat: 0, bond: 0 },
    flags: new Set(),
    inventory: [],
    equipped: { weapon: null, armor: null, accessory: null },
    location: 'village',
    phase: 'exploration',
    gameStatus: 'playing',
    eventCounter: 0,
    threshold: 20,
    pityCounter: 0,
    currentEvent: null,
    combatState: null,
    totalTurnCount: 0,
    logs: [{ id: 0, text: '새로운 모험이 시작됩니다...', type: 'system' }],
    endingData: null,
};

const useGameStore = create((set, get) => ({
    ...INITIAL_STATE,

    // === 흐름 1: 액션 실행 ===
    onAction: (actionId) => {
        const state = get();
        if (state.phase === 'awakening') {
            get()._applyResource('bond', 1);
            return;
        }
        const newCounter = state.eventCounter + 1;
        set({ eventCounter: newCounter });
        if (newCounter >= state.threshold) {
            get()._flowTriggerEvent();
        }
    },

    // === 흐름 2: 이벤트 발생 ===
    _flowTriggerEvent: () => {
        const state = get();
        const event = EventLogic.generateEvent(state.location, state);
        set({
            phase: 'event',
            currentEvent: event,
            eventCounter: 0,
            threshold: EventLogic.getNewThreshold(state.stats.luck),
        });
        get()._addLog(`🎭 ${event.text}`, 'special');
        if (event.type === 'fortune') {
            set({ pityCounter: 0 });
        } else {
            set({ pityCounter: state.pityCounter + 1 });
        }
    },

    // === 흐름 3: 이벤트 선택 ===
    onEventOption: (option) => {
        const state = get();

        // 최종 선택 처리
        if (state.currentEvent?.type === 'finalChoice') {
            if (option.id === 'destroy') {
                get()._addFlag('WORLD_DESTROYED');
                get().onTriggerEnding('void_king');
            } else if (option.id === 'wait') {
                get()._addFlag('WAITING_NEXT_GENERATION');
                get().onTriggerEnding('observer');
            }
            return;
        }

        if (state.currentEvent?.misfortuneEffect) {
            state.currentEvent.misfortuneEffect(get());
        }
        const result = EventLogic.resolveOption(option, get());
        if (result.nextPhase === 'shop') {
            set({ phase: 'shop' });
        } else if (result.nextPhase === 'combat') {
            get()._flowStartCombat(result.monsterId);
        } else {
            get()._flowShowTravel();
        }
    },

    // === 흐름 4: 이동 선택지 표시 ===
    _flowShowTravel: () => {
        const state = get();
        const choices = TravelLogic.getChoices(state.location, state);
        set({
            phase: 'event',
            currentEvent: {
                type: 'travel',
                text: '어디로 갈까요?',
                travelChoices: choices,
            }
        });
    },

    // === 흐름 5: 이동 실행 ===
    onTravel: (destinationId) => {
        TravelLogic.moveTo(destinationId, set, get);
        set((s) => ({
            totalTurnCount: s.totalTurnCount + 1,
            currentEvent: null,
            phase: 'exploration',
        }));
        get()._addLog(destinationId ? '📍 이동했습니다.' : '📍 머물렀습니다.', 'system');
    },

    // === 흐름 6: 전투 시작 ===
    _flowStartCombat: (monsterId) => {
        const combatState = CombatLogic.startCombat(monsterId);
        if (!combatState) {
            get()._flowShowTravel();
            return;
        }
        set({ phase: 'combat', combatState, currentEvent: null });
        get()._addLog(`⚔️ ${combatState.monster.name} 전투 시작!`, 'danger');
    },

    // === 흐름 7: 전투 액션 ===
    onCombatAction: (action) => {
        const state = get();
        const result = CombatLogic.executeAction(action, state.combatState, state.stats);
        get()._addLog(result.log, result.logType);
        if (result.isVictory) {
            get()._flowEndCombat(true);
        } else if (result.isFlee) {
            set({ combatState: null });
            get()._flowShowTravel();
        } else if (result.newCombatState) {
            set({ combatState: result.newCombatState });
            if (!result.newCombatState.isPlayerTurn) {
                setTimeout(() => get()._flowEnemyTurn(), 800);
            }
        }
    },

    // === 흐름 8: 적 턴 ===
    _flowEnemyTurn: () => {
        const state = get();
        if (!state.combatState) return;
        const result = CombatLogic.enemyTurn(state.combatState, state.stats);
        if (!result.isDodged) {
            get()._applyResource('hp', -result.damage);
        }
        get()._addLog(result.log, result.logType);
        set({ combatState: result.newCombatState });
    },

    // === 흐름 9: 전투 종료 ===
    _flowEndCombat: (victory) => {
        const state = get();

        // 최종 보스 승리 시 특별 처리
        if (victory && state.combatState?.monster?.isFinalBoss) {
            get()._addLog('⚡ 용사와 마왕의 연합을 물리쳤습니다!', 'special');
            get()._addFlag('FINAL_BATTLE_WON');
            set({ combatState: null });

            // 최종 선택 이벤트 표시
            set({
                phase: 'event',
                currentEvent: {
                    type: 'finalChoice',
                    text: '세상의 마지막 저항이 사라졌습니다. 이제 당신 앞에는 두 가지 길이 있습니다...',
                    options: [
                        {
                            id: 'destroy',
                            label: '🔥 세상을 멸망시킨다',
                            description: '모든 것을 끝낸다. 남은 것은 오직 공허뿐.',
                        },
                        {
                            id: 'wait',
                            label: '⏳ 다음 세대를 기다린다',
                            description: '더 강해진 용사와 마왕이 나타날 때까지 잠든다.',
                        },
                    ],
                },
            });
            return;
        }

        // 일반 전투 승리
        if (victory && state.combatState?.monster?.reward) {
            get()._applyResource('gold', state.combatState.monster.reward.gold || 0);
            get()._addLog('🏆 승리!', 'special');
        }
        set({ combatState: null });
        get()._flowShowTravel();
    },

    // === 흐름 10: 상점 닫기 ===
    onCloseShop: () => {
        get()._flowShowTravel();
    },

    // === 흐름 11: 각성 ===
    _flowEnterAwakening: () => {
        set({ phase: 'awakening' });
        get()._addLog('🌑 [각성] 시작.', 'danger');
    },

    // === 흐름 12: 엔딩 ===
    onTriggerEnding: (endingId) => {
        const state = get();
        set({
            gameStatus: 'ended',
            phase: 'ended',
            endingData: { id: endingId, stats: state.stats, resources: state.resources },
        });
    },

    // === 흐름 13: 재시작 ===
    onRestart: () => set({
        ...INITIAL_STATE,
        flags: new Set(),
        logs: [{ id: 0, text: '새로운 모험이 시작됩니다...', type: 'system' }]
    }),

    // === 내부 헬퍼 ===
    _applyResource: (resource, amount) => {
        const result = ResourceLogic.applyResource(resource, amount, get());
        set({ resources: result.resources });
        if (result.triggerDeath) get().onTriggerEnding('death');
        if (result.triggerAwakening) get()._flowEnterAwakening();
    },

    _applyStat: (stat, amount) => set((s) => ({
        stats: { ...s.stats, [stat]: s.stats[stat] + amount }
    })),

    _addFlag: (flag) => set((s) => {
        const flags = new Set(s.flags);
        flags.add(flag);
        return { flags };
    }),

    _addLog: (text, type = 'normal') => set((s) => ({
        logs: [...s.logs, { id: Date.now(), text, type }].slice(-30)
    })),

    // === 유틸리티 ===
    setState: (newState) => set(newState),
    getState: () => get(),
}));

export default useGameStore;