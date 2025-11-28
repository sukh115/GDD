export const ITEMS = {
    potion_hp: {
        id: 'item_001',
        name: '붉은 포션',
        type: 'consumable',
        description: '사용 시 HP를 20 회복합니다.',
        price: 15,
        effect: {
            hp: 20,
            amount: 30
        }
    },
    potion_fatigue: {
        id: 'item_002',
        name: '청색 포션',
        type: 'consumable',
        description: '사용 시 피로도를 15 회복합니다.',
        price: 10,
        effect: {
            fatigue: 15,
            amount: 20
        }
    },
    elixir_strength: {
        id: 'item_003',
        name: '힘의 엘릭서',
        type: 'consumable',
        description: '사용 시 힘 스탯이 2 상승합니다.',
        price: 50,
        effect: {
            str: 2,
            amount: 5
        }
    },
    normal_sword: {
        id: 'equip_001',
        name: '일반 검',
        type: 'equipment',
        description: '기본적인 공격력을 지닌 검입니다. 공격력 +5.',
        price: 100,
        effect: {
            attack: 5,
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
            gold: 200,
            amount: 30
        }
    }
}