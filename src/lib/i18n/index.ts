// 型定義
export type { Locale, TranslationKeys, TranslationFunction } from './types';

// 設定
export {
  defaultLocale,
  getTranslations,
  getNestedValue,
  createTranslationFunction
} from './config';

// フック
export { useTranslation } from './hooks'; 