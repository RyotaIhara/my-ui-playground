'use client';

import { Navigation } from "../pc/Navigation";
import { useTranslation } from "@/lib/i18n/hooks";

export const Header = () => {
  const { t, loading } = useTranslation();

  if (loading) {
    return (
      <header className="w-full bg-lime-700 px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-white">Loading...</div>
        <Navigation />
      </header>
    );
  }

  return (
    <header className="w-full bg-lime-700 px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-white">{t('common.appTitle')}</div>
      <Navigation />
    </header>
  );
}; 