'use client';

import DateSelector from "@/app/common/components/DateSelector";
import Link from "next/link";

const dummyVenues = [
  {
    name: "福島 3日目",
    weather: "晴",
    turf: "良",
    dirt: "良",
    races: [
      { number: 1, name: "3歳以上障害OP", time: "10:10", distance: "2750m", horses: 10 },
      { number: 2, name: "3歳未勝利", time: "10:45", distance: "1700m", horses: 15 },
      { number: 3, name: "2歳未勝利", time: "11:15", distance: "1800m", horses: 9 },
      { number: 4, name: "2歳新馬", time: "11:45", distance: "1200m", horses: 9 },
    ]
  },
  {
    name: "小倉 3日目",
    weather: "晴",
    turf: "良",
    dirt: "良",
    races: [
      { number: 1, name: "2歳未勝利", time: "10:01", distance: "1800m", horses: 5 },
      { number: 2, name: "3歳未勝利", time: "10:35", distance: "1700m", horses: 16 },
      { number: 3, name: "2歳新馬", time: "11:05", distance: "1200m", horses: 7 },
    ]
  },
  {
    name: "函館 7日目",
    weather: "晴",
    turf: "稍重",
    dirt: "重",
    races: [
      { number: 1, name: "2歳未勝利", time: "09:50", distance: "1200m", horses: 8 },
      { number: 2, name: "3歳未勝利", time: "10:25", distance: "1000m", horses: 12 },
      { number: 3, name: "3歳未勝利", time: "10:55", distance: "2000m", horses: 13 },
    ]
  },
];

export default function RacesDefaultPC() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <DateSelector />
      <div className="flex gap-4 mt-6">
        {dummyVenues.map(venue => (
          <div key={venue.name} className="flex-1 bg-gray-50 rounded-lg shadow p-4">
            <div className="font-bold mb-2">{venue.name}</div>
            <div className="text-sm mb-2">天気: {venue.weather} / 芝: {venue.turf} / ダ: {venue.dirt}</div>
            <div className="space-y-2">
              {venue.races.map(race => (
                <Link 
                  key={race.number} 
                  href="/races?targetDate=20250812"
                  className="block bg-white border rounded p-2 flex items-center hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <span className="bg-red-500 text-white font-bold rounded px-2 py-1 mr-2">{race.number}R</span>
                  <span className="font-semibold mr-2">{race.name}</span>
                  <span className="text-xs text-gray-500">{race.time} {race.distance} {race.horses}頭</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 