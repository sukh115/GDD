import React from 'react';
import useGameStore from '../store/gameStore';
import useActionHandler from '../hooks/useActionHandler';

const TestLogic = () => {
    const { resources, stats, eventCounter, phase, setPhase } = useGameStore();
    const { handleAction } = useActionHandler();

    return (
        <div className="p-4 bg-gray-800 text-white">
            <h2 className="text-xl font-bold mb-4">Logic Tester</h2>

            <div className="mb-4">
                <p>Phase: {phase}</p>
                <p>Event Counter: {eventCounter}</p>
                <p>Gold: {resources.gold}</p>
                <p>Fatigue: {resources.fatigue}</p>
                <p>Str: {stats.str}</p>
                <p>Karma: {stats.karma}</p>
            </div>

            <div className="flex gap-2 mb-4">
                <button
                    onClick={() => handleAction('TRAIN')}
                    className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
                >
                    Train
                </button>
                <button
                    onClick={() => handleAction('EARN')}
                    className="px-4 py-2 bg-green-600 rounded hover:bg-green-500"
                >
                    Earn
                </button>
                <button
                    onClick={() => handleAction('REST')}
                    className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
                >
                    Rest
                </button>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={() => setPhase('exploration')}
                    className="px-4 py-2 bg-yellow-600 rounded"
                >
                    Set Exploration
                </button>
                <button
                    onClick={() => setPhase('awakening')}
                    className="px-4 py-2 bg-red-600 rounded"
                >
                    Set Awakening
                </button>
            </div>
        </div>
    );
};

export default TestLogic;
