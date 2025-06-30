'use client';

type RaceTrack = 'tokyo' | 'kyoto' | 'hanshin';

type Props = {
  activeTrack: RaceTrack;
  onTrackChange: (track: RaceTrack) => void;
};

const trackNames = {
  tokyo: '東京',
  kyoto: '京都',
  hanshin: '阪神',
};

export const RaceTrackTabs = ({ activeTrack, onTrackChange }: Props) => {
  return (
    <div className="mb-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {Object.entries(trackNames).map(([key, name]) => (
            <button
              key={key}
              onClick={() => onTrackChange(key as RaceTrack)}
              className={`py-3 px-2 border-b-2 font-medium text-base ${
                activeTrack === key
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {name}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}; 