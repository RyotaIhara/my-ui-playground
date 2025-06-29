// components/BakenTable.tsx
import {
Table,
TableBody,
TableCell,
TableHead,
TableHeader,
TableRow,
} from "@/shadcn/ui/table";

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
  return (
    <Table>
      <TableHeader>
          <TableRow>
          <TableHead>レース名</TableHead>
          <TableHead>馬番</TableHead>
          <TableHead>券種</TableHead>
          <TableHead>購入金額</TableHead>
          <TableHead>オッズ</TableHead>
          <TableHead>期待配当</TableHead>
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
