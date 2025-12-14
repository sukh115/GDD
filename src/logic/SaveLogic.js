// ====================================
// SaveLogic - 저장/불러오기 로직
// ====================================

const SAVE_KEY = 'awakening_save';
const SAVE_VERSION = '1.0';

/**
 * 게임 저장
 * @param {Object} state - 게임 상태
 * @returns {boolean} 성공 여부
 */
export function saveGame(state) {
    try {
        const saveData = {
            version: SAVE_VERSION,
            timestamp: Date.now(),
            state: {
                stats: state.stats,
                resources: state.resources,
                flags: Array.from(state.flags || []),
                inventory: state.inventory,
                equipped: state.equipped,
                location: state.location,
                phase: state.phase,
                eventCounter: state.eventCounter,
                threshold: state.threshold,
                pityCounter: state.pityCounter,
                totalTurnCount: state.totalTurnCount,
            }
        };

        localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
        return true;
    } catch (error) {
        console.error('저장 실패:', error);
        return false;
    }
}

/**
 * 게임 불러오기
 * @returns {Object|null} 저장된 상태 또는 null
 */
export function loadGame() {
    try {
        const raw = localStorage.getItem(SAVE_KEY);
        if (!raw) return null;

        const saveData = JSON.parse(raw);

        // 버전 체크
        if (saveData.version !== SAVE_VERSION) {
            console.warn('저장 데이터 버전 불일치');
            // 향후 마이그레이션 처리 가능
        }

        // flags를 Set으로 복원
        const state = saveData.state;
        state.flags = new Set(state.flags || []);

        return state;
    } catch (error) {
        console.error('불러오기 실패:', error);
        return null;
    }
}

/**
 * 저장 데이터 삭제
 */
export function deleteSave() {
    try {
        localStorage.removeItem(SAVE_KEY);
        return true;
    } catch (error) {
        console.error('삭제 실패:', error);
        return false;
    }
}

/**
 * 저장 데이터 존재 여부
 * @returns {boolean}
 */
export function hasSave() {
    return localStorage.getItem(SAVE_KEY) !== null;
}

/**
 * 저장 데이터 정보 조회
 * @returns {Object|null} { timestamp, turnCount, location }
 */
export function getSaveInfo() {
    try {
        const raw = localStorage.getItem(SAVE_KEY);
        if (!raw) return null;

        const saveData = JSON.parse(raw);
        return {
            timestamp: saveData.timestamp,
            turnCount: saveData.state.totalTurnCount,
            location: saveData.state.location,
            date: new Date(saveData.timestamp).toLocaleString(),
        };
    } catch {
        return null;
    }
}
