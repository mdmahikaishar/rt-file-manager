import { useContext, useRef, createContext, ReactNode } from "react";
import { IRefState } from "./types";

const RefContext = createContext({} as IRefState);

export function RefsProvider({ children }: { children: ReactNode }) {
  const location = useRef({} as HTMLInputElement);
  const search = useRef({} as HTMLInputElement);

  return <RefContext.Provider value={{ location, search }}>
    {children}
  </RefContext.Provider>
}

export function useRefs() {
  return useContext(RefContext);
}