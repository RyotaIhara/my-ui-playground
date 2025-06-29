import { Navigation } from "./Navigation";

export const Header = () => {
  return (
    <header className="w-full bg-lime-700 px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-white">競馬シミュレーター</div>
      <Navigation />
    </header>
  );
};
