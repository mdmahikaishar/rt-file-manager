import { invoke } from "@tauri-apps/api/tauri";
import { IEntry } from "@/types";
import { IOnBack, IOnClick, IOnLocation, IOnNext } from "./types"

export async function on_navigation_back(location: string, isSearch: boolean): Promise<IOnBack> {
  return await invoke<IOnBack>("on_navigation_back", {location, isSearch});
}
export async function on_navigation_next(): Promise<IOnNext> {
  return await invoke<IOnNext>("on_navigation_next", { });
}
export async function on_entry_click(target: string, location: string, isSearch: boolean): Promise<IOnClick> {
  return await invoke<IOnClick>("on_entry_click", { target, location, isSearch });
}
export async function on_location_change(input: string, location: string): Promise<IOnLocation> {
  return await invoke<IOnLocation>("on_location_change", { input, location });
}
export async function on_search(location: string, keyword: string, caseSensetive: boolean, extensions: string): Promise<IEntry[]> {
  return await invoke<IEntry[]>("on_search", { location, keyword, caseSensetive, extensions });
}
export async function read_dir(location: string): Promise<IEntry[]> {
  return await invoke<IEntry[]>("read_dir", { location });
}  