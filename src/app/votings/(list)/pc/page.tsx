'use client';

import { BakenTable } from "@/app/votings/components/pc/BakenTable";
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
    raceName: "京都10R 天皇賞（春）",
    horseNumber: 7,
    type: "馬連",
    amount: 1500,
    odds: 8.5,
  },
  {
    id: 3,
    raceName: "阪神11R 宝塚記念",
    horseNumber: 3,
    type: "三連複",
    amount: 2000,
    odds: 15.8,
  },
  {
    id: 4,
    raceName: "東京10R 安田記念",
    horseNumber: 12,
    type: "単勝",
    amount: 800,
    odds: 3.1,
  },
  {
    id: 5,
    raceName: "京都11R 菊花賞",
    horseNumber: 1,
    type: "馬連",
    amount: 1200,
    odds: 6.7,
  },
];

export default function BakenPagePC() {
  const { t, loading } = useTranslation();
  if (loading) {
    return;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">{t('voting.list_title')}</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <BakenTable data={dummyData} />
      </div>
    </div>
  );
} 