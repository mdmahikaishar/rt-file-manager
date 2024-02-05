import EntryIcon from "./EntryIcon";
import { IEntry } from "../../types";

export default function EntryItem({ entry, onClick, view }: { view: "FLEX" | "GRID", entry: IEntry, onClick: () => void }) {
  return (
    <div className={`flex items-center gap-2 overflow-hidden rounded-sm cursor-pointer select-none dark:hover:bg-slate-800 dark:active:bg-slate-700 transition-all ${
        view === "FLEX"
          ? "px-2 py-2"
          : "px-1 py-2 w-28 h-24 flex-col justify-start text-center"
        }`
      }
      onClick={onClick}
    >
      <EntryIcon is_dir={entry.is_dir} view={view} />

      <span
        className={`w-full text-slate-200 text-ellipsis ${
          view === "FLEX"
            ? "text-sm line-clamp-1"
            : "px-1 text-xs line-clamp-2"
          }`
        }
      >
        {entry.name}
      </span>
    </div>
  )
}