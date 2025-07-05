'use client';

import { VotingAddTable } from "@/app/votings/components/pc/VotingAddTable";
import { VotingRaceHeader } from "@/app/votings/components/pc/VotingRaceHeader";
import { RaceInfoHeader } from "@/app/votings/components/pc/RaceInfoHeader";
import { useTranslation } from "@/lib/i18n/hooks";
import { useState } from "react";

type BetType = 'tansho' | 'fukusho' | 'wakuren' | 'umaren' | 'wide' | 'umatan' | 'sanrenpuku' | 'sanrentan';
type BetMethod = 'normal' | 'nagashi' | 'box';
type RaceTrack = 'tokyo' | 'kyoto' | 'hanshin';

const dummyRaceData = {
  id: 1,
  raceNumber: 1,
  startTime: "10:00",
  raceName: "2歳未勝利",
  weather: "晴",
  trackCondition: "良",
  horses: [
    {
      id: 1,
      gateNumber: 1,
      horseNumber: 1,
      horseName: "サクラエイシン",
      odds: 3.2,
      popularity: 1,
    },
    {
      id: 2,
      gateNumber: 2,
      horseNumber: 2,
      horseName: "ダイワスカーレット",
      odds: 4.5,
      popularity: 2,
    },
    {
      id: 3,
      gateNumber: 3,
      horseNumber: 3,
      horseName: "ディープインパクト",
      odds: 2.8,
      popularity: 3,
    },
    {
      id: 4,
      gateNumber: 4,
      horseNumber: 4,
      horseName: "オルフェーヴル",
      odds: 5.1,
      popularity: 4,
    },
    {
      id: 5,
      gateNumber: 5,
      horseNumber: 5,
      horseName: "ジェンティルドンナ",
      odds: 6.2,
      popularity: 5,
    },
  ],
};

export default function VotingAddPage() {
  const { t, loading } = useTranslation();
  const [selectedBetType, setSelectedBetType] = useState<BetType>('tansho');
  const [selectedBetMethod, setSelectedBetMethod] = useState<BetMethod>('normal');
  const [selectedHorses, setSelectedHorses] = useState<number[]>([]);
  const [activeTrack, setActiveTrack] = useState<RaceTrack>('tokyo');
  const [selectedRaceNumber, setSelectedRaceNumber] = useState(1);

  if (loading) {
    return;
  }

  const raceInfo = {
    raceNumber: dummyRaceData.raceNumber,
    raceName: dummyRaceData.raceName,
    startTime: dummyRaceData.startTime,
    weather: dummyRaceData.weather,
    trackCondition: dummyRaceData.trackCondition,
  };

  const betTypeNames = {
    tansho: t('voting.add.betType.tansho'),
    fukusho: t('voting.add.betType.fukusho'),
    wakuren: t('voting.add.betType.wakuren'),
    umaren: t('voting.add.betType.umaren'),
    wide: t('voting.add.betType.wide') ,
    umatan: t('voting.add.betType.umatan'),
    sanrenpuku: t('voting.add.betType.sanrenpuku'),
    sanrentan: t('voting.add.betType.sanrentan'),
  };

  const betMethodNames = {
    normal: t('voting.add.betMethod.normal'),
    nagashi: t('voting.add.betMethod.nagashi'),
    box: t('voting.add.betMethod.box'),
  };

  const handleHorseSelection = (horseId: number) => {
    setSelectedHorses(prev => 
      prev.includes(horseId) 
        ? prev.filter(id => id !== horseId)
        : [...prev, horseId]
    );
  };

  // ダミーのレース番号リスト
  const raceNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  // ダミーの競馬場リスト
  const tracks = [
    { value: 'tokyo', label: '東京' },
    { value: 'kyoto', label: '京都' },
    { value: 'hanshin', label: '阪神' },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* 上部：投票レースの変更ラベル、競馬場・レース番号セレクト、反映ボタン */}
       <VotingRaceHeader />
      {/* 購入ページラベル */}
      <div className="mb-2">
        <span className="text-lg font-semibold text-blue-700">購入ページ</span>
      </div>
      <RaceInfoHeader raceInfo={raceInfo} />

      {/* 券種タブ */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            {Object.entries(betTypeNames).map(([key, name]) => (
              <button
                key={key}
                onClick={() => setSelectedBetType(key as BetType)}
                className={`py-3 px-2 border-b-2 font-medium text-base whitespace-nowrap ${
                  selectedBetType === key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* 方式選択タブ */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('voting.add.methodSelection') || '方式選択'}</h3>
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {Object.entries(betMethodNames).map(([key, name]) => (
              <button
                key={key}
                onClick={() => setSelectedBetMethod(key as BetMethod)}
                className={`py-2 px-4 border-b-2 font-medium text-sm ${
                  selectedBetMethod === key
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <VotingAddTable 
          data={dummyRaceData.horses}
          selectedHorses={selectedHorses}
          onHorseSelection={handleHorseSelection}
          betType={selectedBetType}
          betMethod={selectedBetMethod}
        />
      </div>
    </div>
  );
} 