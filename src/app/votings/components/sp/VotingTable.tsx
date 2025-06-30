'use client';

import { useTranslation } from "@/lib/i18n/hooks";

type Voting = {
  id: number;
  raceName: string;
  horseNumber: number;
  type: string; // 単勝, 馬連, etc.
  amount: number;
  odds: number;
};

type Props = {
  data: Voting[];
};

export const VotingTable = ({ data }: Props) => {
  const { t, loading } = useTranslation();

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow p-4">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {data.map((voting) => (
        <div key={voting.id} className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-sm">{voting.raceName}</h3>
              <p className="text-gray-600 text-xs mt-1">
                {t('voting.list.table.horseNumber')}: {voting.horseNumber} | {t('voting.list.table.type')}: {voting.type}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-500 text-xs">{t('voting.list.table.amount')}</p>
              <p className="font-medium">¥{voting.amount.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">{t('voting.list.table.odds')}</p>
              <p className="font-medium">{voting.odds}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">{t('voting.list.table.expectedPayout')}</p>
              <p className="font-semibold text-green-600">
                ¥{Math.floor(voting.amount * voting.odds).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}; 