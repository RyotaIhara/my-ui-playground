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

  if (loading) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Loading...</TableHead>
            <TableHead>Loading...</TableHead>
            <TableHead>Loading...</TableHead>
            <TableHead>Loading...</TableHead>
            <TableHead>Loading...</TableHead>
            <TableHead>Loading...</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Loading...</TableCell>
            <TableCell>Loading...</TableCell>
            <TableCell>Loading...</TableCell>
            <TableCell>Loading...</TableCell>
            <TableCell>Loading...</TableCell>
            <TableCell>Loading...</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
            <TableRow>
            <TableHead className="min-w-[200px]">{t('voting.list.table.raceName')}</TableHead>
            <TableHead className="min-w-[80px]">{t('voting.list.table.horseNumber')}</TableHead>
            <TableHead className="min-w-[100px]">{t('voting.list.table.type')}</TableHead>
            <TableHead className="min-w-[120px]">{t('voting.list.table.amount')}</TableHead>
            <TableHead className="min-w-[80px]">{t('voting.list.table.odds')}</TableHead>
            <TableHead className="min-w-[120px]">{t('voting.list.table.expectedPayout')}</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((baken) => (
            <TableRow key={baken.id}>
                <TableCell className="font-medium">{baken.raceName}</TableCell>
                <TableCell>{baken.horseNumber}</TableCell>
                <TableCell>{baken.type}</TableCell>
                <TableCell>¥{baken.amount.toLocaleString()}</TableCell>
                <TableCell>{baken.odds}</TableCell>
                <TableCell className="font-semibold text-green-600">
                ¥{Math.floor(baken.amount * baken.odds).toLocaleString()}
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}; 