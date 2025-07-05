import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type RaceTrack = 'tokyo' | 'kyoto' | 'hanshin';

// 6月〜8月の土日ダミーデータ（20日分）
const dates = [
  { date: "6月1日", day: "土" }, { date: "6月2日", day: "日" },
  { date: "6月8日", day: "土" }, { date: "6月9日", day: "日" },
  { date: "6月15日", day: "土" }, { date: "6月16日", day: "日" },
  { date: "6月22日", day: "土" }, { date: "6月23日", day: "日" },
  { date: "6月29日", day: "土" }, { date: "6月30日", day: "日" },
  { date: "7月6日", day: "土" }, { date: "7月7日", day: "日" },
  { date: "7月13日", day: "土" }, { date: "7月14日", day: "日" },
  { date: "7月20日", day: "土" }, { date: "7月21日", day: "日" },
  { date: "7月27日", day: "土" }, { date: "7月28日", day: "日" },
  { date: "8月3日", day: "土" }, { date: "8月4日", day: "日" },
];

const raceNumbers = [1,2,3,4,5,6,7,8,9,10,11,12];

export function VotingRaceHeader({
  visibleCount = 5,
  onDateClick,
  initialSelectedIndex = 0,
}: {
  visibleCount?: number;
  onDateClick?: (index: number) => void;
  initialSelectedIndex?: number;
} = {}) {
  const router = useRouter();
  const [activeTrack, setActiveTrack] = useState<RaceTrack>('tokyo');
  const [selectedRaceNumber, setSelectedRaceNumber] = useState(1);
  const [centerIndex, setCenterIndex] = useState(initialSelectedIndex);

  // 最大5つまで中央に収める
  const half = Math.floor(visibleCount / 2);
  const start = Math.max(0, Math.min(dates.length - visibleCount, centerIndex - half));
  const visibleDates = dates.slice(start, start + visibleCount);

  // 左右端の制御
  const canLeft = start > 0;
  const canRight = start + visibleCount < dates.length;

  // MOC: 真ん中の日付が変わるたびにAPI呼び出し想定
  useEffect(() => {
    const centerDate = dates[centerIndex];
    // 本来はここでAPI呼び出し
    console.log('API呼び出し: ', centerDate);
  }, [centerIndex]);

  // 日付クリック時
  const handleDateClick = (idx: number) => {
    setCenterIndex(idx);
    if (onDateClick) onDateClick(idx);
  };

  // 反映ボタン押下時の遷移
  const handleReflect = () => {
    // 将来的にはここでAPI検索し、ID取得して遷移
    router.push("/votings/add/1");
  };

  return (
    <div className="mb-6 flex flex-col items-center w-full">
      {/* 投票レースの変更ラベル（中央寄せ） */}
      <div className="mb-2 w-full flex justify-center">
        <span className="text-base font-semibold text-gray-700">投票レースの変更</span>
      </div>
      {/* 日付カルーセル（最大5つ中央寄せ） */}
      <div className="w-full flex justify-center mb-4">
        <div className="inline-flex items-center">
          {/* 左ボタン */}
          <button
            className={`flex-shrink-0 w-10 h-10 flex items-center justify-center text-xl rounded-full border border-gray-300 mx-2 transition-colors
              ${canLeft ? 'bg-white hover:bg-gray-100 text-gray-700' : 'bg-gray-100 text-gray-300 cursor-not-allowed'}`}
            onClick={() => setCenterIndex(i => Math.max(0, i - 1))}
            disabled={!canLeft}
            aria-label="左へ"
          >&#60;</button>
          {/* 日付カード部分 */}
          <div className={`flex items-center gap-2 ${visibleDates.length < 5 ? 'justify-center' : ''}`}>
            {visibleDates.map((d, idx) => {
              const realIdx = start + idx;
              const isSelected = realIdx === centerIndex;
              return (
                <button
                  key={d.date + d.day}
                  className={`flex-shrink-0 px-4 py-2 border rounded text-center min-w-[90px] text-base font-bold transition outline-none
                    ${isSelected ? "bg-yellow-100 border-yellow-400 scale-110 shadow text-yellow-700" : "bg-white text-gray-700 hover:bg-gray-50"}
                  `}
                  onClick={() => handleDateClick(realIdx)}
                  tabIndex={0}
                >
                  {d.date}
                  <span className={d.day === "土" ? "text-blue-500" : "text-red-500"}>
                    （{d.day}）
                  </span>
                </button>
              );
            })}
          </div>
          {/* 右ボタン */}
          <button
            className={`flex-shrink-0 w-10 h-10 flex items-center justify-center text-xl rounded-full border border-gray-300 mx-2 transition-colors
              ${canRight ? 'bg-white hover:bg-gray-100 text-gray-700' : 'bg-gray-100 text-gray-300 cursor-not-allowed'}`}
            onClick={() => setCenterIndex(i => Math.min(dates.length - 1, i + 1))}
            disabled={!canRight}
            aria-label="右へ"
          >&#62;</button>
        </div>
      </div>
      {/* 下部：レース会場・レース番号セレクト・反映ボタン（中央寄せ） */}
      <div className="flex items-center mb-4 justify-center w-full">
        <select
          className="border border-gray-300 rounded px-3 py-2 text-base mr-2"
          value={activeTrack}
          onChange={e => setActiveTrack(e.target.value as RaceTrack)}
        >
          <option value="tokyo">東京</option>
          <option value="kyoto">京都</option>
          <option value="hanshin">阪神</option>
        </select>
        <select
          className="border border-gray-300 rounded px-3 py-2 text-base mr-2"
          value={selectedRaceNumber}
          onChange={e => setSelectedRaceNumber(Number(e.target.value))}
        >
          {raceNumbers.map(num => (
            <option key={num} value={num}>{num}R</option>
          ))}
        </select>
        <button
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-base font-semibold shadow"
          onClick={handleReflect}
        >
          反映
        </button>
      </div>
    </div>
  );
} 