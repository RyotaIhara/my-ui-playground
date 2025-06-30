// components/VotingTable.tsx
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
    return;
  }

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
        {data.map((voting) => (
          <TableRow key={voting.id}>
              <TableCell>{voting.raceName}</TableCell>
              <TableCell>{voting.horseNumber}</TableCell>
              <TableCell>{voting.type}</TableCell>
              <TableCell>¥{voting.amount.toLocaleString()}</TableCell>
              <TableCell>{voting.odds}</TableCell>
              <TableCell>
              ¥{Math.floor(voting.amount * voting.odds).toLocaleString()}
              </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
