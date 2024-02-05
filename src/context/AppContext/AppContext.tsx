import { useContext, createContext, ReactNode, useReducer, useEffect } from "react";
import { IAppContext } from "./types";
import { AppReducer, AppState } from "./AppReducer";
import tauriService from "../../services/tauri";
import { EntrySort } from "../../utils/entries";

const AppContext = createContext({} as IAppContext);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(AppReducer, AppState);

  const readdir = async () => {
    tauriService.read_dir(state.location)
      .then((response) => {
        const entries = response.sort(EntrySort.get(state.sort));
        dispatch({ type: "SET_ENTRIES", payload: entries })
      });
  }


  // read dir
  useEffect(() => {
    if (!state.is_search) {
      readdir();
    }
  }, [state.location, state.is_search]);

  // sort
  useEffect(() => {
    const entries = state.entries.sort(EntrySort.get(state.sort));

    dispatch({ type: "UPDATE", payload: { entries } });
  }, [state.sort]);


  return <AppContext.Provider value={{ ...state, dispatch, readdir }}>
    {children}
  </AppContext.Provider>
}

export function useApp() {
  return useContext(AppContext);
}