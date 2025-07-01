'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/ui/table";
import { useTranslation } from "@/lib/i18n/hooks";
import { HorseSelectionInput } from "./HorseSelectionInput";

type Horse = {
  id: number;
  gateNumber: number;
  horseNumber: number;
  horseName: string;
  odds: number;
  popularity: number;
};

type Props = {
  data: Horse[];
  selectedHorses: number[];
  onHorseSelection: (horseId: number) => void;
  betType?: string;
  betMethod?: string;
};

export const VotingAddTable = ({ 
  data, 
  selectedHorses, 
  onHorseSelection,
  betType = 'tansho',
  betMethod = 'normal'
}: Props) => {
  const { t, loading } = useTranslation();

  if (loading) {
    return;
  }

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-blue-100">
            <TableHead className="min-w-[60px] text-base font-semibold">{t('voting.add.gateNumber')}</TableHead>
            <TableHead className="min-w-[60px] text-base font-semibold">{t('voting.add.horseNumber')}</TableHead>
            <TableHead className="min-w-[60px] text-base font-semibold">{t('voting.add.mark')}</TableHead>
            <TableHead className="min-w-[200px] text-base font-semibold">{t('voting.add.horseName')}</TableHead>
            <TableHead className="min-w-[100px] text-base font-semibold">{t('voting.add.selection')}</TableHead>
            <TableHead className="min-w-[100px] text-base font-semibold">{t('voting.add.odds')}</TableHead>
            <TableHead className="min-w-[80px] text-base font-semibold">{t('voting.add.popularity')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((horse) => (
            <TableRow key={horse.id}>
              <TableCell className="font-medium text-base">{horse.gateNumber}</TableCell>
              <TableCell className="font-medium text-base">{horse.horseNumber}</TableCell>
              <TableCell className="text-base">◎</TableCell>
              <TableCell className="font-medium text-base">{horse.horseName}</TableCell>
              <TableCell>
                <HorseSelectionInput
                  horseId={horse.id}
                  isSelected={selectedHorses.includes(horse.id)}
                  onSelectionChange={onHorseSelection}
                  betType={betType}
                  betMethod={betMethod}
                />
              </TableCell>
              <TableCell className="text-base">{horse.odds}</TableCell>
              <TableCell className="text-base">{horse.popularity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}; 