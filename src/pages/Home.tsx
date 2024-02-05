import { IEntry } from "../types";
import tauriService from "../services/tauri";
import { EntryItem } from "../components/Entry";
import { useApp } from "../context/AppContext";
import { useRefs } from "../context/RefsContext";
import Header from "../components/Header";
import Loading from "../components/Loading";
import Statusbar from "../components/Statusbar";

export default function HomePage() {
  const app = useApp();
  const refs = useRefs();

  const handleOnClick = async (entry: IEntry) => {
    let response = await tauriService.on_entry_click(entry.path, app.location, app.is_search);
    if (!response) return;

    refs.location.current.value = response.location;
    app.dispatch({ type: "UPDATE", payload: response });
  }

  return (
    <div className="h-screen mx-auto flex flex-col">
      <Header />

      <div className="h-full relative flex flex-col scroll-y">
        {/* Result */}
        {app.is_search && !app.searching && (
          <div className="p-2 md:px-3 mb-2 sticky top-0 bg-red-900 text-white shadow-sm">
            <span className="text-sm">Search Results:</span>
          </div>
        )}

        {/* Loading */}
        {app.is_search && app.searching && <Loading text="Searching..." />}

        {/* Entries */}
        <div className="p-2 md:px-3 h-full">
          <div className={`${app.view === "GRID" ? "flex flex-wrap justify- gap-x-1 gap-y-2" : "flex flex-col gap-1"} `}>
            {!app.searching && app.entries.map(entry => (
              <EntryItem
                view={app.view}
                entry={entry}
                onClick={() => handleOnClick(entry)}
                key={entry.name}
              />
            ))}
          </div>
        </div>
      </div>

      <Statusbar />
    </div>
  );
}
