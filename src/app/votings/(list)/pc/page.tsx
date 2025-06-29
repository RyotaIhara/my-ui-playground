import { BakenTable } from "@/app/votings/components/pc/BakenTable";

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

export default function BakenPagePC() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">投票一覧</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <BakenTable data={dummyData} />
      </div>
    </div>
  );
} 