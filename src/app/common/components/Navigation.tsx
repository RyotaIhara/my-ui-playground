'use client';

import Link from "next/link";
import { useTranslation } from "@/lib/i18n/hooks";

const navItems = [
  { nameKey: "common.navigation.home", href: "/" },
  { nameKey: "common.navigation.votingList", href: "/votings" },
  { nameKey: "common.navigation.myPage", href: "/mypage" },
];

export const Navigation = () => {
  const { t, loading } = useTranslation();

  if (loading) {
    return (
      <div
        className="text-white px-2 py-2 rounded bg-white/10"
      >
        Loading...
      </div>
    );
  }

  return (
    <nav className="flex gap-2">
      {navItems.map((item) => (
        <Link
          key={item.nameKey}
          href={item.href}
          className="text-white px-2 py-2 rounded hover:bg-white/10 transition-colors"
        >
          {t(item.nameKey)}
        </Link>
      ))}
    </nav>
  );
};
