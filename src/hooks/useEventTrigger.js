import { useEffect } from 'react';
import useGameStore from '../store/gameStore';
import { EVENTS } from '../data/events';

const useEventTrigger = () => {
    const {
        eventCounter, threshold, phase, stats, resources,
        addLog, updateResource, updateStat, resolveCurrentEvent,
        triggerRandomEvent
    } = useGameStore();

    // 1. 분위기 텍스트 계산
    const getAtmosphere = () => {
        if (phase === 'awakening') {
            if (resources.threat > 80) return "세상이 당신의 존재를 두려워합니다. 결전이 임박했습니다.";
            if (resources.bond > 80) return "인간과 마족이 당신에게 맞서기 위해 손을 잡았습니다.";
            return "공기가 찢어질 듯 팽팽합니다. 폭풍전야.";
        }

        const diff = threshold - eventCounter;
        if (diff <= 2) return "심장이 거칠게 뜁니다... 무언가 바로 앞에 있습니다!";
        if (diff <= 5) return "등골이 서늘합니다. 공기가 무거워졌습니다.";
        if (diff <= 10 && stats.intuition > 10) return "어디선가 시선이 느껴집니다...";
        return "평화로운 날입니다. 바람이 산들거립니다.";
    };

    // 2. 이벤트 발생 로직 (Store로 이동됨)

    // 3. 선택지 처리 로직
    const handleEventOption = (option) => {
        // A. 비용/조건 검사
        if (option.cost?.gold > resources.gold) {
            addLog("골드가 부족합니다!", "danger");
            return;
        }
        if (option.reqStats) {
            for (const [key, val] of Object.entries(option.reqStats)) {
                if ((stats[key] || 0) < val) {
                    addLog(`${key} 스탯이 부족합니다! (${val} 필요)`, "danger");
                    return;
                }
            }
        }

        // 특수 액션 처리 (상점 열기 등)
        if (option.action === 'OPEN_SHOP') {
            useGameStore.getState().setPhase('shop'); // phase 변경
            addLog("상점 진열대를 살펴봅니다.");
            return;
        }

        if (option.action === 'START_COMBAT') {
            useGameStore.getState().startCombat(useGameStore.getState().currentEvent.id);
            addLog(option.log || "전투를 시작합니다!", 'danger');
            return;
        }

        // B. 비용 적용
        if (option.cost?.gold) updateResource('gold', -option.cost.gold);
        if (option.cost?.fatigue) updateResource('fatigue', option.cost.fatigue);

        // C. 보상 적용
        if (option.reward) {
            Object.entries(option.reward).forEach(([key, val]) => {
                if (key === 'gold' || key === 'fatigue' || key === 'hp') {
                    updateResource(key, val);
                } else {
                    updateStat(key, val);
                }
            });
        }

        // D. 로그 및 종료
        addLog(option.log || "선택을 완료했습니다.");
        resolveCurrentEvent(); // 탐색 페이즈로 복귀
    };

    // 4. 자동 트리거 (탐색 페이즈일 때만)
    useEffect(() => {
        if (phase === 'exploration' && eventCounter >= threshold) {
            triggerRandomEvent();
        }
    }, [eventCounter, threshold, phase, triggerRandomEvent]);

    return { getAtmosphere, handleEventOption };
};

export default useEventTrigger;