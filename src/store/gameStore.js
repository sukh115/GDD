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
    totalTurnCount: 0,
    threshold: getRandomThreshold(),
    pityCounter: 0,
    phase: 'exploration',
    gameStatus: 'playing',
    endingData: null,
    inventory: [],
    currentEvent: null,
    combatState: null,
    location: 'loc_village',
    logs: [{ id: 0, text: "모험이 시작되었습니다...", type: 'system' }],

    setLocation: (locationId) => set(() => ({ location: locationId })),

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

    consumeItem: (index) => {
        const state = get();
        const item = state.inventory[index];
        if (!item || item.type !== 'consumable') return;

        const { effect } = item;
        if (effect.resource) {
            get().updateResource(effect.resource, effect.amount);
            get().addLog(`${item.name}을(를) 사용하여 ${effect.resource} 변동: ${effect.amount}`);
        }
        if (effect.stat) {
            get().updateStat(effect.stat, effect.amount);
            get().addLog(`${item.name}을(를) 사용하여 ${effect.stat} 증가!`);
        }

        set((currentState) => {
            const newInventory = [...currentState.inventory];
            newInventory.splice(index, 1);
            return { inventory: newInventory };
        });
    },

    buyItem: (itemId) => {
        const state = get();
        const item = ITEMS[itemId];

        if (state.resources.gold >= item.price) {
            get().updateResource('gold', -item.price);
            get().addItem(itemId);
            get().addLog(`${item.name}을(를) 구매했습니다.`, 'system');
            return true;
        } else {
            get().addLog("골드가 부족합니다!", 'danger');
            return false;
        }
    },

    updateResource: (type, amount) =>
        set((state) => {
            const currentAmount = state.resources[type] || 0;
            let newAmount = currentAmount + amount;

            if (type === 'hp') newAmount = Math.min(Math.max(0, newAmount), 100);
            if (type === 'fatigue') newAmount = Math.min(Math.max(0, newAmount), 100);
            if (type === 'gold') newAmount = Math.max(0, newAmount);
            if (type === 'threat') newAmount = Math.max(0, newAmount);
            if (type === 'bond') newAmount = Math.max(0, newAmount);

            const newResources = { ...state.resources, [type]: newAmount };

            if (type === 'hp' && newAmount <= 0 && state.gameStatus === 'playing') {
                setTimeout(() => {
                    get().triggerEnding('death');
                }, 500);
            }

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
            totalTurnCount: state.totalTurnCount + 1
        })),

    resetEventCounter: () =>
        set(() => ({ eventCounter: 0, threshold: getRandomThreshold() })),

    incrementPityCounter: () =>
        set((state) => ({ pityCounter: state.pityCounter + 1 })),

    resetPityCounter: () =>
        set(() => ({ pityCounter: 0 })),

    setPhase: (phase) => set(() => ({ phase })),

    setCurrentEvent: (event) => set(() => ({ currentEvent: event })),

    triggerRandomEvent: () => {
        const state = get();
        if (state.phase !== 'exploration') return;

        const monsterChance = 0.3;
        let selectedEvent = null;

        if (Math.random() < monsterChance) {
            const availableMonsters = MONSTERS.filter(m =>
                state.totalTurnCount >= m.minTurn && state.totalTurnCount <= m.maxTurn
            );

            if (availableMonsters.length > 0) {
                const monster = availableMonsters[Math.floor(Math.random() * availableMonsters.length)];
                selectedEvent = { ...monster, type: 'combat' };
            }
        }

        if (!selectedEvent) {
            selectedEvent = EVENTS[Math.floor(Math.random() * EVENTS.length)];
        }

        set({
            phase: 'event',
            currentEvent: selectedEvent,
            eventCounter: 0,
            threshold: getRandomThreshold()
        });

        const logType = selectedEvent.type === 'combat' ? 'danger' : 'special';
        get().addLog(`[이벤트] ${selectedEvent.text}`, logType);

        if (selectedEvent.type === 'special') get().resetPityCounter();
        else get().incrementPityCounter();
    },

    triggerEnding: (type) => {
        const state = get();
        set({
            gameStatus: 'ended',
            endingData: {
                type,
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

    startCombat: (monsterId) => {
        const monsterData = MONSTERS.find(m => m.id === monsterId);
        if (!monsterData) return;

        set({
            phase: 'combat',
            combatState: {
                monster: { ...monsterData, currentHp: monsterData.stats.hp, maxHp: monsterData.stats.hp },
                turn: 1,
                isPlayerTurn: true,
                logs: []
            }
        });
        get().addLog(`[전투] ${monsterData.name}와(과) 전투를 시작합니다!`, 'danger');
    },

    combatAction: (actionType) => {
        const state = get();
        const { combatState, stats } = state;
        if (!combatState || !combatState.isPlayerTurn) return;

        const monster = combatState.monster;
        let damage = 0;
        let logText = "";

        if (actionType === 'attack') {
            damage = Math.max(1, stats.str - monster.stats.def);
            if (Math.random() < stats.luck * 0.01) {
                damage *= 2;
                logText = `치명타! ${monster.name}에게 ${damage}의 피해를 입혔습니다!`;
            } else {
                logText = `${monster.name}에게 ${damage}의 피해를 입혔습니다.`;
            }

            const newMonsterHp = monster.currentHp - damage;

            set(state => ({
                combatState: {
                    ...state.combatState,
                    monster: { ...monster, currentHp: newMonsterHp },
                    isPlayerTurn: false
                }
            }));
            get().addLog(logText, 'normal');

            if (newMonsterHp <= 0) {
                get().endCombat(true);
                return;
            }
        } else if (actionType === 'defend') {
            get().updateResource('fatigue', -5);
            get().addLog("방어 태세를 취하며 숨을 고릅니다. (피로도 -5)", 'normal');
            set(state => ({
                combatState: { ...state.combatState, isPlayerTurn: false }
            }));
        } else if (actionType === 'flee') {
            const fleeChance = 0.5 + (stats.dex * 0.01);
            if (Math.random() < fleeChance) {
                get().addLog("무사히 도망쳤습니다!", 'system');
                set({ phase: 'exploration', combatState: null, currentEvent: null });
                return;
            } else {
                get().addLog("도망치는데 실패했습니다!", 'danger');
                set(state => ({
                    combatState: { ...state.combatState, isPlayerTurn: false }
                }));
            }
        }

        setTimeout(() => {
            get().enemyTurn();
        }, 1000);
    },

    enemyTurn: () => {
        const state = get();
        const { combatState, stats } = state;
        if (!combatState || combatState.monster.currentHp <= 0) return;

        const monster = combatState.monster;
        let damage = Math.max(1, monster.stats.str);

        const dodgeChance = stats.intuition * 0.01;
        if (Math.random() < dodgeChance) {
            get().addLog(`${monster.name}의 공격을 날렵하게 피했습니다!`, 'special');
        } else {
            get().updateResource('hp', -damage);
            get().addLog(`${monster.name}에게 ${damage}의 피해를 입었습니다!`, 'danger');
        }

        set(state => ({
            combatState: {
                ...state.combatState,
                turn: state.combatState.turn + 1,
                isPlayerTurn: true
            }
        }));
    },

    endCombat: (victory) => {
        const state = get();
        const { combatState } = state;

        if (victory) {
            const rewardGold = combatState.monster.stats.hp;
            get().updateResource('gold', rewardGold);
            get().addLog(`승리했습니다! ${rewardGold} 골드를 획득했습니다.`, 'special');
            get().updateStat('reputation', 1);
        }

        set({
            phase: 'exploration',
            combatState: null,
            currentEvent: null
        });
    }
}));

export default useGameStore;