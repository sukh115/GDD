// ====================================
// TravelLogic - 이동 관련 로직
// ====================================

import { getLocation, getAccessibleConnections } from '../data/locations';

/**
 * 이동 선택지 생성 (접근 가능한 지역에서 랜덤 2개)
 * @param {string} currentLocationId - 현재 위치
 * @param {Object} state - 게임 상태
 * @returns {Object} { current, destinations }
 */
export function getChoices(currentLocationId, state) {
    const current = getLocation(currentLocationId);

    // 접근 가능한 연결 지역
    const accessible = getAccessibleConnections(currentLocationId, state);

    // 랜덤으로 섞고 최대 2개 선택
    const shuffled = [...accessible].sort(() => Math.random() - 0.5);
    const destinations = shuffled.slice(0, 2);

    return { current, destinations };
}

/**
 * 이동 실행
 * @param {string|null} destinationId - 목적지 (null = 머무름)
 * @param {Function} set - zustand set
 * @param {Function} get - zustand get
 */
export function moveTo(destinationId, set, get) {
    if (destinationId) {
        set({ location: destinationId });
    }
}

/**
 * 강제 이동 (이벤트용)
 * @param {string} destinationId - 목적지
 * @param {Function} set - zustand set
 * @returns {string} 이동 메시지
 */
export function forcedMove(destinationId, set) {
    const dest = getLocation(destinationId);
    set({ location: destinationId });
    return `강제로 ${dest.name}(으)로 이동되었습니다.`;
}
