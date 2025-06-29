import { Locale, TranslationKeys } from './types';

// 型を再エクスポート
export type { Locale, TranslationKeys } from './types';

// 言語ファイルの動的インポート
const locales: Record<Locale, () => Promise<TranslationKeys>> = {
  ja: () => import('./locales/ja.json').then(module => module.default),
};

// デフォルト言語
export const defaultLocale: Locale = 'ja';

// 翻訳データのキャッシュ
const translationCache: Record<Locale, TranslationKeys> = {} as Record<Locale, TranslationKeys>;

// 翻訳データを取得する関数
export async function getTranslations(locale: Locale = defaultLocale): Promise<TranslationKeys> {
  if (translationCache[locale]) {
    return translationCache[locale];
  }

  try {
    const translations = await locales[locale]();
    translationCache[locale] = translations;
    return translations;
  } catch (error) {
    console.error(`Failed to load translations for locale: ${locale}`, error);
    throw error;
  }
}

// ネストしたキーから値を取得する関数
export function getNestedValue(obj: any, path: string): string {
  return path.split('.').reduce((current, key) => current?.[key], obj) || path;
}

// 翻訳関数を作成する
export function createTranslationFunction(translations: TranslationKeys) {
  return (key: string): string => {
    return getNestedValue(translations, key);
  };
} 