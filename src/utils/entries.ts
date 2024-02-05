import { IEntry, SortMode } from "@/types";

export class EntrySort {
  public static get(sort: SortMode): (a: IEntry, b: IEntry) => number {
    return sort === "A-Z" ? this.aToZ : this.zToA
  }

  public static aToZ(a: IEntry, b: IEntry): number {
    return a.name < b.name
      ? -1
      : a.name > b.name
        ? 1
        : 0
  }
  public static zToA(a: IEntry, b: IEntry): number {
    return a.name > b.name
      ? -1
      : a.name < b.name
        ? 1
        : 0
  }
}