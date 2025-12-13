import React, { useRef, useEffect } from 'react';
import useGameStore from '../../store/gameStore';

function LogWindow() {
    const { logs } = useGameStore();
    const logEndRef = useRef(null);

    // 자동 스크롤
    useEffect(() => {
        logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    return (
        <div className="glass-card p-3 mb-4">
            <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-gray-500">📜 모험 기록</span>
            </div>
            <div className="log-window">
                {logs.map(log => (
                    <div
                        key={log.id}
                        className={`log-entry ${log.type}`}
                    >
                        {log.text}
                    </div>
                ))}
                <div ref={logEndRef} />
            </div>
        </div>
    );
}

export default LogWindow;
