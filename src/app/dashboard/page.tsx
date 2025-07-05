'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダーセクション */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">ダッシュボード</h1>
              <p className="mt-2 text-gray-600">投票活動の詳細分析と統計情報</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 bg-white text-gray-900 focus:ring-2 focus:ring-lime-500 focus:border-transparent"
              >
                <option value="week">過去1週間</option>
                <option value="month">過去1ヶ月</option>
                <option value="quarter">過去3ヶ月</option>
                <option value="year">過去1年</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 主要指標カード */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-lime-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-lime-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">総投票回数</p>
                <p className="text-2xl font-bold text-gray-900">127</p>
                <p className="text-sm text-green-600">+12% 前月比</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">総投資額</p>
                <p className="text-2xl font-bold text-gray-900">¥45,200</p>
                <p className="text-sm text-green-600">+8% 前月比</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">総回収額</p>
                <p className="text-2xl font-bold text-gray-900">¥52,800</p>
                <p className="text-sm text-green-600">+15% 前月比</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">回収率</p>
                <p className="text-2xl font-bold text-gray-900">116.8%</p>
                <p className="text-sm text-green-600">+3.2% 前月比</p>
              </div>
            </div>
          </div>
        </div>

        {/* グラフセクション */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* 回収率の推移 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">回収率の推移</h3>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">📈</div>
                <p className="text-gray-600">回収率の推移グラフ</p>
                <p className="text-sm text-gray-500">（Chart.js や Recharts で実装予定）</p>
              </div>
            </div>
          </div>

          {/* 券種別の投票分布 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">券種別の投票分布</h3>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">🥧</div>
                <p className="text-gray-600">券種別分布の円グラフ</p>
                <p className="text-sm text-gray-500">（Chart.js や Recharts で実装予定）</p>
              </div>
            </div>
          </div>
        </div>

        {/* 詳細分析セクション */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 人気馬の的中率 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">人気馬の的中率</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">1番人気</span>
                <span className="text-sm font-medium text-gray-900">32.5%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '32.5%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">2番人気</span>
                <span className="text-sm font-medium text-gray-900">28.1%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '28.1%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">3番人気</span>
                <span className="text-sm font-medium text-gray-900">18.7%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '18.7%' }}></div>
              </div>
            </div>
          </div>

          {/* 競馬場別の成績 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">競馬場別の成績</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-lime-50 rounded">
                <div>
                  <div className="font-medium text-gray-900">東京</div>
                  <div className="text-sm text-gray-600">15勝 / 45回</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900">33.3%</div>
                  <div className="text-sm text-green-600">+¥8,200</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                <div>
                  <div className="font-medium text-gray-900">阪神</div>
                  <div className="text-sm text-gray-600">12勝 / 38回</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900">31.6%</div>
                  <div className="text-sm text-green-600">+¥5,800</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded">
                <div>
                  <div className="font-medium text-gray-900">京都</div>
                  <div className="text-sm text-gray-600">8勝 / 25回</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900">32.0%</div>
                  <div className="text-sm text-green-600">+¥3,400</div>
                </div>
              </div>
            </div>
          </div>

          {/* 月別の成績推移 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">月別の成績推移</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">1月</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">¥12,400</span>
                  <span className="text-xs text-green-600">+¥2,400</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">2月</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">¥15,200</span>
                  <span className="text-xs text-green-600">+¥2,800</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">3月</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">¥18,600</span>
                  <span className="text-xs text-green-600">+¥3,400</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">4月</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">¥6,600</span>
                  <span className="text-xs text-red-600">-¥12,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* アクションセクション */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">クイックアクション</h3>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/votings/add"
              className="inline-flex items-center px-4 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              新しい投票を行う
            </Link>
            <Link
              href="/votings"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              投票履歴を確認
            </Link>
            <Link
              href="/races"
              className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              レース一覧を見る
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 