import { createContext, useContext } from "react";
import PengeluaranStore from "./pengeluaranStore";

interface Store {
    // Pengeluaran
    pengeluaranStore : PengeluaranStore
}

export const store: Store = {
    pengeluaranStore: new PengeluaranStore(),
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}