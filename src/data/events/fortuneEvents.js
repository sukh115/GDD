// ====================================
// 기연 이벤트 (Fortune Events)
// 게임을 좌지우지할 막대한 보상
// Pity Timer 적용 대상
// ====================================

const FORTUNE_EVENTS = [
    {
        id: 'for_legendary_weapon',
        text: '빛나는 검이 당신을 선택했습니다.',
        options: [
            {
                label: '손을 뻗는다',
                reward: { str: 15 },
                flag: 'LEGENDARY_WEAPON',
                log: '전설의 무기를 얻었습니다! 힘이 크게 상승합니다.'
            },
        ],
    },
    {
        id: 'for_ancient_knowledge',
        text: '고대의 지혜가 머릿속에 스며듭니다.',
        options: [
            {
                label: '받아들인다',
                reward: { int: 15, intuition: 10 },
                flag: 'ANCIENT_KNOWLEDGE',
                log: '고대의 지식을 얻었습니다! 지능과 직감이 크게 상승합니다.'
            },
        ],
    },
    {
        id: 'for_blessing_of_fortune',
        text: '운명의 여신이 당신을 축복합니다.',
        options: [
            {
                label: '축복을 받는다',
                reward: { luck: 20 },
                flag: 'BLESSED_BY_FORTUNE',
                log: '여신의 축복! 행운이 크게 상승합니다.'
            },
        ],
    },
    {
        id: 'for_treasure_hoard',
        text: '숨겨진 보물창고를 발견했습니다!',
        options: [
            {
                label: '보물을 챙긴다',
                reward: { gold: 500 },
                log: '막대한 금화를 발견했습니다!'
            },
        ],
    },
    {
        id: 'for_hero_recognition',
        text: '왕국이 당신을 영웅으로 인정합니다.',
        options: [
            {
                label: '영예를 받는다',
                reward: { karma: 50 },
                flag: 'RECOGNIZED_HERO',
                log: '영웅으로 인정받았습니다! 명성이 크게 상승합니다.'
            },
        ],
    },
    {
        id: 'for_demon_contract',
        text: '악마가 거래를 제안합니다. 막대한 힘을 주겠다고...',
        options: [
            {
                label: '거래한다',
                reward: { str: 20, dex: 20, karma: -100 },
                flag: 'DEMON_CONTRACT',
                log: '악마와 계약했습니다. 힘을 얻었지만 대가가 있을 것입니다...'
            },
            {
                label: '거절한다',
                reward: { karma: 20 },
                log: '유혹을 뿌리쳤습니다.'
            },
        ],
    },
    {
        id: 'for_divine_revelation',
        text: '신의 계시가 내려옵니다.',
        options: [
            {
                label: '계시를 받는다',
                reward: { intuition: 20 },
                flag: 'DIVINE_REVELATION',
                log: '신의 계시! 직감이 극대화됩니다.'
            },
        ],
    },
];

/**
 * 기연 이벤트 생성 (Pity Timer 기반)
 * @param {Object} state - 게임 상태
 * @returns {Object|null} 기연 이벤트 또는 null
 */
export function generate(state) {
    // Pity 확률 계산: 기본 1% + pityCounter * 0.5%
    const pityChance = 0.01 + (state.pityCounter || 0) * 0.005;

    // 최대 확률 제한 (30%)
    const finalChance = Math.min(pityChance, 0.3);

    // 확률 체크
    if (Math.random() > finalChance) {
        return null; // 기연 발생 안 함
    }

    // 랜덤 기연 선택
    const selected = FORTUNE_EVENTS[Math.floor(Math.random() * FORTUNE_EVENTS.length)];

    return {
        ...selected,
        type: 'fortune',
    };
}

/**
 * 기연 발생 여부 체크
 * @param {number} pityCounter - Pity 카운터
 * @returns {boolean} 기연 발생 여부
 */
export function shouldTrigger(pityCounter = 0) {
    const chance = 0.01 + pityCounter * 0.005;
    return Math.random() < Math.min(chance, 0.3);
}
