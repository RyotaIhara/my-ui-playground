'use client';

import { useTranslation } from "@/lib/i18n/hooks";

type VotingDetail = {
  id: number;
  raceName: string;
  horseNumber: number;
  type: string;
  buyMethod: string; // 通常, ながし, ボックス, フォーメーション
  selections: VotingSelection[];
  totalAmount: number;
  totalPayout: number;
  profit: number;
};

type VotingSelection = {
  id: number;
  horseNumbers: number[]; // 複数の馬番に対応
  odds: number;
  expectedPayout: number;
  actualPayout: number;
  result: 'win' | 'lose' | 'pending'; // 勝敗結果
};

type Props = {
  voting: VotingDetail | null;
  isOpen: boolean;
  onClose: () => void;
};

export const VotingDetailModal = ({ voting, isOpen, onClose }: Props) => {
  const { t, loading } = useTranslation();
  
  if (loading || !voting) {
    return null;
  }

  if (!isOpen) {
    return null;
  }

  const formatProfit = (profit: number) => {
    if (profit < 0) {
      return `△¥${Math.abs(profit).toLocaleString()}`;
    }
    return `¥${profit.toLocaleString()}`;
  };

  const getResultColor = (result: string) => {
    switch (result) {
      case 'win':
        return 'text-green-600';
      case 'lose':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getResultText = (result: string) => {
    switch (result) {
      case 'win':
        return '的中';
      case 'lose':
        return '不的中';
      default:
        return '未確定';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* タイトル部分 */}
        <div className="bg-blue-600 text-white p-6 rounded-t-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{t('voting.detail_title')}</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>
        
        {/* 詳細内容 */}
        <div className="p-6">
          {/* 基本情報 */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('voting.item.raceName')}
              </label>
              <p className="text-lg text-gray-900 font-semibold">{voting.raceName}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('voting.item.type')}
              </label>
              <p className="text-lg text-gray-900 font-semibold">{voting.type}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('voting.item.buyMethod')}
              </label>
              <p className="text-lg text-gray-900 font-semibold">{voting.buyMethod}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('voting.item.amount')}
              </label>
              <p className="text-lg text-gray-900 font-semibold">¥{voting.totalAmount.toLocaleString()}</p>
            </div>
          </div>

          {/* 買い目詳細テーブル */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('voting.item.selection')}詳細</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">{t('voting.item.selection')}</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">{t('voting.item.odds')}</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">{t('voting.item.expectedPayout')}</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">{t('voting.item.payout')}</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">{t('voting.item.result')}</th>
                  </tr>
                </thead>
                <tbody>
                  {voting.selections.map((selection) => (
                    <tr key={selection.id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3">
                        <span className="font-medium">
                          {selection.horseNumbers.join('→')}
                        </span>
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        {selection.odds}
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        ¥{selection.expectedPayout.toLocaleString()}
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        ¥{selection.actualPayout.toLocaleString()}
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        <span className={`font-semibold ${getResultColor(selection.result)}`}>
                          {getResultText(selection.result)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 結果サマリー */}
          <div className="grid grid-cols-3 gap-6 p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('voting.item.payout')}
              </label>
              <p className="text-xl font-semibold text-gray-900">
                ¥{voting.totalPayout.toLocaleString()}
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('voting.item.profit')}
              </label>
              <p className={`text-xl font-semibold ${voting.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatProfit(voting.profit)}
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('voting.item.returnRate')}
              </label>
              <p className={`text-xl font-semibold ${voting.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {((voting.totalPayout / voting.totalAmount) * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
        
        {/* 閉じるボタン */}
        <div className="p-6 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors text-base font-semibold"
          >
            {t('common.close')}
          </button>
        </div>
      </div>
    </div>
  );
}; 