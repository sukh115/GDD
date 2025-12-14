import React, { useState, useEffect } from 'react';
import useGameStore from '../../store/gameStore';
import { saveGame, loadGame, hasSave, getSaveInfo, deleteSave } from '../../logic/SaveLogic';

/**
 * 저장/불러오기 메뉴
 * - 저장 버튼
 * - 불러오기 버튼
 * - 저장 정보 표시
 */
function SaveLoadMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [saveInfo, setSaveInfo] = useState(null);
    const [message, setMessage] = useState('');

    const { setState, _addLog } = useGameStore();

    useEffect(() => {
        if (isOpen) {
            setSaveInfo(getSaveInfo());
        }
    }, [isOpen]);

    const handleSave = () => {
        const state = useGameStore.getState();
        const success = saveGame(state);

        if (success) {
            setMessage('✅ 저장 완료!');
            setSaveInfo(getSaveInfo());
            _addLog('💾 게임이 저장되었습니다.', 'system');
        } else {
            setMessage('❌ 저장 실패!');
        }

        setTimeout(() => setMessage(''), 2000);
    };

    const handleLoad = () => {
        const loadedState = loadGame();

        if (loadedState) {
            setState({
                ...loadedState,
                gameStatus: 'playing',
                currentEvent: null,
                combatState: null,
                logs: [{ id: Date.now(), text: '💾 저장된 게임을 불러왔습니다.', type: 'system' }],
            });
            setMessage('✅ 불러오기 완료!');
            setIsOpen(false);
        } else {
            setMessage('❌ 저장된 데이터가 없습니다.');
        }

        setTimeout(() => setMessage(''), 2000);
    };

    const handleDelete = () => {
        if (window.confirm('저장된 데이터를 삭제하시겠습니까?')) {
            deleteSave();
            setSaveInfo(null);
            setMessage('🗑️ 삭제 완료');
            setTimeout(() => setMessage(''), 2000);
        }
    };

    return (
        <div className="fixed top-4 right-4 z-50">
            {/* 토글 버튼 */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 border border-white/20 flex items-center justify-center text-lg"
                title="저장/불러오기"
            >
                💾
            </button>

            {/* 메뉴 패널 */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-64 glass-card p-4 border border-white/20">
                    <h3 className="text-sm font-bold mb-3 text-gray-300">💾 저장/불러오기</h3>

                    {/* 저장 정보 */}
                    {saveInfo && (
                        <div className="mb-3 p-2 bg-black/30 rounded text-xs">
                            <p className="text-gray-400">마지막 저장:</p>
                            <p className="text-white">{saveInfo.date}</p>
                            <p className="text-gray-400 mt-1">턴: {saveInfo.turnCount}</p>
                        </div>
                    )}

                    {/* 메시지 */}
                    {message && (
                        <div className="mb-3 p-2 bg-blue-500/20 rounded text-xs text-center">
                            {message}
                        </div>
                    )}

                    {/* 버튼들 */}
                    <div className="space-y-2">
                        <button
                            onClick={handleSave}
                            className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded text-sm font-bold"
                        >
                            💾 저장하기
                        </button>

                        <button
                            onClick={handleLoad}
                            disabled={!hasSave()}
                            className={`w-full py-2 rounded text-sm font-bold ${hasSave()
                                    ? 'bg-green-600 hover:bg-green-500'
                                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                }`}
                        >
                            📂 불러오기
                        </button>

                        {saveInfo && (
                            <button
                                onClick={handleDelete}
                                className="w-full py-2 bg-red-900/50 hover:bg-red-800/50 rounded text-sm text-red-300"
                            >
                                🗑️ 저장 삭제
                            </button>
                        )}
                    </div>

                    {/* 닫기 */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="w-full mt-3 py-1 text-xs text-gray-500 hover:text-gray-300"
                    >
                        닫기
                    </button>
                </div>
            )}
        </div>
    );
}

export default SaveLoadMenu;
