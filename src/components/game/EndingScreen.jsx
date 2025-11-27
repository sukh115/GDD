import React from 'react';
import useGameStore from '../../store/gameStore';
import GameButton from '../ui/GameButton';

const EndingScreen = () => {
    const { endingData, restartGame } = useGameStore();

    if (!endingData) return null;

    const { type, finalStats, turnCount } = endingData;

    // 1. 메인 타이틀 결정
    let title = "";
    let colorClass = "";

    if (type === 'death') {
        title = "YOU DIED";
        colorClass = "text-red-600";
    } else if (type === 'victory') {
        title = "LEGEND BORN";
        colorClass = "text-yellow-500";
    } else {
        title = "RETIRED";
        colorClass = "text-gray-400";
    }

    // 2. 조합형 에필로그 생성 (Logic)
    const generateEpilogue = () => {
        const parts = [];

        // A. 시작 (죽음 vs 생존)
        if (type === 'death') {
            parts.push(`당신의 여정은 ${turnCount}번째 선택에서 끝이 났습니다.`);
            parts.push("차가운 땅바닥이 당신의 마지막 침대였습니다.");
        } else {
            parts.push(`장장 ${turnCount}번에 걸친 모험 끝에, 당신은 살아남았습니다.`);
        }

        // B. 직업/능력 (가장 높은 스탯 기반)
        if (finalStats.str > 50) {
            parts.push("사람들은 당신을 '무적의 전사'라 불렀습니다. 당신의 칼끝에서 수많은 괴물이 쓰러졌습니다.");
        } else if (finalStats.int > 50) {
            parts.push("당신의 지혜는 왕국 제일이었습니다. 현자들은 당신의 발자취를 기록했습니다.");
        } else {
            parts.push("특별히 뛰어난 재능은 없었지만, 끈기 하나로 버텨냈습니다.");
        }

        // C. 성향 (카르마)
        if (finalStats.karma > 20) {
            parts.push("당신의 선행은 전설이 되어, 아이들의 자장가로 불려집니다.");
        } else if (finalStats.karma < -20) {
            parts.push("하지만 사람들은 당신의 이름만 들어도 공포에 떱니다. 영웅인가, 재앙인가?");
        } else {
            parts.push("당신은 조용히 역사 속으로 사라졌습니다. 소박하지만 평화로운 결말이었습니다.");
        }

        return parts;
    };

    return (
        <div className="absolute inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-8 animate-fade-in">
            <h1 className={`text-6xl font-black mb-8 tracking-tighter ${colorClass} animate-pulse`}>
                {title}
            </h1>

            <div className="max-w-lg text-center space-y-6 mb-12 text-gray-300 font-serif text-lg leading-relaxed">
                {generateEpilogue().map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                ))}
            </div>

            <div className="grid grid-cols-2 gap-8 text-sm font-mono text-gray-500 mb-12">
                <div>최종 근력: {finalStats.str}</div>
                <div>최종 지능: {finalStats.int}</div>
                <div>최종 카르마: {finalStats.karma}</div>
                <div>생존 턴: {turnCount}</div>
            </div>

            <div className="w-full max-w-xs">
                <GameButton
                    label="다시 시작하기"
                    onClick={restartGame}
                    variant="default"
                />
            </div>
        </div>
    );
};

export default EndingScreen;