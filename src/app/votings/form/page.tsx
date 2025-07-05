'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

// 買い方の定義
const betTypes = [
  { id: 'normal', name: '通常', description: '単発での投票' },
  { id: 'box', name: 'ボックス', description: '組み合わせでの投票' },
  { id: 'wheel', name: '流し', description: '軸馬を決めての投票' },
];

// 掛け方の定義
const betMethods = {
  normal: [
    { id: 'tansho', name: '単勝', description: '1着を当てる' },
    { id: 'fukusho', name: '複勝', description: '3着以内を当てる' },
    { id: 'umaren', name: '馬連', description: '1着・2着の組み合わせを当てる' },
    { id: 'wide', name: 'ワイド', description: '3着以内の組み合わせを当てる' },
    { id: 'umatan', name: '馬単', description: '1着・2着の着順を当てる' },
    { id: 'sanrenpuku', name: '3連複', description: '1着・2着・3着の組み合わせを当てる' },
    { id: 'sanrentan', name: '3連単', description: '1着・2着・3着の着順を当てる' },
  ],
  box: [
    { id: 'umaren', name: '馬連', description: '1着・2着の組み合わせを当てる' },
    { id: 'wide', name: 'ワイド', description: '3着以内の組み合わせを当てる' },
    { id: 'sanrenpuku', name: '3連複', description: '1着・2着・3着の組み合わせを当てる' },
  ],
  wheel: [
    { id: 'umaren', name: '馬連', description: '1着・2着の組み合わせを当てる' },
    { id: 'wide', name: 'ワイド', description: '3着以内の組み合わせを当てる' },
    { id: 'sanrenpuku', name: '3連複', description: '1着・2着・3着の組み合わせを当てる' },
    { id: 'sanrentan', name: '3連単', description: '1着・2着・3着の着順を当てる' },
  ],
};

// ダミーの馬データ
const horses = [
  { number: 1, name: 'トウカイテイオー' },
  { number: 2, name: 'ディープインパクト' },
  { number: 3, name: 'オグリキャップ' },
  { number: 4, name: 'シンボリルドルフ' },
  { number: 5, name: 'メジロマックイーン' },
  { number: 6, name: 'ナリタブライアン' },
  { number: 7, name: 'サイレンススズカ' },
  { number: 8, name: 'エアグルーヴ' },
  { number: 9, name: 'タイキシャトル' },
  { number: 10, name: 'スペシャルウィーク' },
  { number: 11, name: 'グラスワンダー' },
  { number: 12, name: 'エルコンドルパサー' },
];

type Step = 'betType' | 'betMethod' | 'horseSelection' | 'amount';

export default function VotingFormPage() {
  const searchParams = useSearchParams();
  const targetDate = searchParams.get('targetDate');
  const raceId = searchParams.get('raceId');
  const raceNumber = searchParams.get('raceNumber');

  const [currentStep, setCurrentStep] = useState<Step>('betType');
  const [selectedBetType, setSelectedBetType] = useState<string>('');
  const [selectedBetMethod, setSelectedBetMethod] = useState<string>('');
  const [selectedHorses, setSelectedHorses] = useState<number[]>([]);
  const [amount, setAmount] = useState<number>(100);
  const [isHorseSelectOpen, setIsHorseSelectOpen] = useState(false);
  const horseSelectRef = useRef<HTMLDivElement>(null);

  const handleBetTypeSelect = (betTypeId: string) => {
    setSelectedBetType(betTypeId);
    setSelectedBetMethod('');
    setCurrentStep('betMethod');
  };

  const handleBetMethodSelect = (methodId: string) => {
    setSelectedBetMethod(methodId);
    setSelectedHorses([]);
    setCurrentStep('horseSelection');
  };

  const handleHorseToggle = (horseNumber: number) => {
    setSelectedHorses(prev => 
      prev.includes(horseNumber)
        ? prev.filter(h => h !== horseNumber)
        : [...prev, horseNumber]
    );
  };

  const handleNext = () => {
    if (currentStep === 'horseSelection' && selectedHorses.length > 0) {
      setCurrentStep('amount');
    }
  };

  const handleBack = () => {
    if (currentStep === 'betMethod') {
      setCurrentStep('betType');
      setSelectedBetMethod('');
    } else if (currentStep === 'horseSelection') {
      setCurrentStep('betMethod');
      setSelectedHorses([]);
    } else if (currentStep === 'amount') {
      setCurrentStep('horseSelection');
    }
  };

  const handleSubmit = () => {
    // ここで投票データを送信
    console.log('投票データ:', {
      targetDate,
      raceId,
      raceNumber,
      betType: selectedBetType,
      betMethod: selectedBetMethod,
      horses: selectedHorses,
      amount,
    });
    alert('投票が完了しました！');
  };

  const getSelectedHorsesText = () => {
    if (selectedHorses.length === 0) return '馬を選択してください';
    return selectedHorses.sort((a, b) => a - b).map(h => `${h}番`).join(', ');
  };

  // ドロップダウンの外側をクリックしたときに閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (horseSelectRef.current && !horseSelectRef.current.contains(event.target as Node)) {
        setIsHorseSelectOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* ヘッダー */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">投票フォーム</h1>
        <div className="text-sm text-gray-600">
          {targetDate && `日付: ${targetDate}`} {raceNumber && `レース: ${raceNumber}R`}
        </div>
      </div>

      {/* ステップインジケーター */}
      <div className="flex items-center mb-8">
        {(['betType', 'betMethod', 'horseSelection', 'amount'] as Step[]).map((step, index) => (
          <div key={step} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              currentStep === step 
                ? 'bg-blue-500 text-white' 
                : index < ['betType', 'betMethod', 'horseSelection', 'amount'].indexOf(currentStep)
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-600'
            }`}>
              {index + 1}
            </div>
            {index < 3 && (
              <div className={`w-16 h-1 mx-2 ${
                index < ['betType', 'betMethod', 'horseSelection', 'amount'].indexOf(currentStep)
                  ? 'bg-green-500'
                  : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* ステップ1: 買い方選択 */}
      {currentStep === 'betType' && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">買い方を選択してください</h2>
          <div className="grid gap-4">
            {betTypes.map(betType => (
              <div
                key={betType.id}
                className="border border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleBetTypeSelect(betType.id)}
              >
                <div className="font-semibold text-lg">{betType.name}</div>
                <div className="text-gray-600">{betType.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ステップ2: 掛け方選択 */}
      {currentStep === 'betMethod' && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">掛け方を選択してください</h2>
          <div className="grid gap-4">
            {betMethods[selectedBetType as keyof typeof betMethods]?.map(method => (
              <div
                key={method.id}
                className="border border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleBetMethodSelect(method.id)}
              >
                <div className="font-semibold text-lg">{method.name}</div>
                <div className="text-gray-600">{method.description}</div>
              </div>
            ))}
          </div>
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            戻る
          </button>
        </div>
      )}

      {/* ステップ3: 馬選択 */}
      {currentStep === 'horseSelection' && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">馬を選択してください</h2>
          
          {/* 馬選択セレクトボックス */}
          <div className="relative" ref={horseSelectRef}>
            <div
              className="border border-gray-300 rounded-lg p-3 cursor-pointer bg-white"
              onClick={() => setIsHorseSelectOpen(!isHorseSelectOpen)}
            >
              <div className="flex justify-between items-center">
                <span className={selectedHorses.length > 0 ? 'text-gray-800' : 'text-gray-500'}>
                  {getSelectedHorsesText()}
                </span>
                <span className="text-gray-400">▼</span>
              </div>
            </div>

            {/* 馬選択ドロップダウン */}
            {isHorseSelectOpen && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto z-10">
                {horses.map(horse => (
                  <div
                    key={horse.number}
                    className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                    onClick={() => handleHorseToggle(horse.number)}
                  >
                    <input
                      type="checkbox"
                      checked={selectedHorses.includes(horse.number)}
                      onChange={() => {}}
                      className="mr-3"
                    />
                    <span className="font-semibold mr-2">{horse.number}番</span>
                    <span className="text-gray-600">{horse.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 選択された馬の表示 */}
          {selectedHorses.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">選択された馬:</h3>
              <div className="flex flex-wrap gap-2">
                {selectedHorses.sort((a, b) => a - b).map(horseNumber => (
                  <span
                    key={horseNumber}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {horseNumber}番
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={handleBack}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            >
              戻る
            </button>
            <button
              onClick={handleNext}
              disabled={selectedHorses.length === 0}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              次へ
            </button>
          </div>
        </div>
      )}

      {/* ステップ4: 金額設定 */}
      {currentStep === 'amount' && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">購入金額を設定してください</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                購入金額 (円)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                min="100"
                step="100"
                className="w-full border border-gray-300 rounded-lg p-3"
              />
            </div>

            {/* 投票内容の確認 */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold mb-2">投票内容の確認</h3>
              <div className="space-y-1 text-sm">
                <div>買い方: {betTypes.find(b => b.id === selectedBetType)?.name}</div>
                <div>掛け方: {betMethods[selectedBetType as keyof typeof betMethods]?.find(m => m.id === selectedBetMethod)?.name}</div>
                <div>選択馬: {getSelectedHorsesText()}</div>
                <div>購入金額: {amount.toLocaleString()}円</div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleBack}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            >
              戻る
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              投票する
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 