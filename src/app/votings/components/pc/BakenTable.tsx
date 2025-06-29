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
import { BakenDetailModal } from "./BakenDetailModal";

type Baken = {
id: number;
raceName: string;
horseNumber: number;
type: string; // 単勝, 馬連, etc.
amount: number;
odds: number;
};

type BakenDetail = {
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
data: Baken[];
};

export const BakenTable = ({ data }: Props) => {
  const { t, loading } = useTranslation();
  const [selectedBaken, setSelectedBaken] = useState<BakenDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) {
    return;
  }

  const handleDetailClick = (baken: Baken) => {
    // ダミーの詳細データを作成
    const detailData: BakenDetail = {
      id: baken.id,
      raceName: baken.raceName,
      horseNumber: baken.horseNumber,
      type: baken.type,
      buyMethod: baken.type === '馬連' ? 'ながし' : '通常',
      selections: [
        {
          id: 1,
          horseNumbers: [baken.horseNumber, baken.horseNumber + 1],
          odds: baken.odds,
          expectedPayout: Math.floor(baken.amount * baken.odds),
          actualPayout: Math.random() > 0.5 ? Math.floor(baken.amount * baken.odds) : 0,
          result: (Math.random() > 0.5 ? 'win' : 'lose') as 'win' | 'lose' | 'pending',
        },
        ...(baken.type === '馬連' ? [
          {
            id: 2,
            horseNumbers: [baken.horseNumber, baken.horseNumber + 2],
            odds: baken.odds * 1.2,
            expectedPayout: Math.floor(baken.amount * baken.odds * 1.2),
            actualPayout: Math.random() > 0.7 ? Math.floor(baken.amount * baken.odds * 1.2) : 0,
            result: (Math.random() > 0.7 ? 'win' : 'lose') as 'win' | 'lose' | 'pending',
          }
        ] : [])
      ],
      totalAmount: baken.amount,
      totalPayout: Math.random() > 0.5 ? Math.floor(baken.amount * baken.odds) : 0,
      profit: Math.random() > 0.5 ? Math.floor(baken.amount * baken.odds) - baken.amount : -baken.amount,
    };
    
    setSelectedBaken(detailData);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    if (confirm(t('voting.delete.confirm'))) {
      // TODO: 削除処理を実装
      console.log('Delete baken with id:', id);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBaken(null);
  };

  return (
    <>
      <div className="w-full overflow-x-auto">
        <Table>
          <TableHeader>
              <TableRow>
              <TableHead className="min-w-[200px] text-base font-semibold">{t('voting.item.raceName')}</TableHead>
              <TableHead className="min-w-[100px] text-base font-semibold">{t('voting.item.type')}</TableHead>
              <TableHead className="min-w-[120px] text-base font-semibold">{t('voting.item.amount')}</TableHead>
              <TableHead className="min-w-[80px] text-base font-semibold">{t('voting.item.odds')}</TableHead>
              <TableHead className="min-w-[120px] text-base font-semibold">{t('voting.item.expectedPayout')}</TableHead>
              <TableHead className="min-w-[150px] text-base font-semibold">{t('common.actions')}</TableHead>
              </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((baken) => (
              <TableRow key={baken.id}>
                  <TableCell className="font-medium text-base">{baken.raceName}</TableCell>
                  <TableCell className="text-base">{baken.type}</TableCell>
                  <TableCell className="text-base">¥{baken.amount.toLocaleString()}</TableCell>
                  <TableCell className="text-base">{baken.odds}</TableCell>
                  <TableCell className="font-semibold text-green-600 text-base">
                  ¥{Math.floor(baken.amount * baken.odds).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDetailClick(baken)}
                        className="px-5 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors text-base font-semibold shadow"
                      >
                        {t('voting.detail_button')}
                      </button>
                      <button
                        onClick={() => handleDeleteClick(baken.id)}
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
      
      <BakenDetailModal
        baken={selectedBaken}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
}; 