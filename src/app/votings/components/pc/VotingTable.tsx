'use client';

import { useState } from 'react';
import {
Table,
TableBody,
TableCell,
TableHead,
TableHeader,
TableRow,
} from "@/shadcn/ui/table";
import { useTranslation } from "@/lib/i18n/hooks";
import { VotingDetailModal } from "./VotingDetailModal";

type Voting = {
id: number;
raceName: string;
horseNumber: number;
type: string; // 単勝, 馬連, etc.
amount: number;
odds: number;
};

type VotingDetail = {
  id: number;
  raceName: string;
  horseNumber: number;
  type: string;
  buyMethod: string;
  selections: {
    id: number;
    horseNumbers: number[];
    odds: number;
    expectedPayout: number;
    actualPayout: number;
    result: 'win' | 'lose' | 'pending';
  }[];
  totalAmount: number;
  totalPayout: number;
  profit: number;
};

type Props = {
data: Voting[];
};

export const VotingTable = ({ data }: Props) => {
  const { t, loading } = useTranslation();
  const [selectedVoting, setSelectedVoting] = useState<VotingDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) {
    return;
  }

  const handleDetailClick = (voting: Voting) => {
    // ダミーの詳細データを作成
    const detailData: VotingDetail = {
      id: voting.id,
      raceName: voting.raceName,
      horseNumber: voting.horseNumber,
      type: voting.type,
      buyMethod: voting.type === '馬連' ? 'ながし' : '通常',
      selections: [
        {
          id: 1,
          horseNumbers: [voting.horseNumber, voting.horseNumber + 1],
          odds: voting.odds,
          expectedPayout: Math.floor(voting.amount * voting.odds),
          actualPayout: Math.random() > 0.5 ? Math.floor(voting.amount * voting.odds) : 0,
          result: (Math.random() > 0.5 ? 'win' : 'lose') as 'win' | 'lose' | 'pending',
        },
        ...(voting.type === '馬連' ? [
          {
            id: 2,
            horseNumbers: [voting.horseNumber, voting.horseNumber + 2],
            odds: voting.odds * 1.2,
            expectedPayout: Math.floor(voting.amount * voting.odds * 1.2),
            actualPayout: Math.random() > 0.7 ? Math.floor(voting.amount * voting.odds * 1.2) : 0,
            result: (Math.random() > 0.7 ? 'win' : 'lose') as 'win' | 'lose' | 'pending',
          }
        ] : [])
      ],
      totalAmount: voting.amount,
      totalPayout: Math.random() > 0.5 ? Math.floor(voting.amount * voting.odds) : 0,
      profit: Math.random() > 0.5 ? Math.floor(voting.amount * voting.odds) - voting.amount : -voting.amount,
    };
    
    setSelectedVoting(detailData);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    if (confirm(t('voting.delete.confirm'))) {
      // TODO: 削除処理を実装
      console.log('Delete voting with id:', id);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVoting(null);
  };

  return (
    <>
      <div className="w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-100">
              <TableHead className="min-w-[200px] text-base font-semibold">{t('voting.item.raceName')}</TableHead>
              <TableHead className="min-w-[100px] text-base font-semibold">{t('voting.item.type')}</TableHead>
              <TableHead className="min-w-[120px] text-base font-semibold">{t('voting.item.amount')}</TableHead>
              <TableHead className="min-w-[80px] text-base font-semibold">{t('voting.item.odds')}</TableHead>
              <TableHead className="min-w-[120px] text-base font-semibold">{t('voting.item.expectedPayout')}</TableHead>
              <TableHead className="min-w-[150px] text-base font-semibold">{t('common.actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((voting) => (
              <TableRow key={voting.id}>
                  <TableCell className="font-medium text-base">{voting.raceName}</TableCell>
                  <TableCell className="text-base">{voting.type}</TableCell>
                  <TableCell className="text-base">¥{voting.amount.toLocaleString()}</TableCell>
                  <TableCell className="text-base">{voting.odds}</TableCell>
                  <TableCell className="font-semibold text-green-600 text-base">
                  ¥{Math.floor(voting.amount * voting.odds).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDetailClick(voting)}
                        className="px-5 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors text-base font-semibold shadow"
                      >
                        {t('voting.detail_button')}
                      </button>
                      <button
                        onClick={() => handleDeleteClick(voting.id)}
                        className="px-5 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors text-base font-semibold shadow"
                      >
                        {t('voting.delete_button')}
                      </button>
                    </div>
                  </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <VotingDetailModal
        voting={selectedVoting}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
}; 