import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/hooks";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 to-green-50">
      {/* ヒーローセクション */}
      <section className="relative overflow-hidden bg-gradient-to-r from-lime-600 to-green-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              馬券購入シミュレーター
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-lime-100">
              レース結果をシミュレートして、馬券投資の戦略を磨こう
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/votings/add"
                className="bg-white text-lime-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-lime-50 transition-colors shadow-lg"
              >
                投票を始める
              </Link>
              <Link
                href="/races"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-lime-600 transition-colors"
              >
                レース一覧を見る
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 機能紹介セクション */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            主要機能
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-lime-50">
              <div className="w-16 h-16 bg-lime-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">投票シミュレーション</h3>
              <p className="text-gray-600">実際のレース結果を使って、馬券投資の結果をシミュレートできます</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-green-50">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">詳細分析</h3>
              <p className="text-gray-600">投票履歴や回収率など、詳細な分析データを確認できます</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-emerald-50">
              <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">リアルタイム結果</h3>
              <p className="text-gray-600">実際のレース結果に基づいて、リアルタイムで結果を確認できます</p>
            </div>
          </div>
        </div>
      </section>

      {/* 統計サマリーセクション */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            活動サマリー
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-3xl font-bold text-lime-600 mb-2">127</div>
              <div className="text-gray-600">総投票回数</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">¥45,200</div>
              <div className="text-gray-600">総投資額</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">¥52,800</div>
              <div className="text-gray-600">総回収額</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">116.8%</div>
              <div className="text-gray-600">回収率</div>
            </div>
          </div>
        </div>
      </section>

      {/* クイックアクションセクション */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            クイックアクション
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/votings/add"
              className="group bg-gradient-to-r from-lime-500 to-green-500 p-6 rounded-lg text-white text-center hover:from-lime-600 hover:to-green-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">投票を行う</h3>
              <p className="text-lime-100">新しい投票を開始</p>
            </Link>
            <Link
              href="/votings"
              className="group bg-gradient-to-r from-blue-500 to-indigo-500 p-6 rounded-lg text-white text-center hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-2">投票履歴</h3>
              <p className="text-blue-100">過去の投票を確認</p>
            </Link>
            <Link
              href="/races"
              className="group bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-lg text-white text-center hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <div className="text-4xl mb-4">🏇</div>
              <h3 className="text-xl font-semibold mb-2">レース一覧</h3>
              <p className="text-purple-100">レース情報を確認</p>
            </Link>
            <Link
              href="/dashboard"
              className="group bg-gradient-to-r from-orange-500 to-red-500 p-6 rounded-lg text-white text-center hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-semibold mb-2">ダッシュボード</h3>
              <p className="text-orange-100">詳細分析を見る</p>
            </Link>
          </div>
        </div>
      </section>

      {/* 最近の活動セクション */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            最近の活動
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">最新の投票</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-lime-50 rounded">
                  <div>
                    <div className="font-medium text-gray-900">東京11R 3歳以上1勝クラス</div>
                    <div className="text-sm text-gray-600">単勝 3番</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-900">¥1,000</div>
                    <div className="text-sm text-green-600">+¥2,400</div>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <div className="font-medium text-gray-900">阪神10R 3歳以上2勝クラス</div>
                    <div className="text-sm text-gray-600">馬連 3-7</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-900">¥500</div>
                    <div className="text-sm text-red-600">-¥500</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">今日のレース</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                  <div>
                    <div className="font-medium text-gray-900">東京1R 3歳未勝利</div>
                    <div className="text-sm text-gray-600">14:00発走</div>
                  </div>
                  <div className="text-sm text-blue-600">投票可能</div>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <div className="font-medium text-gray-900">東京2R 3歳以上1勝クラス</div>
                    <div className="text-sm text-gray-600">14:30発走</div>
                  </div>
                  <div className="text-sm text-gray-600">投票可能</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
