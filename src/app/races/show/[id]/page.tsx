'use client';

import { RaceDetailTable } from "@/app/races/components/pc/RaceDetailTable";
import { RaceInfoHeader } from "@/app/votings/components/pc/RaceInfoHeader";
import { useTranslation } from "@/lib/i18n/hooks";
import { useParams } from "next/navigation";
import Link from "next/link";

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
      sexAge: "牝2",
      weight: 54.0,
      jockey: "武豊",
      horseWeight: 456,
      weightChange: "+2",
    },
    {
      id: 2,
      gateNumber: 2,
      horseNumber: 2,
      horseName: "ダイワスカーレット",
      sexAge: "牝2",
      weight: 54.0,
      jockey: "福永祐一",
      horseWeight: 458,
      weightChange: "-1",
    },
    {
      id: 3,
      gateNumber: 3,
      horseNumber: 3,
      horseName: "ディープインパクト",
      sexAge: "牡2",
      weight: 56.0,
      jockey: "池添謙一",
      horseWeight: 462,
      weightChange: "+3",
    },
    {
      id: 4,
      gateNumber: 4,
      horseNumber: 4,
      horseName: "オルフェーヴル",
      sexAge: "牡2",
      weight: 56.0,
      jockey: "和田竜二",
      horseWeight: 460,
      weightChange: "0",
    },
    {
      id: 5,
      gateNumber: 5,
      horseNumber: 5,
      horseName: "ジェンティルドンナ",
      sexAge: "牝2",
      weight: 54.0,
      jockey: "岩田康誠",
      horseWeight: 454,
      weightChange: "-2",
    },
  ],
};

export default function RaceDetailPage() {
  const { t, loading } = useTranslation();
  const params = useParams();
  const raceId = params.id;

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

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <RaceInfoHeader raceInfo={raceInfo} />
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-end mb-4">
          <Link href={`/votings/add/${raceId}`}>
            <button
              className="px-5 py-2 bg-yellow-400 text-white rounded-full hover:bg-yellow-500 transition-colors text-base font-semibold shadow"
            >
              {t('voting.add_button')}
            </button>
          </Link>
        </div>
        <RaceDetailTable data={dummyRaceData.horses} />
      </div>
    </div>
  );
} 