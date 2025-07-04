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

type Horse = {
  id: number;
  gateNumber: number;
  horseNumber: number;
  horseName: string;
  sexAge: string;
  weight: number;
  jockey: string;
  horseWeight: number;
  weightChange: string;
};

type Props = {
  data: Horse[];
};

export const RaceDetailTable = ({ data }: Props) => {
  const { t, loading } = useTranslation();

  if (loading) {
    return;
  }

  const getWeightChangeColor = (weightChange: string) => {
    if (weightChange.startsWith('+')) {
      return 'text-red-600';
    } else if (weightChange.startsWith('-')) {
      return 'text-blue-600';
    }
    return 'text-gray-600';
  };

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-blue-100">
            <TableHead className="min-w-[80px] text-base font-semibold">{t('races.detail.gateNumber')}</TableHead>
            <TableHead className="min-w-[80px] text-base font-semibold">{t('races.detail.horseNumber')}</TableHead>
            <TableHead className="min-w-[200px] text-base font-semibold">{t('races.detail.horseName')}</TableHead>
            <TableHead className="min-w-[100px] text-base font-semibold">{t('races.detail.sexAge')}</TableHead>
            <TableHead className="min-w-[120px] text-base font-semibold">{t('races.detail.weight')}</TableHead>
            <TableHead className="min-w-[120px] text-base font-semibold">{t('races.detail.jockey')}</TableHead>
            <TableHead className="min-w-[100px] text-base font-semibold">{t('races.detail.horseWeight')}</TableHead>
            <TableHead className="min-w-[100px] text-base font-semibold">{t('races.detail.weightChange')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((horse) => (
            <TableRow key={horse.id}>
              <TableCell className="font-medium text-base">{horse.gateNumber}</TableCell>
              <TableCell className="font-medium text-base">{horse.horseNumber}</TableCell>
              <TableCell className="font-medium text-base">{horse.horseName}</TableCell>
              <TableCell className="text-base">{horse.sexAge}</TableCell>
              <TableCell className="text-base">{horse.weight}kg</TableCell>
              <TableCell className="text-base">{horse.jockey}</TableCell>
              <TableCell className="text-base">{horse.horseWeight}kg</TableCell>
              <TableCell className={`text-base font-semibold ${getWeightChangeColor(horse.weightChange)}`}>
                {horse.weightChange}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}; 