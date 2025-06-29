'use client';

import { useState, useEffect, useCallback } from 'react';
import { Locale, TranslationKeys } from './types';
import { getTranslations, createTranslationFunction, defaultLocale } from './config';

export function useTranslation(locale: Locale = defaultLocale) {
  const [translations, setTranslations] = useState<TranslationKeys | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadTranslations = async () => {
      try {
        setLoading(true);
        setError(null);
        const trans = await getTranslations(locale);
        
        if (isMounted) {
          setTranslations(trans);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load translations');
          setLoading(false);
        }
      }
    };

    loadTranslations();

    return () => {
      isMounted = false;
    };
  }, [locale]);

  const t = useCallback((key: string): string => {
    if (!translations) return key;
    return createTranslationFunction(translations)(key);
  }, [translations]);

  return {
    t,
    translations,
    loading,
    error,
    locale
  };
} 