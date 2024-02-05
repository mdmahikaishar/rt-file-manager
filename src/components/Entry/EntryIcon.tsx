import { BiFolder, BiFileBlank } from "react-icons/bi";
import { ViewMode } from "@/types";

export default function EntryIcon({ is_dir, view }: { is_dir: boolean, view: ViewMode }) {
  const style = view === "FLEX" ? "text-xl" : "text-4xl";

  return (
    <div className={`aspect-square grid place-items-center ${view === "FLEX" ? "w-6 h-6" : "w-10 h-10"}`}>
      {is_dir
        ? <BiFolder className={"text-slate-500 " +style} />
        : <BiFileBlank className={"text-slate-500 " +style} />
      }
    </div>
  )
}