# ベースイメージ
FROM node:22-alpine

# 作業ディレクトリを作成
WORKDIR /app

# 依存関係のコピーとインストール
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# アプリケーションコードをコピー
COPY . .

# ポート解放（Next.jsのデフォルト）
EXPOSE 3000

# 開発用コマンド
CMD ["npm", "run", "dev"]
