'use client';

import { useState, useEffect, useMemo } from 'react';
import { VotingTable } from "@/app/votings/components/pc/VotingTable";
import { VotingSearchForm, SearchFilters } from "@/app/votings/components/pc/VotingSearchForm";
import { useTranslation } from "@/lib/i18n/hooks";
import Link from "next/link";
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

// ダミーデータにレース日を追加
const dummyData = [
  {
    id: 1,
    raceName: "東京11R 日本ダービー",
    raceDate: "2024-05-26",
    horseNumber: 5,
    type: "単勝",
    amount: 1000,
    odds: 4.2,
  },
  {
    id: 2,
    raceName: "京都10R 天皇賞（春）",
    raceDate: "2024-05-26",
    horseNumber: 7,
    type: "馬連",
    amount: 1500,
    odds: 8.5,
  },
  {
    id: 3,
    raceName: "阪神11R 宝塚記念",
    raceDate: "2024-06-23",
    horseNumber: 3,
    type: "三連複",
    amount: 2000,
    odds: 15.8,
  },
  {
    id: 4,
    raceName: "東京10R 安田記念",
    raceDate: "2024-06-02",
    horseNumber: 12,
    type: "単勝",
    amount: 800,
    odds: 3.1,
  },
  {
    id: 5,
    raceName: "京都11R 菊花賞",
    raceDate: "2024-10-20",
    horseNumber: 1,
    type: "馬連",
    amount: 1200,
    odds: 6.7,
  },
  {
    id: 6,
    raceName: "東京12R 有馬記念",
    raceDate: "2024-12-22",
    horseNumber: 8,
    type: "三連単",
    amount: 3000,
    odds: 25.5,
  },
  {
    id: 7,
    raceName: "阪神10R 大阪杯",
    raceDate: "2024-04-07",
    horseNumber: 4,
    type: "単勝",
    amount: 500,
    odds: 2.8,
  },
];

export default function VotingsPagePC() {
  const { t, loading } = useTranslation();
  const [filters, setFilters] = useState<SearchFilters>({
    raceDate: new Date().toISOString().split('T')[0], // 今日の日付をデフォルトに設定
    raceName: '',
    votingType: '',
    minAmount: '',
    maxAmount: '',
  });
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // フィルタリングされたデータを計算
  const filteredData = useMemo(() => {
    return dummyData.filter((voting) => {
      // レース日でフィルタリング
      if (filters.raceDate && voting.raceDate !== filters.raceDate) {
        return false;
      }

      // レース名でフィルタリング（部分一致）
      if (filters.raceName && !voting.raceName.toLowerCase().includes(filters.raceName.toLowerCase())) {
        return false;
      }

      // 投票タイプでフィルタリング
      if (filters.votingType && voting.type !== filters.votingType) {
        return false;
      }

      // 最小金額でフィルタリング
      if (filters.minAmount && voting.amount < parseInt(filters.minAmount)) {
        return false;
      }

      // 最大金額でフィルタリング
      if (filters.maxAmount && voting.amount > parseInt(filters.maxAmount)) {
        return false;
      }

      return true;
    });
  }, [filters]);

  if (loading) {
    return null;
  }

  const handleFiltersChange = (newFilters: SearchFilters) => {
    setFilters(newFilters);
  };

  const handleSearch = () => {
    // 検索ボタンが押された時の処理（現在はフィルタリングがリアルタイムで動作するため空）
    console.log('Search executed with filters:', filters);
  };

  const handleReset = () => {
    // リセット処理は VotingSearchForm 内で行われる
    console.log('Filters reset');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">{t('voting.list_title')}</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* 検索エリアのトグルボタン */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-800 transition-colors font-medium"
          >
            <span>{t('voting.search.title')}</span>
            {isSearchOpen ? (
              <ChevronUpIcon className="w-4 h-4 transition-transform duration-200" />
            ) : (
              <ChevronDownIcon className="w-4 h-4 transition-transform duration-200" />
            )}
          </button>
          <Link href="/votings/add">
            <button
              className="px-5 py-2 bg-yellow-400 text-white rounded-full hover:bg-yellow-500 transition-colors text-base font-semibold shadow"
            >
              {t('voting.add_button')}
            </button>
          </Link>
        </div>

        {/* 検索フォーム（開閉可能） */}
        {isSearchOpen && (
          <VotingSearchForm
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onSearch={handleSearch}
            onReset={handleReset}
          />
        )}

        {/* 検索結果の件数表示 */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-600">
            {t('voting.search.resultCount').replace('{{count}}', filteredData.length.toString())}
          </div>
        </div>

        {/* 投票テーブル */}
        <VotingTable data={filteredData} />
      </div>
    </div>
  );
} 