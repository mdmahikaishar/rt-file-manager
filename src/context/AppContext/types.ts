import { FileManager, IEntry, ViewMode, SortMode } from "../../types";

export interface IAppState extends FileManager {
  view: ViewMode;
  sort: SortMode;
  searching: boolean;
  entries: IEntry[];
}

export type AppAction =
  | { type: "SET_ENTRIES"; payload: IEntry[] }
  | { type: "TOGGLE_VIEW"; }
  | { type: "TOGGLE_SORT"; }
  | { type: "UPDATE", payload: Partial<IAppState> }
  | { type: "---"; payload: {} }
  ;

export interface IAppContext extends IAppState {
  dispatch: (action: AppAction) => void;
  readdir: () => Promise<void>;
}