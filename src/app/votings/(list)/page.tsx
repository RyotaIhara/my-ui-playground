'use client';

import { BakenTable } from "@/app/votings/components/BakenTable";
import { useTranslation } from "@/lib/i18n/hooks";

const dummyData = [
  {
    id: 1,
    raceName: "東京11R 日本ダービー",
    horseNumber: 5,
    type: "単勝",
    amount: 1000,
    odds: 4.2,
  },
  {
    id: 2,
    raceName: "京都10R",
    horseNumber: 7,
    type: "馬連",
    amount: 1500,
    odds: 8.5,
  },
];

export default function BakenPage() {
  const { t, loading } = useTranslation();

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Loading...</h1>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{t('voting.list.title')}</h1>
      <BakenTable data={dummyData} />
    </div>
  );
}
