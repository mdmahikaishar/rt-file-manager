import { AppAction, IAppState } from "./types";

export const AppState: IAppState = {
  view: "FLEX",
  sort: "A-Z",
  searching: false,
  entries: [],
  is_search: false,
  location: "",
};

export function AppReducer(state: IAppState, action: AppAction): IAppState {
  switch (action.type) {
    case "UPDATE": {
      return { ...state, ...action.payload };
    }
    case "SET_ENTRIES": {
      return { ...state, entries: action.payload }
    } case "TOGGLE_VIEW": {
      return { ...state, view: state.view === "FLEX" ? "GRID" : "FLEX" }
    } case "TOGGLE_SORT": {
      return { ...state, sort: state.sort === "A-Z" ? "Z-A" : "A-Z" }
    }
    default: {
      return state;
    }
  }
}