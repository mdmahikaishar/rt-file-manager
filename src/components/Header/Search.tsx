import { FormEvent, useEffect, useRef } from "react";
import { BiSearch } from "react-icons/bi";
import { useApp } from "../../context/AppContext";
import { useRefs } from "../../context/RefsContext";
import tauriService from "../../services/tauri";

export default function Search({ }: {}) {
  const app = useApp();
  const refs = useRefs();
  const ref = {
    caseSensetive: useRef({} as HTMLInputElement),
    extensions: useRef({} as HTMLInputElement)
  }

  const handleOnSearch = async (e: FormEvent) => {
    e.preventDefault();

    let keyword = refs.search.current.value.trim();
    if (!keyword) return;

    app.dispatch({ type: "UPDATE", payload: { is_search: true, searching: true } });

    const caseSensetive = ref.caseSensetive.current.checked;
    const extensions = ref.extensions.current.value.trim();

    tauriService.on_search(app.location, keyword, caseSensetive, extensions)
      .then(response => {
        app.dispatch({ type: "UPDATE", payload: { searching: false, entries: response } })
      });
  };

  const keypressed = useRef("");

  let handleKeyPress = (e: KeyboardEvent) => {
    if (e.ctrlKey) {
      keypressed.current = "CTRL"; // ctr<>
      setTimeout(() => keypressed.current = "", 1000) // None;
      return;
    }

    // ctr<ctr>
    if (keypressed.current !== "CTRL") {
      keypressed.current = ""; // None
      return;
    }

    // ctr<s>
    if (e.key === "s" && document.activeElement === document.body) {
      e.preventDefault();
      refs.search.current.focus();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    }
  }, []);

  return (
    <div className="sm:max-w-sm sm:w-[30%] group">
      <form
        className={`h-8 flex items-center dark:bg-slate-800 rounded-sm shadow-sm dark:focus-within:bg-slate-700 cursor-pointer transition-all
          focus-within:absolute focus-within:left-2 focus-within:right-2
          foucs-within:top-1/2 focus-within:-translate-y-1/2 
          sm:focus-within:relative sm:focus-within:left-auto sm:focus-within:right-auto
          sm:foucs-within:top-auto sm:focus-within:translate-y-0
        `}
        onSubmit={handleOnSearch}
        onClick={() => refs.search.current.focus()}
      >
        <input
          className={`sm:pl-3 text-sm text-slate-300 bg-transparent outline-none placeholder:select-none
            w-0 sm:w-full
            group-focus-within:w-full group-focus-within:pl-3
          `}
          type="text"
          placeholder="Search"
          ref={refs.search}
        />
        <div className="h-8 aspect-square text-slate-300 grid place-items-center rounded-sm">
          <BiSearch />
        </div>
        <button type="submit" hidden></button>
      </form>

      {/* Drop Modal */}
      <div className="m-2 p-2 py-2 w-60 flex-col gap-2 absolute top-full right-0 z-10 bg-slate-800 border border-slate-700 rounded-sm opacity-0 select-none group-focus-within:opacity-100 group-focus-within:select-all hidden group-focus-within:flex">
        {/* Case Sensetive */}
        <div className="grid grid-cols-2 items-center gap-2">
          <label className="text-xs font-semibold" htmlFor="search-case-sensetive">Case Sensetive:</label>

          <div className="flex items-center justify-end">
            <input
              className="cursor-pointer"
              type="checkbox"
              name="search-case-sensetive"
              id="search-case-sensetive"
              ref={ref.caseSensetive}
            />
          </div>
        </div>

        {/* Extensions */}
        <div className="grid grid-cols-2 items-center gap-2 shadow-sm">
          <label className="text-xs font-semibold" htmlFor="search-extensions">Extensions:</label>
          <input
            className="px-2 h-6 text-sm text-slate-300 bg-slate-800 border border-slate-700 outline-none rounded-sm placeholder:select-none focus-within:bg-slate-700 focus-within:border-slate-600 focus-within:shadow-sm"
            type="text"
            name="search-extensions"
            id="search-extensions"
            placeholder="Extensions"
            ref={ref.extensions}
          />
        </div>
      </div>
    </div>
  );
}