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

type Props = {
data: Baken[];
};

export const BakenTable = ({ data }: Props) => {
  const { t, loading } = useTranslation();
  const [selectedBaken, setSelectedBaken] = useState<Baken | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) {
    return;
  }

  const handleDetailClick = (baken: Baken) => {
    setSelectedBaken(baken);
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
              <TableHead className="min-w-[200px] text-base font-semibold">{t('voting.list.table.raceName')}</TableHead>
              <TableHead className="min-w-[80px] text-base font-semibold">{t('voting.list.table.horseNumber')}</TableHead>
              <TableHead className="min-w-[100px] text-base font-semibold">{t('voting.list.table.type')}</TableHead>
              <TableHead className="min-w-[120px] text-base font-semibold">{t('voting.list.table.amount')}</TableHead>
              <TableHead className="min-w-[80px] text-base font-semibold">{t('voting.list.table.odds')}</TableHead>
              <TableHead className="min-w-[120px] text-base font-semibold">{t('voting.list.table.expectedPayout')}</TableHead>
              <TableHead className="min-w-[150px] text-base font-semibold">{t('voting.list.table.actions')}</TableHead>
              </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((baken) => (
              <TableRow key={baken.id}>
                  <TableCell className="font-medium text-base">{baken.raceName}</TableCell>
                  <TableCell className="text-base">{baken.horseNumber}</TableCell>
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
                        {t('voting.detail.button')}
                      </button>
                      <button
                        onClick={() => handleDeleteClick(baken.id)}
                        className="px-5 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors text-base font-semibold shadow"
                      >
                        {t('voting.delete.button')}
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