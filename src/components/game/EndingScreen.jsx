import React from 'react';
import useGameStore from '../../store/gameStore';
import { checkEnding, generateEndingText, AWAKENING_ENDINGS } from '../../data/endings';

function EndingScreen() {
    const { endingData, restartGame, stats, resources, flags, totalTurnCount } = useGameStore();

    if (!endingData) return null;

    // 게임 상태 객체 구성
    const gameState = {
        stats: endingData.stats || stats,
        resources: endingData.resources || resources,
        flags: new Set(endingData.flags || Array.from(flags)),
        turnCount: endingData.turnCount || totalTurnCount,
        phase: endingData.id?.includes('awakening') ? 'awakening' : 'exploration',
    };

    // 엔딩 결정
    const ending = endingData.id === 'death'
        ? { id: 'death', name: '사망', title: '이름 없는 무덤', priority: 0 }
        : checkEnding(gameState);

    // 조합형 텍스트 생성
    const endingText = generateEndingText(gameState, ending);

    // True Ending 체크
    const isTrueEnding = ending.id === 'true_harmony';

    return (
        <div className="ending-overlay">
            <div className="ending-content">
                {/* 엔딩 타이틀 */}
                <div className="mb-6">
                    {ending.subtitle && (
                        <span className="text-sm text-gray-500 block mb-2">
                            {ending.subtitle}
                        </span>
                    )}
                    <h1 className={`ending-title ${isTrueEnding ? 'true-ending' : ''}`}>
                        {ending.name}
                    </h1>
                    <p className="ending-subtitle">
                        {ending.title}
                    </p>
                </div>

                {/* 조합형 설명 */}
                <div className="ending-description">
                    <p className="mb-4">
                        <span className="text-gray-400">{endingText.prefix}</span>
                        <span className="text-white font-bold"> {endingText.main}</span>
                    </p>
                    <p className="text-sm text-gray-400 italic">
                        {endingText.description}
                    </p>
                </div>

                {/* 최종 스탯 */}
                <div className="glass-card p-4 mb-6 text-left">
                    <h3 className="text-sm font-bold mb-3 text-center text-gray-400">📊 최종 기록</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>⚔️ 힘: {gameState.stats.str}</div>
                        <div>🏃 민첩: {gameState.stats.dex}</div>
                        <div>📚 지능: {gameState.stats.int}</div>
                        <div>🍀 행운: {gameState.stats.luck}</div>
                        <div>💰 골드: {gameState.resources.gold}</div>
                        <div>🎯 턴: {gameState.turnCount}</div>
                        <div className="col-span-2">
                            {gameState.stats.karma >= 0 ? '☀️' : '🌙'} 카르마: {gameState.stats.karma}
                        </div>
                    </div>
                </div>

                {/* 재시작 버튼 */}
                <button
                    onClick={restartGame}
                    className="action-btn px-8 py-3 text-lg font-bold"
                    style={{
                        background: 'linear-gradient(135deg, rgba(155, 89, 182, 0.3) 0%, rgba(52, 152, 219, 0.3) 100%)',
                    }}
                >
                    🔄 다시 시작
                </button>

                {/* True Ending 특별 메시지 */}
                {isTrueEnding && (
                    <p className="mt-6 text-sm text-yellow-400 animate-pulse">
                        ✨ 축하합니다! True Ending을 달성했습니다!
                    </p>
                )}
            </div>
        </div>
    );
}

export default EndingScreen;