// ====================================
// The Awakening - Monsters Data
// 지역별 몬스터 데이터
// ====================================

export const MONSTERS = {
    // ========================================
    // 들판 (Field) - 초반 지역
    // ========================================
    wild_dog: {
        id: 'wild_dog',
        name: '들개',
        description: '배고픈 떠돌이 개.',
        hp: 15,
        attack: 4,
        defense: 1,
        locations: ['field'],
        minTurn: 0,
        reward: { gold: 5, exp: 3 },
    },
    slime: {
        id: 'slime',
        name: '슬라임',
        description: '끈적끈적한 젤리 형태의 몬스터.',
        hp: 20,
        attack: 5,
        defense: 2,
        locations: ['field'],
        minTurn: 0,
        reward: { gold: 10, exp: 5 },
    },

    // ========================================
    // 숲 (Forest)
    // ========================================
    goblin: {
        id: 'goblin',
        name: '고블린',
        description: '약삭빠른 소형 마물.',
        hp: 30,
        attack: 8,
        defense: 3,
        locations: ['forest', 'dungeon'],
        minTurn: 5,
        reward: { gold: 20, exp: 10 },
    },
    wolf: {
        id: 'wolf',
        name: '늑대',
        description: '날카로운 이빨을 가진 맹수.',
        hp: 40,
        attack: 12,
        defense: 4,
        locations: ['forest', 'mountain'],
        minTurn: 10,
        reward: { gold: 25, exp: 15 },
    },
    forest_spirit: {
        id: 'forest_spirit',
        name: '숲의 정령',
        description: '분노한 자연의 수호자.',
        hp: 50,
        attack: 14,
        defense: 6,
        locations: ['forest'],
        minTurn: 20,
        reward: { gold: 40, exp: 25 },
    },

    // ========================================
    // 갈림길 (Crossroad)
    // ========================================
    traveler_ghost: {
        id: 'traveler_ghost',
        name: '떠돌이 유령',
        description: '갈림길에서 길을 잃은 영혼.',
        hp: 35,
        attack: 10,
        defense: 2,
        locations: ['crossroad'],
        minTurn: 10,
        reward: { gold: 30, exp: 12 },
    },

    // ========================================
    // 산 (Mountain)
    // ========================================
    mountain_goat: {
        id: 'mountain_goat',
        name: '산양',
        description: '단단한 뿔을 가진 공격적인 산양.',
        hp: 35,
        attack: 11,
        defense: 5,
        locations: ['mountain'],
        minTurn: 10,
        reward: { gold: 20, exp: 12 },
    },
    bandit: {
        id: 'bandit',
        name: '산적',
        description: '산에 숨어 여행자를 노리는 도적.',
        hp: 25,
        attack: 7,
        defense: 3,
        locations: ['mountain', 'crossroad'],
        minTurn: 5,
        reward: { gold: 20, exp: 8 },
    },
    rock_golem: {
        id: 'rock_golem',
        name: '바위 골렘',
        description: '살아 움직이는 거대한 바위.',
        hp: 80,
        attack: 18,
        defense: 15,
        locations: ['mountain', 'dungeon'],
        minTurn: 25,
        reward: { gold: 60, exp: 35 },
    },
    wyvern: {
        id: 'wyvern',
        name: '와이번',
        description: '산꼭대기에 서식하는 비룡.',
        hp: 100,
        attack: 25,
        defense: 12,
        locations: ['mountain'],
        minTurn: 40,
        reward: { gold: 100, exp: 50 },
    },

    // ========================================
    // 던전 (Dungeon)
    // ========================================
    skeleton: {
        id: 'skeleton',
        name: '스켈레톤',
        description: '움직이는 뼈다귀.',
        hp: 35,
        attack: 10,
        defense: 6,
        locations: ['dungeon'],
        minTurn: 10,
        reward: { gold: 30, exp: 15 },
    },
    orc: {
        id: 'orc',
        name: '오크',
        description: '거대하고 포악한 마물.',
        hp: 60,
        attack: 18,
        defense: 8,
        locations: ['dungeon', 'forest'],
        minTurn: 20,
        reward: { gold: 50, exp: 25 },
    },
    mimic: {
        id: 'mimic',
        name: '미믹',
        description: '보물상자로 위장한 괴물.',
        hp: 45,
        attack: 20,
        defense: 10,
        locations: ['dungeon'],
        minTurn: 15,
        reward: { gold: 80, exp: 30 },
    },
    lich: {
        id: 'lich',
        name: '리치',
        description: '사악한 마법사의 언데드.',
        hp: 90,
        attack: 28,
        defense: 10,
        locations: ['dungeon'],
        minTurn: 35,
        reward: { gold: 120, exp: 60 },
    },

    // ========================================
    // 마탑 (Tower)
    // ========================================
    magic_golem: {
        id: 'magic_golem',
        name: '마법 골렘',
        description: '마력으로 움직이는 인형.',
        hp: 55,
        attack: 15,
        defense: 10,
        locations: ['tower'],
        minTurn: 15,
        reward: { gold: 45, exp: 25 },
    },
    rogue_mage: {
        id: 'rogue_mage',
        name: '방랑 마법사',
        description: '정신이 온전치 못한 마법사.',
        hp: 40,
        attack: 22,
        defense: 5,
        locations: ['tower'],
        minTurn: 20,
        reward: { gold: 60, exp: 35 },
    },
    arcane_elemental: {
        id: 'arcane_elemental',
        name: '마력 정령',
        description: '순수한 마력이 형태를 갖춘 존재.',
        hp: 70,
        attack: 25,
        defense: 8,
        locations: ['tower'],
        minTurn: 30,
        reward: { gold: 80, exp: 45 },
    },

    // ========================================
    // 마왕성 (Demon Castle)
    // ========================================
    demon_guard: {
        id: 'demon_guard',
        name: '마족 경비병',
        description: '마왕성을 지키는 경비병.',
        hp: 80,
        attack: 22,
        defense: 12,
        locations: ['demon_castle'],
        minTurn: 30,
        reward: { gold: 80, exp: 40 },
    },
    dark_knight: {
        id: 'dark_knight',
        name: '암흑 기사',
        description: '어둠에 물든 타락한 기사.',
        hp: 100,
        attack: 25,
        defense: 15,
        locations: ['dungeon', 'demon_castle'],
        minTurn: 40,
        reward: { gold: 100, exp: 50 },
    },
    succubus: {
        id: 'succubus',
        name: '서큐버스',
        description: '유혹의 마족.',
        hp: 65,
        attack: 20,
        defense: 8,
        locations: ['demon_castle'],
        minTurn: 35,
        reward: { gold: 90, exp: 45 },
    },
    demon_commander: {
        id: 'demon_commander',
        name: '마족 지휘관',
        description: '마왕 직속 부하.',
        hp: 150,
        attack: 35,
        defense: 20,
        locations: ['demon_castle'],
        minTurn: 50,
        reward: { gold: 200, exp: 80 },
    },

    // ========================================
    // 지역 보스 (희귀 출현)
    // ========================================
    wild_dog_pack: {
        id: 'wild_dog_pack',
        name: '들개 무리',
        description: '굶주린 들개들의 무리. 수가 많아 위험하다.',
        hp: 50,
        attack: 12,
        defense: 4,
        locations: ['field'],
        minTurn: 10,
        isBoss: true,
        reward: { gold: 60, exp: 30 },
    },
    bandit_king: {
        id: 'bandit_king',
        name: '산적왕',
        description: '산에 근거지를 둔 산적 두목.',
        hp: 80,
        attack: 16,
        defense: 8,
        locations: ['mountain', 'crossroad'],
        minTurn: 20,
        isBoss: true,
        reward: { gold: 100, exp: 40 },
    },
    ancient_treant: {
        id: 'ancient_treant',
        name: '고대 나무정령',
        description: '숲의 수호자. 분노하면 무섭다.',
        hp: 120,
        attack: 20,
        defense: 15,
        locations: ['forest'],
        minTurn: 30,
        isBoss: true,
        reward: { gold: 150, exp: 60 },
    },
    mountain_troll: {
        id: 'mountain_troll',
        name: '산악 트롤',
        description: '거대한 체구의 산의 지배자.',
        hp: 150,
        attack: 28,
        defense: 18,
        locations: ['mountain'],
        minTurn: 35,
        isBoss: true,
        reward: { gold: 180, exp: 70 },
    },
    dungeon_king: {
        id: 'dungeon_king',
        name: '던전 왕',
        description: '던전 최심부에 군림하는 언데드.',
        hp: 180,
        attack: 32,
        defense: 20,
        locations: ['dungeon'],
        minTurn: 45,
        isBoss: true,
        reward: { gold: 250, exp: 90 },
    },
    archmage: {
        id: 'archmage',
        name: '대마법사',
        description: '탑의 주인. 미쳐버린 천재.',
        hp: 100,
        attack: 40,
        defense: 10,
        locations: ['tower'],
        minTurn: 40,
        isBoss: true,
        reward: { gold: 200, exp: 80 },
        skills: ['화염 폭풍', '시간 정지', '차원 분열'],
    },
    hermit_master: {
        id: 'hermit_master',
        name: '은자',
        description: '세상을 등진 현자. 시험에 통과해야 한다.',
        hp: 200,
        attack: 30,
        defense: 25,
        locations: ['hermit_cave'],
        minTurn: 0,
        isBoss: true,
        isSpecial: true, // 전투가 아닌 시험
        reward: { gold: 0, exp: 0 },
    },

    // ========================================
    // 특수 몬스터 (기연 / 희귀)
    // ========================================
    golden_slime: {
        id: 'golden_slime',
        name: '황금 슬라임',
        description: '매우 희귀한 황금빛 슬라임.',
        hp: 10,
        attack: 1,
        defense: 0,
        locations: ['forest', 'dungeon'],
        minTurn: 0,
        isRare: true,
        reward: { gold: 300, exp: 5 },
    },
    nightmare: {
        id: 'nightmare',
        name: '나이트메어',
        description: '악몽에서 튀어나온 존재.',
        hp: 60,
        attack: 25,
        defense: 5,
        locations: ['crossroad', 'dungeon', 'demon_castle'],
        minTurn: 25,
        isRare: true,
        reward: { gold: 120, exp: 50 },
    },
    fallen_angel: {
        id: 'fallen_angel',
        name: '타락천사',
        description: '신에게 버림받은 천사.',
        hp: 180,
        attack: 38,
        defense: 22,
        locations: ['tower', 'demon_castle'],
        minTurn: 55,
        isRare: true,
        isBoss: true,
        reward: { gold: 280, exp: 100 },
    },

    // ========================================
    // 메인 보스
    // ========================================
    dragon: {
        id: 'dragon',
        name: '용',
        description: '고대의 파괴자.',
        hp: 200,
        attack: 35,
        defense: 20,
        locations: ['dungeon', 'mountain'],
        minTurn: 50,
        isBoss: true,
        reward: { gold: 300, exp: 100 },
    },
    demon_lord: {
        id: 'demon_lord',
        name: '마왕',
        description: '어둠의 지배자.',
        hp: 500,
        attack: 50,
        defense: 30,
        locations: ['demon_castle'],
        minTurn: 100,
        isBoss: true,
        isMainBoss: true,
        reward: { gold: 0, exp: 0 },
        skills: ['암흑 파동', '저주', '소환'],
    },

    // ========================================
    // 용사 (각성 모드용)
    // ========================================
    hero: {
        id: 'hero',
        name: '용사',
        description: '세계를 구원하기 위해 나선 영웅.',
        hp: 400,
        attack: 45,
        defense: 25,
        locations: ['demon_castle'],
        minTurn: 0,
        isBoss: true,
        isAwakeningEnemy: true,
        reward: { gold: 0, exp: 0 },
        skills: ['성스러운 일격', '빛의 보호막', '희망의 외침'],
    },
};

// === 헬퍼 함수 ===
export const getMonster = (id) => MONSTERS[id] || null;

export const getMonstersForLocation = (locationId, turnCount = 0) => {
    return Object.values(MONSTERS).filter(monster =>
        monster.locations.includes(locationId) &&
        turnCount >= monster.minTurn &&
        !monster.isAwakeningEnemy
    );
};

export const getRandomMonster = (locationId, turnCount = 0) => {
    const available = getMonstersForLocation(locationId, turnCount);
    if (available.length === 0) return null;
    return available[Math.floor(Math.random() * available.length)];
};

export const getFinalBattleEnemies = () => {
    return [MONSTERS.hero, MONSTERS.demon_lord];
};

// Alias for combatEvents.js
export const getMonstersByLocation = getMonstersForLocation;
