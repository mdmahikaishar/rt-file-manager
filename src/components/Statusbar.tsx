import { useApp } from "../context/AppContext";


export default function Statusbar() {
  const app = useApp();

  return (
    <div className="p-2 border-t border-t-slate-800">
      <div className="text-slate-300">
        <p className="text-xs">
          {app.entries.length}
          {" "}
          {app.entries.length > 1 ? "items" : "item"}
        </p>
      </div>
    </div>
  );
}
