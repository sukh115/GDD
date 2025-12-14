import React, { useMemo } from 'react';
import useGameStore from './store/gameStore';
import { getLocation } from './data/locations';
import StatusPanel from './components/game/StatusPanel';
import ActionGrid from './components/game/ActionGrid';
import LogWindow from './components/game/LogWindow';
import LocationHeader from './components/game/LocationHeader';
import EndingScreen from './components/game/EndingScreen';
import EventPanel from './components/game/EventPanel';
import CombatPanel from './components/game/CombatPanel';
import ShopWindow from './components/game/ShopWindow';
import Inventory from './components/game/Inventory';
import AwakeningPanel from './components/game/AwakeningPanel';
import SaveLoadMenu from './components/game/SaveLoadMenu';
import './index.css';

function App() {
  const { location, gameStatus, phase, currentEvent, combatState } = useGameStore();
  const currentLocation = useMemo(() => getLocation(location), [location]);

  const locationStyles = useMemo(() => ({
    '--accent-primary': currentLocation.theme.accent,
    '--accent-glow': currentLocation.theme.glass,
    '--glass-bg': currentLocation.theme.glass,
    '--glass-border': currentLocation.theme.glassBorder,
  }), [currentLocation]);

  const getModeText = () => {
    switch (phase) {
      case 'awakening': return '🌑 각성 모드';
      case 'event': return '🎭 이벤트';
      case 'combat': return '⚔️ 전투 중';
      case 'shop': return '🛒 상점';
      case 'finalBattle': return '💀 최후의 결전';
      default: return '✨ 탐색 모드';
    }
  };

  const bgStyle = phase === 'awakening'
    ? 'linear-gradient(135deg, #1a0a0a 0%, #2d0a0a 50%, #1a0a0a 100%)'
    : currentLocation.theme.background;

  return (
    <div className="min-h-screen relative" style={locationStyles}>
      <div
        className="game-background"
        style={{ background: bgStyle }}
      />

      <Particles particle={phase === 'awakening' ? '💀' : currentLocation.theme.particle} />

      {/* 저장/불러오기 메뉴 */}
      <SaveLoadMenu />

      {gameStatus === 'ended' && <EndingScreen />}

      <div className="relative z-10 min-h-screen flex flex-col items-center p-4 md:p-8">
        <div className="w-full max-w-lg">
          <header className="text-center mb-6">
            <h1 className={`game-title text-3xl md:text-4xl mb-2 ${phase === 'awakening' ? 'text-red-500' : ''}`}>
              THE AWAKENING
            </h1>
            <p className={`text-sm ${phase === 'awakening' ? 'text-red-400' : 'text-gray-400'}`}>
              {getModeText()}
            </p>
          </header>

          <LocationHeader location={currentLocation} />
          <StatusPanel />
          <Inventory />
          <LogWindow />

          {phase === 'event' && currentEvent && <EventPanel />}
          {phase === 'combat' && combatState && <CombatPanel />}
          {phase === 'shop' && <ShopWindow />}

          {phase === 'awakening' && <AwakeningPanel />}

          {phase === 'exploration' && (
            <ActionGrid location={currentLocation} />
          )}
        </div>
      </div>
    </div>
  );
}

function Particles({ particle }) {
  const particles = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      id: i,
      style: {
        left: `${10 + i * 20}%`,
        top: `${20 + (i % 3) * 25}%`,
        animationDelay: `${i * 1.5}s`,
      }
    }));
  }, []);

  return (
    <>
      {particles.map(p => (
        <div key={p.id} className="particle" style={p.style}>
          {particle}
        </div>
      ))}
    </>
  );
}

export default App;