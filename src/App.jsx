import React from 'react';
import useGameStore from './store/gameStore';
import StatusPanel from './components/game/StatusPanel';
import ActionGrid from './components/game/ActionGrid';
import LogWindow from './components/game/LogWindow';
import EventPanel from './components/game/EventPanel';
import useEventTrigger from './hooks/useEventTrigger';
import EndingScreen from './components/game/EndingScreen';

function App() {
  const { phase, gameStatus } = useGameStore(); // gameStatus 추가
  const { getAtmosphere } = useEventTrigger();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 font-mono relative overflow-hidden">

      {/* 엔딩 화면 (게임 종료 시 오버레이) */}
      {gameStatus === 'ended' && <EndingScreen />}

      <div className="w-full max-w-md">
        {/* ... 기존 UI 내용 유지 (Header, StatusPanel, Logs, ActionGrid 등) ... */}
        <h1 className="text-3xl font-bold text-center mb-8 tracking-widest text-gray-100 uppercase">
          The Awakening
        </h1>
        <StatusPanel />
        <div className="text-center mb-4 text-gray-400 italic min-h-[1.5rem] transition-all duration-500">
          {getAtmosphere()}
        </div>
        <LogWindow />
        <div className="mb-8 w-full">
          {phase === 'event' ? <EventPanel /> : <ActionGrid />}
        </div>
      </div>
    </div>
  );
}

export default App;