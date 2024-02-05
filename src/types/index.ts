export interface FileManager {
  location: string,
  is_search: boolean,
}

export interface IEntry {
  name: string,
  path: string,
  is_dir: boolean,
}

export type ViewMode = "GRID" | "FLEX";
export type SortMode = "A-Z" | "Z-A";