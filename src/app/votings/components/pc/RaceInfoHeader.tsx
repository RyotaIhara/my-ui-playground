'use client';

type RaceInfo = {
  raceNumber: number;
  raceName: string;
  startTime: string;
  weather: string;
  trackCondition: string;
};

type Props = {
  raceInfo: RaceInfo;
};

export const RaceInfoHeader = ({ raceInfo }: Props) => {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-gray-900">
        {raceInfo.raceNumber}R {raceInfo.raceName}
      </h1>
      <p className="text-lg text-gray-600 mt-2">
        {raceInfo.startTime} 発走 | {raceInfo.weather}／{raceInfo.trackCondition}
      </p>
    </div>
  );
}; 