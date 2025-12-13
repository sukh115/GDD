// ====================================
// 기연 이벤트 (Special Events)
// 희귀한 행운의 이벤트
// ====================================

const SPECIAL_EVENTS = [
    {
        id: 'spe_mysterious_spring',
        locations: ['forest'],
        text: '신비한 샘물을 발견했습니다.',
        options: [
            { label: '마신다', reward: { hp: 30, fatigue: -20 }, log: '상쾌합니다!' },
            { label: '지나친다', log: '의심스러워 지나갑니다.' },
        ],
        weight: 3,
    },
    {
        id: 'spe_treasure_chest',
        locations: ['dungeon'],
        text: '보물상자가 있습니다!',
        options: [
            { label: '연다', reward: { gold: 50 }, log: '금화 발견!' },
            { label: '함정 확인', reward: { intuition: 1 }, log: '함정을 확인합니다.' },
        ],
        weight: 4,
    },
    {
        id: 'spe_mage_spirit',
        locations: ['tower'],
        text: '옛 현자의 영혼이 나타났습니다.',
        options: [
            { label: '지혜를 구한다', cost: { fatigue: 20 }, reward: { int: 3, intuition: 2 }, flag: 'MET_SAGE_SPIRIT', log: '지혜를 전수받았습니다.' },
            { label: '거절한다', log: '영혼이 사라집니다.' },
        ],
        weight: 2,
    },
    {
        id: 'spe_eloquence_training',
        locations: ['castle'],
        text: '유명한 웅변가가 제자를 찾습니다.',
        options: [
            { label: '제자가 된다', cost: { gold: 100, fatigue: 30 }, reward: { int: 3 }, flag: 'ELOQUENCE', log: '언변을 배웠습니다.' },
            { label: '거절한다', log: '관심 없습니다.' },
        ],
        weight: 2,
        requirements: { minInt: 20 },
    },
    {
        id: 'spe_meta_awareness',
        locations: ['tower'],
        text: '이상한 문양이 빛납니다... 현실이 흔들립니다.',
        options: [
            { label: '만져본다', reward: { intuition: 5 }, flag: 'META_AWARENESS', log: '무언가를 깨달았습니다...' },
            { label: '물러난다', log: '불안해서 물러납니다.' },
        ],
        weight: 1,
        requirements: { minInt: 30 },
    },
    {
        id: 'spe_dark_artifact',
        locations: ['dungeon', 'demon_castle'],
        text: '어두운 기운이 서린 유물입니다.',
        options: [
            { label: '손을 댄다', reward: { str: 5, karma: -20 }, flag: 'TOUCHED_DARK_ARTIFACT', log: '힘이 흐르지만 무언가 잃었습니다.' },
            { label: '피한다', log: '불길해서 피합니다.' },
        ],
        weight: 2,
    },
];

/**
 * 기연 이벤트 생성
 * @param {string} locationId - 현재 위치
 * @param {Object} state - 게임 상태
 * @returns {Object} 이벤트
 */
export function generate(locationId, state) {
    // 위치 + 요구사항 필터링
    const available = SPECIAL_EVENTS.filter(e => {
        if (!e.locations.includes(locationId)) return false;
        if (e.requirements?.minInt && (state.stats?.int || 0) < e.requirements.minInt) return false;
        return true;
    });

    if (available.length === 0) {
        return {
            id: 'spe_nothing',
            type: 'special',
            text: '특별한 기운이 느껴졌지만 사라졌습니다.',
            options: [{ label: '계속한다', log: '아쉽습니다.' }],
        };
    }

    // 가중치 기반 선택
    const totalWeight = available.reduce((sum, e) => sum + (e.weight || 1), 0);
    let random = Math.random() * totalWeight;

    for (const event of available) {
        random -= (event.weight || 1);
        if (random <= 0) return { ...event, type: 'special' };
    }

    return { ...available[0], type: 'special' };
}
