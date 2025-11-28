import React from 'react';
import useGameStore from './store/gameStore';
import StatusPanel from './components/game/StatusPanel';
import ActionGrid from './components/game/ActionGrid';
import LogWindow from './components/game/LogWindow';
import EventPanel from './components/game/EventPanel';
import useEventTrigger from './hooks/useEventTrigger';
import EndingScreen from './components/game/EndingScreen';
import Inventory from './components/game/Inventory';
import ShopWindow from './components/game/ShopWindow';
import CombatPanel from './components/game/CombatPanel';
import { LOCATIONS } from './data/locations';

function App() {
  const { phase, gameStatus, location } = useGameStore();
  const { getAtmosphere } = useEventTrigger();
  const { setPhase } = useGameStore();

  const currentLocation = LOCATIONS[location];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 font-mono relative overflow-hidden">

      {/* 엔딩 화면 (게임 종료 시 오버레이) */}
      {gameStatus === 'ended' && <EndingScreen />}

      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2 tracking-widest text-gray-100 uppercase">
          The Awakening
        </h1>

        {/* Location Info */}
        {currentLocation && (
          <div className="text-center mb-6">
            <h2 className="text-xl text-yellow-500 font-bold">📍 {currentLocation.name}</h2>
            <p className="text-xs text-gray-500">{currentLocation.description}</p>
          </div>
        )}

        <StatusPanel />

        <div className='mb-4'>
          <Inventory />
        </div>

        <div className="text-center mb-4 text-gray-400 italic min-h-[1.5rem] transition-all duration-500">
          {getAtmosphere()}
        </div>
        <LogWindow />

        <div className="mb-8 w-full">
          {phase === 'event' && <EventPanel />}
          {phase === 'shop' && <ShopWindow />}
          {phase === 'combat' && <CombatPanel />}
          {(phase === 'exploration' || phase === 'awakening') && <ActionGrid />}
        </div>
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
      {/* <div className="bat" style={{ top: '10%', left: '10%' }}>🦇</div> */}
      {/* <div className="bat" style={{ top: '15%', right: '15%', animationDelay: '1.5s' }}>🦇</div> */}
    </div>
  );
}

export default App;