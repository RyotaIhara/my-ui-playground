'use client';

import { useState } from "react";
import { useTranslation } from "@/lib/i18n/hooks";
import { Navigation } from "./Navigation";

export const Header = () => {
  const { t, loading } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (loading) {
    return (
      <header className="w-full bg-lime-700 px-4 py-3 flex justify-between items-center">
        <div className="text-xl font-bold text-white">Loading...</div>
        <button className="text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>
    );
  }

  return (
    <header className="w-full bg-lime-700 px-4 py-3 flex justify-between items-center relative">
      <div className="text-xl font-bold text-white">{t('common.appTitle')}</div>
      
      {/* ハンバーガーメニューボタン */}
      <button 
        onClick={toggleMenu}
        className="text-white p-1 rounded hover:bg-white/10 transition-colors"
        aria-label="メニューを開く"
      >
        <svg 
          className="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          {isMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* ドロップダウンメニュー */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50">
          <Navigation onItemClick={() => setIsMenuOpen(false)} />
        </div>
      )}
    </header>
  );
}; 