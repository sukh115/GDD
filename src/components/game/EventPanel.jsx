import React from 'react';
import useGameStore from '../../store/gameStore';
import useEventTrigger from '../../hooks/useEventTrigger';
import GameButton from '../ui/GameButton';

const EventPanel = () => {
    const { currentEvent } = useGameStore();
    const { handleEventOption } = useEventTrigger();

    if (!currentEvent) return null;

    return (
        <div className="p-6 bg-gray-800 rounded-lg border-2 border-yellow-600 shadow-xl w-full animate-fade-in">
            <h2 className="text-xl font-bold text-yellow-500 mb-4 uppercase tracking-wider">
                ⚠️ Event Encounter
            </h2>
            <p className="text-lg text-gray-200 mb-6 min-h-[3rem]">
                {currentEvent.text}
            </p>

            <div className="flex flex-col gap-3">
                {currentEvent.options.map((option, index) => (
                    <GameButton
                        key={index}
                        label={option.label}
                        variant="special"
                        onClick={() => handleEventOption(option)}
                    />
                ))}
            </div>
        </div>
    );
};

export default EventPanel;