// ====================================
// The Awakening - Endings Data
// 조합형 엔딩 시스템
// ====================================

import { ENDING_THRESHOLDS } from '../constants/gameRules';

// === 메인 시나리오 엔딩 ===
export const MAIN_ENDINGS = {
    slayer: {
        id: 'slayer',
        name: '용사',
        title: '마왕을 토벌한 영웅',
        condition: (state) => state.flags.has('DEMON_LORD_DEFEATED'),
        priority: 100,
    },
    tycoon: {
        id: 'tycoon',
        name: '거상',
        title: '대륙을 지배하는 상인왕',
        condition: (state) => state.resources.gold >= ENDING_THRESHOLDS.TYCOON_GOLD,
        priority: 80,
    },
    usurper: {
        id: 'usurper',
        name: '찬탈자',
        title: '왕좌를 빼앗은 자',
        condition: (state) => state.flags.has('USURPED_THRONE'),
        priority: 90,
    },
    sage: {
        id: 'sage',
        name: '대현자',
        title: '지혜의 끝에 도달한 자',
        condition: (state) => state.stats.int >= ENDING_THRESHOLDS.SAGE_INT,
        priority: 70,
    },
    warrior_god: {
        id: 'warrior_god',
        name: '무신',
        title: '오직 힘만을 추구한 자',
        condition: (state) => state.stats.str >= ENDING_THRESHOLDS.WARRIOR_GOD_STR,
        priority: 60,
    },
    commoner: {
        id: 'commoner',
        name: '소시민',
        title: '평범한 삶을 선택한 자',
        condition: (state) => state.turnCount <= ENDING_THRESHOLDS.COMMONER_MAX_TURNS && state.flags.has('RETIRED'),
        priority: 10,
    },
    death: {
        id: 'death',
        name: '사망',
        title: '이름 없는 무덤',
        condition: (state) => state.resources.hp <= 0,
        priority: 0,
    },
};

// === 히든 엔딩 ===
export const HIDDEN_ENDINGS = {
    negotiator: {
        id: 'negotiator',
        name: '평화 협정',
        title: '칼 대신 혀로 이긴 자',
        condition: (state) =>
            state.stats.int >= 30 &&
            state.flags.has('ELOQUENCE') &&
            state.flags.has('NEGOTIATED_PEACE'),
        description: '전투 없이 마왕을 설득하여 인간과 마족의 공존을 이루어냈습니다.',
        priority: 110,
    },
    wanderer: {
        id: 'wanderer',
        name: '차원 유랑자',
        title: '화면 밖으로 나간 자',
        condition: (state) =>
            state.flags.has('META_AWARENESS') &&
            state.flags.has('LEFT_THE_SCREEN'),
        description: '당신은 이 세계가 게임임을 깨달았습니다. 그리고 화면 밖으로...',
        priority: 120,
        meta: true,
    },
};

// === 각성 엔딩 ===
export const AWAKENING_ENDINGS = {
    void_king: {
        id: 'void_king',
        name: '공허의 왕',
        subtitle: '12-A',
        title: '세상을 멸망시킨 자',
        condition: (state) =>
            state.phase === 'ended' &&
            state.flags.has('FINAL_BATTLE_WON') &&
            state.flags.has('WORLD_DESTROYED'),
        description: '당신은 모든 것을 끝냈습니다. 남은 것은 오직 공허뿐.',
        priority: 200,
    },
    observer: {
        id: 'observer',
        name: '관조자',
        subtitle: '12-B',
        title: '다음 세대를 기다리는 자',
        condition: (state) =>
            state.phase === 'ended' &&
            state.flags.has('FINAL_BATTLE_WON') &&
            state.flags.has('WAITING_NEXT_GENERATION'),
        description: '더 강해진 용사와 마왕이 나타날 때까지... 당신은 깊은 잠에 빠집니다.',
        priority: 195,
    },
    fleeting_peace: {
        id: 'fleeting_peace',
        name: '덧없는 평화',
        subtitle: '12-C',
        title: '일시적인 평화를 가져온 자',
        condition: (state) =>
            state.phase === 'awakening' &&
            state.flags.has('FINAL_BATTLE_LOST') &&
            state.resources.bond < ENDING_THRESHOLDS.AWAKENING_BOND_HIGH,
        description: '절대적 위협이 사라졌지만, 인간과 마족은 다시 싸울 것입니다.',
        priority: 180,
    },
    true_harmony: {
        id: 'true_harmony',
        name: '완전한 조화',
        subtitle: '12-D (True Ending)',
        title: '진정한 평화를 이룬 자',
        condition: (state) =>
            state.phase === 'awakening' &&
            state.flags.has('FINAL_BATTLE_LOST') &&
            state.resources.bond >= ENDING_THRESHOLDS.AWAKENING_BOND_HIGH,
        description: '절대적 공포에 맞서 싸우며 인간과 마족이 진정으로 하나가 되었습니다.',
        priority: 250,
        trueEnding: true,
    },
};

// === 직업 수식어 ===
export const JOB_MODIFIERS = {
    warrior: { condition: (s) => s.stats.str >= 30, text: '강인한 전사' },
    mage: { condition: (s) => s.stats.int >= 30, text: '현명한 마법사' },
    thief: { condition: (s) => s.stats.dex >= 30, text: '민첩한 도적' },
    merchant: { condition: (s) => s.resources.gold >= 500, text: '부유한 상인' },
    hermit: { condition: (s) => s.stats.intuition >= 20, text: '은둔자' },
    default: { condition: () => true, text: '모험가' },
};

// === 성격 수식어 (Karma 기반) ===
export const KARMA_MODIFIERS = {
    saint: { min: 50, text: '성인으로 추앙받는' },
    good: { min: 20, text: '선행으로 기억되는' },
    neutral: { min: -20, text: '' },
    evil: { min: -50, text: '악명 높은' },
    demon: { min: -Infinity, text: '악마로 두려움받는' },
};

// === 생존 수식어 ===
export const SURVIVAL_MODIFIERS = {
    healthy: { condition: (s) => s.resources.hp >= 80, text: '건강하게 생을 마감한' },
    wounded: { condition: (s) => s.resources.hp >= 30, text: '상처 입은 채로' },
    dying: { condition: () => true, text: '죽음 직전에' },
};

// === 엔딩 체크 및 생성 ===
export const checkEnding = (gameState) => {
    const allEndings = [
        ...Object.values(HIDDEN_ENDINGS),
        ...Object.values(AWAKENING_ENDINGS),
        ...Object.values(MAIN_ENDINGS),
    ];

    // 우선순위 순으로 정렬
    allEndings.sort((a, b) => b.priority - a.priority);

    // 조건 만족하는 첫 번째 엔딩 반환
    for (const ending of allEndings) {
        if (ending.condition(gameState)) {
            return ending;
        }
    }

    return MAIN_ENDINGS.death;
};

// === 조합형 엔딩 문장 생성 ===
export const generateEndingText = (gameState, ending) => {
    // 직업 결정
    let job = JOB_MODIFIERS.default.text;
    for (const [, mod] of Object.entries(JOB_MODIFIERS)) {
        if (mod.condition(gameState)) {
            job = mod.text;
            break;
        }
    }

    // 성격 결정
    let karma = '';
    for (const [, mod] of Object.entries(KARMA_MODIFIERS)) {
        if (gameState.stats.karma >= mod.min) {
            karma = mod.text;
            break;
        }
    }

    // 생존 상태 결정
    let survival = SURVIVAL_MODIFIERS.dying.text;
    for (const mod of Object.values(SURVIVAL_MODIFIERS)) {
        if (mod.condition(gameState)) {
            survival = mod.text;
            break;
        }
    }

    // 조합
    const parts = [];
    if (survival) parts.push(survival);
    if (karma) parts.push(karma);
    parts.push(job);

    const prefix = parts.join(' ');

    return {
        prefix,
        main: ending.title,
        description: ending.description || `당신은 ${ending.name}(으)로서 모험을 마쳤습니다.`,
    };
};
