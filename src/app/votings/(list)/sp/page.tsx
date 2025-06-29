import { BakenTable } from "@/app/votings/components/sp/BakenTable";

const dummyData = [
  {
    id: 1,
    raceName: "東京11R 日本ダービー",
    horseNumber: 5,
    type: "単勝",
    amount: 1000,
    odds: 4.2,
  },
  {
    id: 2,
    raceName: "京都10R",
    horseNumber: 7,
    type: "馬連",
    amount: 1500,
    odds: 8.5,
  },
];

export default function BakenPageSP() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4 text-gray-900">投票一覧</h1>
      <BakenTable data={dummyData} />
    </div>
  );
} 