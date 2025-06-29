// components/BakenTable.tsx
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
  return (
    <Table>
      <TableHeader>
          <TableRow>
          <TableHead>{t('voting.list.table.raceName')}</TableHead>
          <TableHead>{t('voting.list.table.horseNumber')}</TableHead>
          <TableHead>{t('voting.list.table.type')}</TableHead>
          <TableHead>{t('voting.list.table.amount')}</TableHead>
          <TableHead>{t('voting.list.table.odds')}</TableHead>
          <TableHead>{t('voting.list.table.expectedPayout')}</TableHead>
          </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((baken) => (
          <TableRow key={baken.id}>
              <TableCell>{baken.raceName}</TableCell>
              <TableCell>{baken.horseNumber}</TableCell>
              <TableCell>{baken.type}</TableCell>
              <TableCell>¥{baken.amount.toLocaleString()}</TableCell>
              <TableCell>{baken.odds}</TableCell>
              <TableCell>
              ¥{Math.floor(baken.amount * baken.odds).toLocaleString()}
              </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
