"use client";
import { useState } from "react";

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

type DateSelectorProps = {
    onDateClick?: (index: number) => void;
    initialSelectedIndex?: number;
    visibleCount?: number;
};

export default function DateSelector({
    onDateClick,
    initialSelectedIndex = 0,
    visibleCount = 4,
}: DateSelectorProps) {
  const [centerIndex, setCenterIndex] = useState(initialSelectedIndex);
  const [start, setStart] = useState(() => Math.max(0, initialSelectedIndex - Math.floor(visibleCount / 2)));

  const canLeft = centerIndex > 0;
  const canRight = centerIndex < dates.length - 1;
  const visibleDates = dates.slice(start, start + visibleCount);

  // 日付クリック時
  const handleDateClick = (idx: number) => {
    setCenterIndex(idx);
    if (onDateClick) onDateClick(idx);
    // スクロール位置も調整
    if (idx < start) {
      setStart(idx);
    } else if (idx >= start + visibleCount) {
      setStart(idx - visibleCount + 1);
    }
  };

  // 左右ボタン
  const handleLeft = () => {
    if (centerIndex > 0) {
      const newCenter = centerIndex - 1;
      setCenterIndex(newCenter);
      if (newCenter < start + 1 && start > 0) {
        setStart(start - 1);
      }
      if (onDateClick) onDateClick(newCenter);
    }
  };
  const handleRight = () => {
    if (centerIndex < dates.length - 1) {
      const newCenter = centerIndex + 1;
      setCenterIndex(newCenter);
      if (newCenter > start + visibleCount - 2 && start + visibleCount < dates.length) {
        setStart(start + 1);
      }
      if (onDateClick) onDateClick(newCenter);
    }
  };

  return (
    <div className="flex justify-center items-center gap-2">
      <button
        className={`flex-shrink-0 w-10 h-10 flex items-center justify-center text-xl rounded-full border border-gray-300 mx-2 transition-colors
          ${canLeft ? 'bg-white hover:bg-gray-100 text-gray-700' : 'bg-gray-100 text-gray-300 cursor-not-allowed'}`}
        onClick={handleLeft}
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
        onClick={handleRight}
        disabled={!canRight}
        aria-label="右へ"
      >&#62;</button>
    </div>
  );
} 