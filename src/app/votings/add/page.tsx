'use client';

import { VotingRaceHeader } from "../components/pc/VotingRaceHeader";

export default function VotingAddPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <VotingRaceHeader visibleCount={5} />
      <div className="flex justify-center mt-8">
        <span className="text-lg text-gray-700 font-semibold">投票レースを選択してください</span>
      </div>
    </div>
  );
} 