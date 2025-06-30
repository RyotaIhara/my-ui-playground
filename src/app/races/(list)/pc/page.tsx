'use client';

import { RaceTable } from "@/app/races/components/pc/RaceTable";
import { RaceTrackTabs } from "@/app/races/components/pc/RaceTrackTabs";
import { useTranslation } from "@/lib/i18n/hooks";
import { useState } from "react";

type RaceTrack = 'tokyo' | 'kyoto' | 'hanshin';

const dummyData = {
  tokyo: [
    {
      id: 1,
      raceNumber: 1,
      startTime: "10:00",
      raceName: "2歳未勝利",
      weather: "晴",
      trackCondition: "良",
    },
    {
      id: 2,
      raceNumber: 2,
      startTime: "10:30",
      raceName: "3歳未勝利",
      weather: "晴",
      trackCondition: "良",
    },
    {
      id: 3,
      raceNumber: 3,
      startTime: "11:00",
      raceName: "4歳以上未勝利",
      weather: "曇",
      trackCondition: "稍重",
    },
  ],
  kyoto: [
    {
      id: 4,
      raceNumber: 1,
      startTime: "10:15",
      raceName: "2歳新馬",
      weather: "晴",
      trackCondition: "良",
    },
    {
      id: 5,
      raceNumber: 2,
      startTime: "10:45",
      raceName: "3歳新馬",
      weather: "晴",
      trackCondition: "良",
    },
    {
      id: 6,
      raceNumber: 3,
      startTime: "11:15",
      raceName: "1勝クラス",
      weather: "晴",
      trackCondition: "良",
    },
  ],
  hanshin: [
    {
      id: 7,
      raceNumber: 1,
      startTime: "10:30",
      raceName: "2歳未勝利",
      weather: "曇",
      trackCondition: "稍重",
    },
    {
      id: 8,
      raceNumber: 2,
      startTime: "11:00",
      raceName: "3歳未勝利",
      weather: "曇",
      trackCondition: "稍重",
    },
    {
      id: 9,
      raceNumber: 3,
      startTime: "11:30",
      raceName: "2勝クラス",
      weather: "晴",
      trackCondition: "良",
    },
  ],
};

export default function RacesPagePC() {
  const { t, loading } = useTranslation();
  const [activeTrack, setActiveTrack] = useState<RaceTrack>('tokyo');

  if (loading) {
    return;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">{t('races.list_title') || 'レース一覧'}</h1>
      
      <RaceTrackTabs 
        activeTrack={activeTrack}
        onTrackChange={setActiveTrack}
      />

      <div className="bg-white rounded-lg shadow-lg p-6">
        <RaceTable data={dummyData[activeTrack]} />
      </div>
    </div>
  );
} 