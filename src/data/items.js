export const ITEMS = {
    potion_hp: {
        id: 'item_001',
        name: '붉은 포션',
        type: 'consumable',
        description: '사용 시 HP를 20 회복합니다.',
        price: 15,
        effect: {
            resource: 'hp',
            amount: 20
        }
    },
    potion_fatigue: {
        id: 'item_002',
        name: '청색 포션',
        type: 'consumable',
        description: '사용 시 피로도를 15 회복합니다.',
        price: 10,
        effect: {
            resource: 'fatigue',
            amount: -15
        }
    },
    elixir_strength: {
        id: 'item_003',
        name: '힘의 엘릭서',
        type: 'consumable',
        description: '사용 시 힘 스탯이 2 상승합니다.',
        price: 50,
        effect: {
            stat: 'str',
            amount: 2
        }
    },
    normal_sword: {
        id: 'equip_001',
        name: '일반 검',
        type: 'equipment',
        description: '기본적인 공격력을 지닌 검입니다. 공격력 +5.',
        price: 100,
        effect: {
            stat: 'attack',
            amount: 5
        }
    },
    gem_blue: {
        id: 'gem_001',
        name: '파란 보석',
        type: 'gem',
        description: '희귀한 파란 보석입니다. 상점에서 높은 가격에 팔 수 있습니다.',
        price: 200,
        effect: {
            resource: 'gold',
            amount: 200
        }
    },
    // --- New Items ---
    potion_stamina: {
        id: 'item_004',
        name: '활력의 물약',
        type: 'consumable',
        description: '지친 몸에 활력을 불어넣습니다. 피로도 -30.',
        price: 40,
        effect: { resource: 'fatigue', amount: -30 }
    },
    potion_healing_great: {
        id: 'item_005',
        name: '대형 회복 물약',
        type: 'consumable',
        description: '깊은 상처도 치유합니다. HP +50.',
        price: 60,
        effect: { resource: 'hp', amount: 50 }
    },
    scroll_wisdom: {
        id: 'item_006',
        name: '지혜의 두루마리',
        type: 'consumable',
        description: '고대의 지식이 담겨있습니다. 지능 +2.',
        price: 150,
        effect: { stat: 'int', amount: 2 }
    },
    charm_luck: {
        id: 'item_007',
        name: '행운의 부적',
        type: 'consumable',
        description: '일시적으로 운이 좋아지는 것 같습니다. 행운 +2.',
        price: 120,
        effect: { stat: 'luck', amount: 2 }
    },
    ration_dried: {
        id: 'item_008',
        name: '말린 식량',
        type: 'consumable',
        description: '허기를 채우고 기운을 차립니다. HP +10, 피로도 -5.',
        price: 10,
        effect: { resource: 'hp', amount: 10 }
    },
    elixir_dexterity: {
        id: 'item_009',
        name: '민첩의 비약',
        type: 'consumable',
        description: '몸이 가벼워집니다. 민첩 +2.',
        price: 150,
        effect: { stat: 'dex', amount: 2 }
    },
    herb_mystic: {
        id: 'item_010',
        name: '신비한 약초',
        type: 'consumable',
        description: '정신을 맑게 합니다. 직감 +1.',
        price: 80,
        effect: { stat: 'intuition', amount: 1 }
    },
    dagger_rusty: {
        id: 'equip_002',
        name: '녹슨 단검',
        type: 'equipment',
        description: '날이 무딘 단검입니다. 공격력 +2.',
        price: 30,
        effect: { stat: 'attack', amount: 2 }
    },
    sword_iron: {
        id: 'equip_003',
        name: '철제 검',
        type: 'equipment',
        description: '튼튼한 철로 만든 검입니다. 공격력 +8.',
        price: 250,
        effect: { stat: 'attack', amount: 8 }
    },
    axe_battle: {
        id: 'equip_004',
        name: '전투 도끼',
        type: 'equipment',
        description: '묵직한 한 방을 날립니다. 공격력 +12.',
        price: 400,
        effect: { stat: 'attack', amount: 12 }
    },
    spear_guard: {
        id: 'equip_005',
        name: '경비병의 창',
        type: 'equipment',
        description: '리치가 긴 무기입니다. 공격력 +7.',
        price: 200,
        effect: { stat: 'attack', amount: 7 }
    },
    armor_leather: {
        id: 'equip_006',
        name: '가죽 갑옷',
        type: 'equipment',
        description: '가볍고 질긴 갑옷입니다. 방어력 +2.',
        price: 150,
        effect: { stat: 'def', amount: 2 }
    },
    armor_chain: {
        id: 'equip_007',
        name: '사슬 갑옷',
        type: 'equipment',
        description: '철사슬로 엮은 갑옷입니다. 방어력 +5.',
        price: 350,
        effect: { stat: 'def', amount: 5 }
    },
    shield_wood: {
        id: 'equip_008',
        name: '나무 방패',
        type: 'equipment',
        description: '공격을 막아냅니다. 방어력 +3.',
        price: 100,
        effect: { stat: 'def', amount: 3 }
    },
    ring_vitality: {
        id: 'equip_009',
        name: '활력의 반지',
        type: 'equipment',
        description: '생명력이 솟아납니다. MaxHP +10 (구현 필요).',
        price: 300,
        effect: { stat: 'maxHp', amount: 10 }
    },
    gem_red: {
        id: 'gem_002',
        name: '붉은 보석',
        type: 'gem',
        description: '불타는 듯한 붉은 보석입니다.',
        price: 250,
        effect: { resource: 'gold', amount: 250 }
    },
    gem_green: {
        id: 'gem_003',
        name: '초록 보석',
        type: 'gem',
        description: '숲의 기운을 담은 보석입니다.',
        price: 220,
        effect: { resource: 'gold', amount: 220 }
    },
    gem_diamond: {
        id: 'gem_004',
        name: '다이아몬드',
        type: 'gem',
        description: '가장 단단하고 빛나는 보석입니다.',
        price: 1000,
        effect: { resource: 'gold', amount: 1000 }
    },
    relic_coin: {
        id: 'misc_001',
        name: '고대 주화',
        type: 'misc',
        description: '어느 시대의 것인지 알 수 없는 주화입니다.',
        price: 500,
        effect: { resource: 'gold', amount: 500 }
    },
    relic_statue: {
        id: 'misc_002',
        name: '기이한 조각상',
        type: 'misc',
        description: '보는 각도에 따라 표정이 달라지는 것 같습니다.',
        price: 800,
        effect: { resource: 'gold', amount: 800 }
    }
};