import { create } from 'zustand';
import { EVENT_THRESHOLD_MIN, EVENT_THRESHOLD_MAX } from '../constants/gameRules';
import { EVENTS } from '../data/events';
import { MONSTERS } from '../data/monsters';
import { ITEMS } from '../data/items';

const getRandomThreshold = () =>
    Math.floor(Math.random() * (EVENT_THRESHOLD_MAX - EVENT_THRESHOLD_MIN + 1)) + EVENT_THRESHOLD_MIN;

const useGameStore = create((set, get) => ({
    stats: {
        str: 10,
        dex: 10,
        int: 10,
        luck: 10,
        intuition: 10,
        reputation: 0,
        karma: 0,
    },
    resources: {
        gold: 100,
        fatigue: 0,
        hp: 100,
        threat: 0,
        bond: 0,
    },
    flags: new Set(),
    eventCounter: 0,
    totalTurnCount: 0, // [추가] 전체 턴 수 (진행도)
    threshold: getRandomThreshold(),
    pityCounter: 0,
    phase: 'exploration', // 'exploration' | 'awakening' | 'event'
    gameStatus: 'playing', // 'playing' | 'ended'
    endingData: null,
    inventory: [],

    // [추가] 현재 발생한 이벤트 데이터
    currentEvent: null,

    logs: [{ id: 0, text: "모험이 시작되었습니다...", type: 'system' }],

    // Actions
    addLog: (text, type = 'normal') =>
        set((state) => {
            const newLog = { id: Date.now(), text, type };
            const newLogs = [...state.logs, newLog].slice(-50);
            return { logs: newLogs };
        }),

    addItem: (itemId) => set((state) => {
            const item = ITEMS[itemId];
            if (!item) return state;
            return { inventory: [...state.inventory, item] };
        }),

    consumeItem: (index) => set((state) => {
        const item = state.inventory[index];
        if (!item || item.type !== 'consumable') return state;

        // 효과 적용
        const { effect } = item;
        if (effect.resource) {
            get().updateResource(effect.resource, effect.amount);
            get().addLog(`${item.name}을(를) 사용하여 ${effect.resource} 변동: ${effect.amount}`);
        }
        if (effect.stat) {
            get().updateStat(effect.stat, effect.amount);
            get().addLog(`${item.name}을(를) 사용하여 ${effect.stat} 증가!`);
        }
        const newInventory = [...state.inventory];
        newInventory.splice(index, 1);
        
        return { inventory: newInventory };
    }),

    // 4. 아이템 구매 (골드 체크 포함)
    buyItem: (itemId) => {
        const state = get();
        const item = ITEMS[itemId];
        
        if (state.resources.gold >= item.price) {
            get().updateResource('gold', -item.price);
            get().addItem(itemId);
            get().addLog(`${item.name}을(를) 구매했습니다.`, 'system');
            return true; // 구매 성공
        } else {
            get().addLog("골드가 부족합니다!", 'danger');
            return false; // 구매 실패
        }
    },

    updateResource: (type, amount) =>
        set((state) => {
            const currentAmount = state.resources[type] || 0;
            let newAmount = currentAmount + amount;

            // Clamp
            if (type === 'hp') newAmount = Math.min(Math.max(0, newAmount), 100);
            if (type === 'fatigue') newAmount = Math.min(Math.max(0, newAmount), 100);
            if (type === 'gold') newAmount = Math.max(0, newAmount);
            if (type === 'threat') newAmount = Math.max(0, newAmount);
            if (type === 'bond') newAmount = Math.max(0, newAmount);

            const newResources = { ...state.resources, [type]: newAmount };

            // [추가] HP 0이면 사망 엔딩 트리거
            if (type === 'hp' && newAmount <= 0 && state.gameStatus === 'playing') {
                setTimeout(() => {
                    get().triggerEnding('death');
                }, 500);
            }

            // [추가] Threat 100 이상이면 각성 페이즈 진입
            if (type === 'threat' && newAmount >= 100 && state.phase !== 'awakening') {
                get().setPhase('awakening');
                get().addLog("무언가 끊어지는 소리가 들립니다... [각성]이 시작되었습니다.", "danger");
            }

            return { resources: newResources };
        }),

    updateStat: (type, amount) =>
        set((state) => ({
            stats: { ...state.stats, [type]: (state.stats[type] || 0) + amount },
        })),

    incrementEventCounter: () =>
        set((state) => ({
            eventCounter: state.eventCounter + 1,
            totalTurnCount: state.totalTurnCount + 1 // [추가] 전체 턴 증가
        })),

    resetEventCounter: () =>
        set(() => ({ eventCounter: 0, threshold: getRandomThreshold() })),

    incrementPityCounter: () =>
        set((state) => ({ pityCounter: state.pityCounter + 1 })),

    resetPityCounter: () =>
        set(() => ({ pityCounter: 0 })),

    setPhase: (phase) => set(() => ({ phase })),

    // [추가] 이벤트 설정 및 종료 액션
    setCurrentEvent: (event) => set(() => ({ currentEvent: event })),

    // [수정] 이벤트 발생 로직을 스토어로 이동 (중복 실행 방지)
    triggerRandomEvent: () => {
        const state = get();
        // Guard: 이미 이벤트 중이거나 탐색 페이즈가 아니면 실행하지 않음
        if (state.phase !== 'exploration') return;

        // 1. 몬스터 조우 확률 (기본 30%, 턴이 지날수록 약간 증가 가능)
        const monsterChance = 0.3;
        let selectedEvent = null;

        if (Math.random() < monsterChance) {
            // 몬스터 풀 필터링 (현재 턴에 맞는 몬스터)
            const availableMonsters = MONSTERS.filter(m =>
                state.totalTurnCount >= m.minTurn && state.totalTurnCount <= m.maxTurn
            );

            if (availableMonsters.length > 0) {
                const monster = availableMonsters[Math.floor(Math.random() * availableMonsters.length)];
                selectedEvent = { ...monster, type: 'combat' }; // type 강제 지정
            }
        }

        // 몬스터가 선택되지 않았으면 일반 이벤트 선택
        if (!selectedEvent) {
            selectedEvent = EVENTS[Math.floor(Math.random() * EVENTS.length)];
        }

        set({
            phase: 'event',
            currentEvent: selectedEvent,
            eventCounter: 0,
            threshold: getRandomThreshold()
        });

        // 로그 추가
        const logType = selectedEvent.type === 'combat' ? 'danger' : 'special';
        get().addLog(`[이벤트] ${selectedEvent.text}`, logType);

        // Pity 처리
        if (selectedEvent.type === 'special') get().resetPityCounter();
        else get().incrementPityCounter();
    },

    // [추가] 엔딩 트리거 액션
    triggerEnding: (type) => {
        const state = get();
        set({
            gameStatus: 'ended',
            endingData: {
                type, // 'death', 'victory', 'retired'
                finalStats: { ...state.stats },
                finalResources: { ...state.resources },
                turnCount: state.eventCounter
            }
        });
    },
    restartGame: () => set(() => ({
        gameStatus: 'playing',
        endingData: null,
        stats: { str: 10, dex: 10, int: 10, luck: 10, intuition: 10, reputation: 0, karma: 0 },
        resources: { gold: 100, fatigue: 0, hp: 100, threat: 0, bond: 0 },
        eventCounter: 0,
        totalTurnCount: 0,
        logs: [{ id: Date.now(), text: "새로운 모험이 시작됩니다.", type: 'system' }],
        phase: 'exploration',
        currentEvent: null
    })),

    resolveCurrentEvent: () => set(() => ({
        currentEvent: null,
        phase: 'exploration'
    })),
}));

export default useGameStore;