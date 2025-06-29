'use client';

import Link from "next/link";
import { useTranslation } from "@/lib/i18n/hooks";

const navItems = [
  { nameKey: "common.navigation.home", href: "/" },
  { nameKey: "common.navigation.votingList", href: "/votings" },
  { nameKey: "common.navigation.myPage", href: "/mypage" },
];

interface NavigationProps {
  onItemClick?: () => void;
}

export const Navigation = ({ onItemClick }: NavigationProps) => {
  const { t, loading } = useTranslation();

  if (loading) {
    return (
      <nav className="py-2">
        <div
            className="px-4 py-3 text-white border-b border-gray-100"
          >
            Loading...
          </div>
      </nav>
    );
  }

  return (
    <nav className="py-2">
      {navItems.map((item) => (
        <Link
          key={item.nameKey}
          href={item.href}
          onClick={onItemClick}
          className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
        >
          {t(item.nameKey)}
        </Link>
      ))}
    </nav>
  );
}; 