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
import { useRouter } from "next/navigation";

type Race = {
  id: number;
  raceNumber: number;
  startTime: string;
  raceName: string;
  weather: string;
  trackCondition: string;
};

type Props = {
  data: Race[];
};

export const RaceTable = ({ data }: Props) => {
  const { t, loading } = useTranslation();
  const router = useRouter();

  if (loading) {
    return;
  }

  const handleDetailClick = (raceId: number) => {
    router.push(`/races/show/${raceId}`);
  };

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-blue-100">
            <TableHead className="min-w-[100px] text-base font-semibold">{t('races.item.raceNumber') || 'レース番号'}</TableHead>
            <TableHead className="min-w-[120px] text-base font-semibold">{t('races.item.startTime') || '発走時刻'}</TableHead>
            <TableHead className="min-w-[200px] text-base font-semibold">{t('races.item.raceName') || 'レース名'}</TableHead>
            <TableHead className="min-w-[150px] text-base font-semibold">{t('races.item.weather') || '天候／馬場'}</TableHead>
            <TableHead className="min-w-[120px] text-base font-semibold">{t('common.actions') || '操作'}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((race) => (
            <TableRow key={race.id}>
              <TableCell className="font-medium text-base">{race.raceNumber}R</TableCell>
              <TableCell className="text-base">{race.startTime}</TableCell>
              <TableCell className="font-medium text-base">{race.raceName}</TableCell>
              <TableCell className="text-base">{race.weather}／{race.trackCondition}</TableCell>
              <TableCell>
                <button
                  onClick={() => handleDetailClick(race.id)}
                  className="px-5 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors text-base font-semibold shadow"
                >
                  {t('races.detail_button') || '詳細'}
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}; 