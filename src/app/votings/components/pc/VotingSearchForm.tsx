'use client';

import { useState } from 'react';
import { useTranslation } from "@/lib/i18n/hooks";

export type SearchFilters = {
  raceDate: string;
  raceName: string;
  votingType: string;
  minAmount: string;
  maxAmount: string;
};

type Props = {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onSearch: () => void;
  onReset: () => void;
};

export const VotingSearchForm = ({ filters, onFiltersChange, onSearch, onReset }: Props) => {
  const { t, loading } = useTranslation();

  if (loading) {
    return null;
  }

  const handleInputChange = (field: keyof SearchFilters, value: string) => {
    onFiltersChange({
      ...filters,
      [field]: value,
    });
  };

  const handleReset = () => {
    const today = new Date().toISOString().split('T')[0];
    onFiltersChange({
      raceDate: today,
      raceName: '',
      votingType: '',
      minAmount: '',
      maxAmount: '',
    });
    onReset();
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">{t('voting.search.title')}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {/* レース日 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('voting.search.raceDate')}
          </label>
          <input
            type="date"
            value={filters.raceDate}
            onChange={(e) => handleInputChange('raceDate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* レース名 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('voting.search.raceName')}
          </label>
          <input
            type="text"
            value={filters.raceName}
            onChange={(e) => handleInputChange('raceName', e.target.value)}
            placeholder={t('voting.search.raceNamePlaceholder')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* 投票タイプ */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('voting.search.votingType')}
          </label>
          <select
            value={filters.votingType}
            onChange={(e) => handleInputChange('votingType', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">{t('voting.search.allTypes')}</option>
            <option value="単勝">{t('voting.search.single')}</option>
            <option value="馬連">{t('voting.search.exacta')}</option>
            <option value="三連複">{t('voting.search.trifecta')}</option>
            <option value="三連単">{t('voting.search.trifectaExacta')}</option>
          </select>
        </div>

        {/* 最小金額 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('voting.search.minAmount')}
          </label>
          <input
            type="number"
            value={filters.minAmount}
            onChange={(e) => handleInputChange('minAmount', e.target.value)}
            placeholder="0"
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* 最大金額 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('voting.search.maxAmount')}
          </label>
          <input
            type="number"
            value={filters.maxAmount}
            onChange={(e) => handleInputChange('maxAmount', e.target.value)}
            placeholder="10000"
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* ボタンエリア */}
      <div className="flex gap-3">
        <button
          onClick={onSearch}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-semibold"
        >
          {t('voting.search.searchButton')}
        </button>
        <button
          onClick={handleReset}
          className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors font-semibold"
        >
          {t('voting.search.resetButton')}
        </button>
      </div>
    </div>
  );
}; 