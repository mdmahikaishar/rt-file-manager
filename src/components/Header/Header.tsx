import Navigation from "./Navigation";
import Location from "./Location";
import Search from "./Search";


export default function Header() {
  return (
    <div className="relative p-2 md:px-3 flex items-center gap-2 md:gap-4 border-b border-slate-800 shadow-sm">
      <Navigation />
      <Location />
      <Search />
    </div>
  );
}