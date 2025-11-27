import React from 'react';
import useGameStore from '../../store/gameStore';
import useActionHandler from '../../hooks/useActionHandler';
import { ACTIONS } from '../../constants/gameRules';
import GameButton from '../ui/GameButton';

const ActionGrid = () => {
    const { phase } = useGameStore();
    const { handleAction } = useActionHandler();

    return (
        <div className="grid grid-cols-2 gap-4 p-4 bg-gray-800 rounded-lg shadow-lg">
            {Object.keys(ACTIONS).map((actionKey) => {
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
    );
};

export default ActionGrid;
