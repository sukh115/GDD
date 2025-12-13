// ====================================
// 인연 이벤트 (Relation Events)
// NPC와의 만남, 대화, 도움
// ====================================

const RELATION_EVENTS = [
    {
        id: 'rel_lost_child',
        locations: ['village'],
        text: '울고 있는 아이를 발견했습니다.',
        options: [
            { label: '부모를 찾아준다', cost: { fatigue: 10 }, reward: { karma: 10, gold: 5 }, log: '아이의 부모를 찾아주었습니다.' },
            { label: '무시한다', reward: { karma: -5 }, log: '아이를 외면했습니다.' },
        ],
        weight: 8,
    },
    {
        id: 'rel_beggar',
        locations: ['village', 'castle'],
        text: '거지가 구걸하고 있습니다.',
        options: [
            { label: '적선한다 (-10G)', cost: { gold: 10 }, reward: { karma: 5 }, log: '동전을 건넸습니다.' },
            { label: '쫓아낸다', reward: { karma: -5 }, log: '거지를 쫓았습니다.' },
        ],
        weight: 6,
    },
    {
        id: 'rel_noble_request',
        locations: ['castle'],
        text: '귀족이 부탁을 합니다.',
        options: [
            { label: '수락한다', cost: { fatigue: 20 }, reward: { gold: 50, karma: 5 }, log: '부탁을 들어주었습니다.' },
            { label: '거절한다', reward: { karma: -3 }, log: '거절했습니다.' },
        ],
        weight: 7,
    },
    {
        id: 'rel_traveler',
        locations: ['forest'],
        text: '지친 여행자가 길을 묻습니다.',
        options: [
            { label: '도와준다', cost: { fatigue: 5 }, reward: { karma: 5, intuition: 1 }, log: '길을 알려주었습니다.' },
            { label: '무시한다', log: '지나갑니다.' },
        ],
        weight: 5,
    },
    {
        id: 'rel_wandering_merchant',
        locations: ['forest', 'castle'],
        text: '떠돌이 상인이 물건을 펼쳐놓았습니다.',
        options: [
            { label: '거래한다', action: 'OPEN_SHOP', log: '상점을 엽니다.' },
            { label: '지나간다', log: '상인을 지나칩니다.' },
        ],
        weight: 8,
    },
];

/**
 * 인연 이벤트 생성
 * @param {string} locationId - 현재 위치
 * @param {Object} state - 게임 상태
 * @returns {Object} 이벤트
 */
export function generate(locationId, state) {
    // 위치 필터링
    const available = RELATION_EVENTS.filter(e => e.locations.includes(locationId));

    if (available.length === 0) {
        return {
            id: 'rel_nothing',
            type: 'relation',
            text: '조용한 시간이 흐릅니다.',
            options: [{ label: '계속한다', log: '아무 일도 없었습니다.' }],
        };
    }

    // 가중치 기반 선택
    const totalWeight = available.reduce((sum, e) => sum + (e.weight || 1), 0);
    let random = Math.random() * totalWeight;

    for (const event of available) {
        random -= (event.weight || 1);
        if (random <= 0) return { ...event, type: 'relation' };
    }

    return { ...available[0], type: 'relation' };
}
