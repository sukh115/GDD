# Project Specification: The Awakening (Text RPG)

## 1. Project Overview
Build a single-page, narrative-driven Roguelite Text RPG.
The game focuses on resource management, deterministic choices (no RNG gambling), and narrative events.

## 2. Tech Stack & Rules
- **Framework:** React + Vite
- **Styling:** Tailwind CSS (v4)
- **State Management:** Zustand
- **Design:** Dark Mode, Minimalist, Text-heavy, Retro-futuristic.

## 3. Directory Structure
```text
src/
├── constants/      # Game Rules, Configs
├── store/          # Zustand Store
├── hooks/          # Game Logic Hooks
├── components/
│   ├── ui/         # Reusable Atomic Components (Button, Card)
│   └── game/       # Game Modules (ActionGrid, LogWindow, Status)
├── data/           # Static Data (Events JSON)
└── utils/          # Helpers

## 4. Implementation Steps
Step 1: Constants & Rules (src/constants/gameRules.js)
Define game constants to avoid magic numbers.

MAX_FATIGUE = 100

EVENT_THRESHOLD_MIN = 15, MAX = 30

ACTIONS: Object defining TRAIN, EARN, REST.

Structure: { id, label, cost: {gold, fatigue}, reward: {str/gold}, type: 'exploration' }

Rule: Actions must be deterministic (Fixed cost/reward).

Step 2: Global State Store (src/store/gameStore.js)
Create a Zustand store.

State:

stats: { str, int, luck, intuition, karma }

resources: { gold, fatigue }

eventSystem: { counter, threshold }

phase: 'exploration' | 'event' | 'awakening'

logs: Array of { id, text, type }

Actions:

updateResource(type, amount): Handle clamping (0 ~ MAX).

updateStat(type, amount)

incrementEventCounter()

addLog(text, type): Keep max 50 logs.

Step 3: Game Data (src/data/events.js)
Export EVENTS array.

Structure: { id, type: 'combat'|'relation'|'special', text, options: [] }

options: { label, cost, reward, actionType }

Create 3 sample events (Merchant, Goblin, Shrine).

Step 4: Logic Hooks
A. src/hooks/useActionHandler.js

Handle button clicks.

Logic: Deduct Cost -> Update Reward -> Add Log -> Increment Counter.

Check if counter >= threshold. If true, set phase to 'event'.

B. src/hooks/useEventTrigger.js

Logic: getAtmosphere() returns a string hint based on threshold - counter.

Hint: "Peaceful" (>5), "Heavy Air" (<=5), "Heart Pounding" (<=2).

Logic: triggerEvent() picks a random event from EVENTS.

Step 5: UI Components
A. src/components/ui/GameButton.jsx

Styled with Tailwind. Props: label, onClick, variant ('default', 'danger').

B. src/components/game/LogWindow.jsx

Scrollable text area showing logs.

Auto-scroll to bottom on new log.

C. src/components/game/ActionGrid.jsx

Render GameButton list based on ACTIONS constant.

D. src/components/game/StatusPanel.jsx

Show HP, Gold, Fatigue.

Fatigue turns RED and pulsates if > 80.

Step 6: Main Entry (src/App.jsx)
Assemble StatusPanel, LogWindow, and ActionGrid.

Display "Atmosphere" hint text prominently.