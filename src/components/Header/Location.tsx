import { FormEvent } from "react";
import { BiLocationPlus } from "react-icons/bi";
import { useApp } from "../../context/AppContext";
import { useRefs } from "../../context/RefsContext";
import tauriService from "../../services/tauri";


export default function Location({ }: {}) {
  const app = useApp();
  const refs = useRefs();

  const handleOnLocation = async (e: FormEvent) => {
    e.preventDefault();

    let location = refs.location.current.value.trim();
    let response = await tauriService.on_location_change(location, app.location);
    if (!response) return;

    refs.location.current.value = response.location;
    app.dispatch({ type: "UPDATE", payload: response });
  };


  return (
    <div className="flex-grow">
      <form
        className={`w-full h-8 flex items-center cursor-pointer dark:bg-slate-800 rounded-sm shadow-sm focus-within:bg-slate-700 transition-all
          focus-within:w-auto
          focus-within:absolute focus-within:left-2 focus-within:right-2
          foucs-within:top-1/2 focus-within:-translate-y-1/2 
          sm:focus-within:relative sm:focus-within:left-auto sm:focus-within:right-auto
          sm:foucs-within:top-auto sm:focus-within:translate-y-0
        `}
        onSubmit={handleOnLocation}
        onClick={() => refs.location.current.focus()}
      >
        <div className="h-8 aspect-square text-slate-300 grid place-items-center rounded-sm">
          <BiLocationPlus />
        </div>
        <input
          className="w-full text-sm text-slate-300 bg-transparent outline-none placeholder:select-none"
          type="text"
          placeholder="Location"
          ref={refs.location}
        />
        <button type="submit" hidden></button>
      </form>
    </div>
  );
}