import React from 'react';
import useGameStore from '../../store/gameStore';
import useActionHandler from '../../hooks/useActionHandler';
import { ACTIONS } from '../../constants/gameRules';
import GameButton from '../ui/GameButton';

import { LOCATIONS } from '../../data/locations';

const ActionGrid = () => {
    const { phase, location, setLocation, addLog } = useGameStore();
    const { handleAction } = useActionHandler();

    // 현재 지역 정보 가져오기
    const currentLocation = LOCATIONS[location];

    // 현재 지역에서 가능한 액션 목록 가져오기
    const availableActions = currentLocation ? currentLocation.actions : [];
    const availableConnections = currentLocation ? currentLocation.connections : [];

    return (
        <div className="flex flex-col gap-4">
            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-800 rounded-lg shadow-lg">
                {availableActions.map((actionKey) => {
                    const actionConfig = ACTIONS[actionKey][phase];

                    if (!actionConfig) return null;

                    // 버튼 스타일 결정
                    let variant = 'default';
                    if (phase === 'awakening') {
                        if (actionKey === 'TRAIN') variant = 'danger'; // 학살
                        if (actionKey === 'EARN') variant = 'special'; // 약탈
                        if (actionKey === 'SPECIAL') variant = 'danger'; // 착취
                    } else {
                        if (actionKey === 'SPECIAL') variant = 'secondary'; // 명상
                    }

                    return (
                        <GameButton
                            key={actionKey}
                            label={actionConfig.label}
                            onClick={() => handleAction(actionKey)}
                            variant={variant}
                        />
                    );
                })}
            </div>

            {/* Travel Buttons */}
            {phase === 'exploration' && availableConnections.length > 0 && (
                <div className="p-4 bg-gray-800 rounded-lg shadow-lg">
                    <h3 className="text-gray-400 mb-2 text-sm">이동하기</h3>
                    <div className="grid grid-cols-2 gap-2">
                        {availableConnections.map((locId) => {
                            const targetLoc = LOCATIONS[locId];
                            return (
                                <button
                                    key={locId}
                                    onClick={() => {
                                        setLocation(locId);
                                        addLog(`${targetLoc.name}(으)로 이동했습니다.`);
                                    }}
                                    className="p-2 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors"
                                >
                                    {targetLoc.name}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ActionGrid;
