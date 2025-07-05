'use client';

import { useState } from 'react';
import Link from 'next/link';
import { GoalModal } from './components/GoalModal';

interface Goal {
  id: string;
  title: string;
  description: string;
  category: 'recovery_rate' | 'win_rate' | 'profit' | 'custom';
  target: string;
  current: string;
  progress: number;
  status: 'active' | 'completed' | 'failed';
  deadline: string;
  createdAt: string;
}

export default function MyPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'goals' | 'settings'>('profile');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [goals, setGoals] = useState<Goal[]>([]);

  // モックデータ
  const mockGoals: Goal[] = [
    {
      id: '1',
      title: '単複購入で回収率100%を超える',
      description: '単勝・複勝の投票で回収率を100%以上に維持する',
      category: 'recovery_rate',
      target: '100%',
      current: '116.8%',
      progress: 100,
      status: 'completed',
      deadline: '2024-12-31',
      createdAt: '2024-01-01'
    },
    {
      id: '2',
      title: '月間利益を10万円以上にする',
      description: '1ヶ月で10万円以上の利益を上げる',
      category: 'profit',
      target: '¥100,000',
      current: '¥7,600',
      progress: 76,
      status: 'active',
      deadline: '2024-12-31',
      createdAt: '2024-01-01'
    },
    {
      id: '3',
      title: '的中率を30%以上に向上',
      description: '全投票の的中率を30%以上に向上させる',
      category: 'win_rate',
      target: '30%',
      current: '25.2%',
      progress: 84,
      status: 'active',
      deadline: '2024-12-31',
      createdAt: '2024-01-01'
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'recovery_rate': return '📊';
      case 'win_rate': return '🎯';
      case 'profit': return '💰';
      case 'custom': return '🎨';
      default: return '📝';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return '達成済み';
      case 'active': return '進行中';
      case 'failed': return '未達成';
      default: return '不明';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダーセクション */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">マイページ</h1>
          <p className="mt-2 text-gray-600">プロフィール管理と目標設定</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* タブナビゲーション */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'profile'
                    ? 'border-lime-500 text-lime-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                プロフィール
              </button>
              <button
                onClick={() => setActiveTab('goals')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'goals'
                    ? 'border-lime-500 text-lime-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                目標管理
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'settings'
                    ? 'border-lime-500 text-lime-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                設定
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* プロフィールタブ */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">プロフィール情報</h2>
                  <button
                    onClick={() => setIsEditingProfile(!isEditingProfile)}
                    className="inline-flex items-center px-4 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700 transition-colors"
                  >
                    {isEditingProfile ? '保存' : '編集'}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ユーザー名
                    </label>
                    <input
                      type="text"
                      defaultValue="競馬ファン太郎"
                      disabled={!isEditingProfile}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      メールアドレス
                    </label>
                    <input
                      type="email"
                      defaultValue="user@example.com"
                      disabled={!isEditingProfile}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent disabled:bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      登録日
                    </label>
                    <input
                      type="text"
                      defaultValue="2024年1月1日"
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      最終ログイン
                    </label>
                    <input
                      type="text"
                      defaultValue="2024年12月19日 14:30"
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>
                </div>

                {/* 統計サマリー */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">活動統計</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-lime-600">127</div>
                      <div className="text-sm text-gray-600">総投票回数</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">32</div>
                      <div className="text-sm text-gray-600">的中回数</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">25.2%</div>
                      <div className="text-sm text-gray-600">的中率</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">116.8%</div>
                      <div className="text-sm text-gray-600">回収率</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 目標管理タブ */}
            {activeTab === 'goals' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">目標管理</h2>
                  <button
                    onClick={() => setIsAddingGoal(true)}
                    className="inline-flex items-center px-4 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    新しい目標を追加
                  </button>
                </div>

                {/* 目標一覧 */}
                <div className="space-y-4">
                  {mockGoals.map((goal) => (
                    <div key={goal.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="text-2xl">{getCategoryIcon(goal.category)}</div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">{goal.title}</h3>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(goal.status)}`}>
                                {getStatusText(goal.status)}
                              </span>
                            </div>
                            <p className="text-gray-600 mb-3">{goal.description}</p>
                            
                            {/* 進捗バー */}
                            <div className="mb-3">
                              <div className="flex justify-between text-sm text-gray-600 mb-1">
                                <span>進捗: {goal.current} / {goal.target}</span>
                                <span>{goal.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    goal.status === 'completed' ? 'bg-green-500' : 
                                    goal.progress >= 80 ? 'bg-lime-500' : 
                                    goal.progress >= 50 ? 'bg-yellow-500' : 'bg-blue-500'
                                  }`}
                                  style={{ width: `${Math.min(goal.progress, 100)}%` }}
                                ></div>
                              </div>
                            </div>

                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>期限: {goal.deadline}</span>
                              <span>作成日: {goal.createdAt}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 目標達成のヒント */}
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">🎯 目標達成のヒント</h3>
                  <div className="space-y-2 text-sm text-blue-800">
                    <p>• 回収率を上げるには、オッズの高い馬を狙うよりも、的中率を重視しましょう</p>
                    <p>• 月間利益目標には、1日あたりの投資上限を設定することをお勧めします</p>
                    <p>• 的中率向上には、過去の投票データを分析して傾向を把握しましょう</p>
                  </div>
                </div>
              </div>
            )}

            {/* 設定タブ */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">アカウント設定</h2>
                
                {/* パスワード変更 */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">パスワード変更</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        現在のパスワード
                      </label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        新しいパスワード
                      </label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        新しいパスワード（確認）
                      </label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                      />
                    </div>
                    <button className="inline-flex items-center px-4 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700 transition-colors">
                      パスワードを変更
                    </button>
                  </div>
                </div>

                {/* 通知設定 */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">通知設定</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">目標達成通知</p>
                        <p className="text-sm text-gray-600">目標を達成した際にメールで通知を受け取る</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-lime-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-lime-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">レース結果通知</p>
                        <p className="text-sm text-gray-600">投票したレースの結果をメールで通知</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-lime-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-lime-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* データエクスポート */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">データ管理</h3>
                  <div className="space-y-4">
                    <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      投票データをエクスポート
                    </button>
                    <button className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      アカウントを削除
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 