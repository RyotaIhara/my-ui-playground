import Link from "next/link";

const navItems = [
  { name: "ホーム", href: "/" },
  { name: "投票一覧", href: "/baken" },
  { name: "マイページ", href: "/mypage" },
];

export const Navigation = () => {
  return (
    <nav className="flex gap-2">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="text-white px-2 py-2 rounded hover:bg-white/10 transition-colors"
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
};
