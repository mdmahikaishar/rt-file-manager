import { useEffect } from "react";
import { BiChevronLeft, BiGridAlt, BiListUl, BiSortAZ, BiSortZA } from "react-icons/bi";
import { useApp } from "../../context/AppContext";
import { useRefs } from "../../context/RefsContext";
import tauriService from "../../services/tauri";

export default function Navigation() {
  const app = useApp();
  const refs = useRefs();

  const handleOnBack = async () => {
    let response = await tauriService.on_navigation_back(app.location, app.is_search)
    if (!response) return;

    refs.location.current.value = response.location;
    app.dispatch({ type: "UPDATE", payload: response });
  };

  const handleOnView = () => {
    app.dispatch({ type: "TOGGLE_VIEW" })
  }

  const handleOnSort = () => {
    app.dispatch({ type: "TOGGLE_SORT" });
  }

  let handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Backspace" && document.activeElement === document.body) {
      e.preventDefault();
      handleOnBack();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    }
  }, [app.location, app.is_search]);

  return (
    <div className="flex items-center gap-2">
      <button className="h-8 aspect-square grid place-items-center bg-slate-800 rounded-sm shadow-sm dark:hover:bg-slate-700 dark:active:bg-slate-600" onClick={handleOnBack}>
        <BiChevronLeft />
      </button>
      <button className="h-8 aspect-square grid place-items-center bg-slate-800 rounded-sm shadow-sm dark:hover:bg-slate-700 dark:active:bg-slate-600" onClick={handleOnView}>
        {app.view === "GRID" ? <BiGridAlt key="grid-view" /> : <BiListUl key="list-view" />}
      </button>
      <button className="h-8 aspect-square grid place-items-center bg-slate-800 rounded-sm shadow-sm dark:hover:bg-slate-700 dark:active:bg-slate-600" onClick={handleOnSort}>
        {app.sort === "A-Z" ? <BiSortAZ key="sort-az" /> : <BiSortZA key="sort-za" />}
      </button>
    </div>
  );
}