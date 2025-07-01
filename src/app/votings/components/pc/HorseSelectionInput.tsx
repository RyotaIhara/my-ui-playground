'use client';

type Props = {
  horseId: number;
  isSelected: boolean;
  onSelectionChange: (horseId: number) => void;
  betType?: string;
  betMethod?: string;
};

export const HorseSelectionInput = ({ 
  horseId, 
  isSelected, 
  onSelectionChange,
  betType = 'tansho',
  betMethod = 'normal'
}: Props) => {
  // 現在はチェックボックスを表示
  // 将来的に券種や方式に応じて異なるUIに変更可能
  return (
    <input
      type="checkbox"
      checked={isSelected}
      onChange={() => onSelectionChange(horseId)}
      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
    />
  );
}; 