'use client';

import { useTranslation } from "@/lib/i18n/hooks";

type Baken = {
  id: number;
  raceName: string;
  horseNumber: number;
  type: string;
  amount: number;
  odds: number;
};

type Props = {
  baken: Baken | null;
  isOpen: boolean;
  onClose: () => void;
};

export const BakenDetailModal = ({ baken, isOpen, onClose }: Props) => {
  const { t, loading } = useTranslation();
  
  if (loading || !baken) {
    return null;
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">{t('voting.detail.title')}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('voting.list.table.raceName')}
            </label>
            <p className="text-lg text-gray-900">{baken.raceName}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('voting.list.table.horseNumber')}
            </label>
            <p className="text-lg text-gray-900">{baken.horseNumber}番</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('voting.list.table.type')}
            </label>
            <p className="text-lg text-gray-900">{baken.type}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('voting.list.table.amount')}
            </label>
            <p className="text-lg text-gray-900">¥{baken.amount.toLocaleString()}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('voting.list.table.odds')}
            </label>
            <p className="text-lg text-gray-900">{baken.odds}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('voting.list.table.expectedPayout')}
            </label>
            <p className="text-xl font-semibold text-green-600">
              ¥{Math.floor(baken.amount * baken.odds).toLocaleString()}
            </p>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            {t('common.close')}
          </button>
        </div>
      </div>
    </div>
  );
}; 