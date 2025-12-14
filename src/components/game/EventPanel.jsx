import React from 'react';
import useGameStore from '../../store/gameStore';

function EventPanel() {
    const { currentEvent, onEventOption, onTravel } = useGameStore();

    if (!currentEvent) return null;

    // 이동 선택 UI
    if (currentEvent.type === 'travel' && currentEvent.travelChoices) {
        const { current, destinations } = currentEvent.travelChoices;

        return (
            <div className="glass-card p-4 mb-4 border-2 border-blue-500/50">
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-500/30 text-blue-300">
                        🚶 이동 선택
                    </span>
                </div>

                <p className="text-lg mb-4">{currentEvent.text}</p>

                <div className="space-y-2">
                    <button onClick={() => onTravel(null)} className="w-full action-btn text-left">
                        <div className="font-medium">{current.theme.particle} {current.name}에 머무른다</div>
                        <div className="text-xs text-gray-400">현재 위치</div>
                    </button>

                    {destinations.map(dest => (
                        <button key={dest.id} onClick={() => onTravel(dest.id)} className="w-full action-btn text-left">
                            <div className="font-medium">{dest.theme.particle} {dest.name}(으)로 이동</div>
                            <div className="text-xs text-gray-400">{dest.description}</div>
                            {dest.dangerLevel > 2 && <div className="text-xs text-red-400 mt-1">⚠️ 위험</div>}
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    // 최종 선택 UI (각성 모드 엔딩)
    if (currentEvent.type === 'finalChoice') {
        return (
            <div className="glass-card p-6 mb-4 border-2 border-purple-500 bg-gradient-to-b from-black/80 to-purple-900/30">
                <div className="text-center mb-6">
                    <span className="text-4xl">⚡</span>
                    <h2 className="text-xl font-bold text-purple-300 mt-2">최후의 선택</h2>
                </div>

                <p className="text-lg mb-6 text-center leading-relaxed text-gray-200">
                    {currentEvent.text}
                </p>

                <div className="space-y-3">
                    {currentEvent.options?.map((option, idx) => (
                        <button
                            key={idx}
                            onClick={() => onEventOption(option)}
                            className={`w-full p-4 rounded-lg text-left transition-all border ${option.id === 'destroy'
                                    ? 'bg-red-900/50 border-red-600 hover:bg-red-800/50'
                                    : 'bg-blue-900/50 border-blue-600 hover:bg-blue-800/50'
                                }`}
                        >
                            <div className="font-bold text-lg mb-1">{option.label}</div>
                            <div className="text-sm text-gray-300">{option.description}</div>
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    // 이벤트 타입별 스타일
    const styles = {
        combat: { icon: '⚔️', name: '전투', bg: 'bg-red-500/30', text: 'text-red-300' },
        special: { icon: '✨', name: '특수', bg: 'bg-blue-500/30', text: 'text-blue-300' },
        fortune: { icon: '🌟', name: '기연', bg: 'bg-yellow-500/40', text: 'text-yellow-200' },
        misfortune: { icon: '💀', name: '악연', bg: 'bg-red-500/30', text: 'text-red-300' },
        relation: { icon: '💬', name: '인연', bg: 'bg-purple-500/30', text: 'text-purple-300' },
    };
    const style = styles[currentEvent.type] || styles.relation;

    // 기연/악연 특수 테두리
    const borderClass = currentEvent.type === 'fortune' ? 'border-yellow-400'
        : currentEvent.type === 'misfortune' ? 'border-red-500/50'
            : '';

    return (
        <div className={`glass-card p-4 mb-4 border-2 ${borderClass}`}
            style={{ borderColor: !borderClass ? 'var(--accent-primary)' : undefined }}>

            <div className="flex items-center gap-2 mb-3">
                <span className={`text-xs px-2 py-1 rounded-full ${style.bg} ${style.text}`}>
                    {style.icon} {style.name}
                </span>
            </div>

            <p className="text-lg mb-4 leading-relaxed">{currentEvent.text}</p>

            <div className="space-y-2">
                {currentEvent.options?.map((option, idx) => (
                    <button key={idx} onClick={() => onEventOption(option)} className="w-full action-btn text-left">
                        <div className="font-medium">{option.label}</div>
                        {option.cost && (
                            <div className="text-xs text-red-400 mt-1">
                                {Object.entries(option.cost).map(([r, a]) => (
                                    <span key={r} className="mr-2">{r === 'gold' ? `💰-${a}` : `${r}-${a}`}</span>
                                ))}
                            </div>
                        )}
                        {option.reward && (
                            <div className="text-xs text-green-400 mt-1">
                                {Object.entries(option.reward).filter(([, a]) => a !== 0).map(([s, a]) => (
                                    <span key={s} className="mr-2">{s}{a > 0 ? '+' : ''}{a}</span>
                                ))}
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default EventPanel;