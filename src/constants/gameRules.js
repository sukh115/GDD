// ====================================
// The Awakening - Game Rules & Constants
// ====================================

// === 이벤트 임계치 ===
export const EVENT_THRESHOLD_MIN = 15;
export const EVENT_THRESHOLD_MAX = 30;

// === 기연 Pity Timer ===
export const FORTUNE_BASE_CHANCE = 0.01;  // 1%
export const FORTUNE_PITY_BONUS = 0.005;  // 회당 0.5%
export const FORTUNE_MAX_CHANCE = 0.30;   // 최대 30%

// === 엔딩 조건 ===
export const ENDING_THRESHOLDS = {
    TYCOON_GOLD: 1000,
    USURPER_REPUTATION: 50,
    SAGE_INT: 50,
    WARRIOR_GOD_STR: 50,
    COMMONER_MAX_TURNS: 30,
    AWAKENING_BOND_HIGH: 50,
};

// === 전투 공식 ===
export const COMBAT_FORMULAS = {
    playerDamage: (str, weaponAtk = 0) => str + weaponAtk,
    critChance: (luck) => luck * 0.01,
    dodgeChance: (dex) => dex * 0.005,
    fleeChance: (dex) => 0.5 + (dex * 0.01),
};

// === 자원 제한 ===
export const RESOURCE_LIMITS = {
    hp: { min: 0, max: 999 },
    fatigue: { min: 0, max: 100 },
    gold: { min: 0, max: 99999 },
    bond: { min: 0, max: 100 },
    threat: { min: 0, max: 100 },
};

// === 스탯 제한 ===
export const STAT_LIMITS = {
    str: { min: 1, max: 999 },
    dex: { min: 1, max: 999 },
    int: { min: 1, max: 999 },
    luck: { min: 1, max: 100 },
    intuition: { min: 0, max: 100 },
    karma: { min: -100, max: 100 },
};

// === 위험도 기반 상점 가격대 ===
export const SHOP_PRICE_RANGE = {
    0: { min: 0, max: 150 },
    1: { min: 50, max: 300 },
    2: { min: 100, max: 500 },
    3: { min: 200, max: 800 },
    4: { min: 300, max: 1200 },
    5: { min: 500, max: 2000 },
};
