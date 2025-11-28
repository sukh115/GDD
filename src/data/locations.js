export const LOCATIONS = {
    'loc_village': {
        id: 'loc_village',
        name: '평화로운 마을',
        description: '모험의 시작점입니다. 안전하고 평화롭습니다.',
        actions: ['REST', 'EARN', 'PATROL', 'PRAY'],
        connections: ['loc_forest', 'loc_castle']
    },
    'loc_forest': {
        id: 'loc_forest',
        name: '어두운 숲',
        description: '몬스터가 출몰하는 위험한 숲입니다.',
        actions: ['EXPLORE', 'HUNT', 'TRAIN'],
        connections: ['loc_village', 'loc_dungeon']
    },
    'loc_castle': {
        id: 'loc_castle',
        name: '왕성',
        description: '왕국이 통치하는 거대한 성입니다.',
        actions: ['EARN', 'RESEARCH', 'PATROL'],
        connections: ['loc_village']
    },
    'loc_dungeon': {
        id: 'loc_dungeon',
        name: '고대 던전',
        description: '강력한 마물과 보물이 잠들어 있는 곳입니다.',
        actions: ['EXPLORE', 'HUNT', 'SPECIAL'],
        connections: ['loc_forest']
    }
};
