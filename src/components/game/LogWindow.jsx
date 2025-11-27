import React, { useEffect, useRef } from 'react';
import useGameStore from '../../store/gameStore';

const LogWindow = () => {
    const { logs } = useGameStore();
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    const getTypeStyles = (type) => {
        switch (type) {
            case 'danger': return 'text-red-400 font-bold';
            case 'special': return 'text-yellow-400 font-bold';
            case 'system': return 'text-blue-400 italic';
            default: return 'text-gray-300';
        }
    };

    return (
        <div className="w-full max-w-md h-48 bg-black/50 rounded-lg p-4 overflow-y-auto mb-4 font-mono text-sm border border-gray-700 shadow-inner">
            {logs.map((log) => (
                <div key={log.id} className={`mb-1 ${getTypeStyles(log.type)}`}>
                    <span className="opacity-50 mr-2">[{new Date(log.id).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
                    {log.text}
                </div>
            ))}
            <div ref={bottomRef} />
        </div>
    );
};

export default LogWindow;
