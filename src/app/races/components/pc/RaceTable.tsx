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

  const handleVotingClick = (raceId: number) => {
    router.push(`/votings/add/${raceId}`);
  };

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-blue-100">
            <TableHead className="min-w-[100px] text-base font-semibold">{t('races.item.raceNumber')}</TableHead>
            <TableHead className="min-w-[120px] text-base font-semibold">{t('races.item.startTime')}</TableHead>
            <TableHead className="min-w-[200px] text-base font-semibold">{t('races.item.raceName')}</TableHead>
            <TableHead className="min-w-[150px] text-base font-semibold">{t('races.item.weather')}</TableHead>
            <TableHead className="min-w-[200px] text-base font-semibold">{t('common.actions')}</TableHead>
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
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDetailClick(race.id)}
                    className="px-5 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors text-base font-semibold shadow"
                  >
                    {t('races.detail_button')}
                  </button>
                  <button
                    onClick={() => handleVotingClick(race.id)}
                    className="px-5 py-2 bg-yellow-400 text-white rounded-full hover:bg-yellow-500 transition-colors text-base font-semibold shadow"
                  >
                    {t('voting.add_button')}
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}; 