import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import PengeluaranStore from "./pengeluaranStore";

interface Store {
    // Pengeluaran
    pengeluaranStore : PengeluaranStore,
    
    commonStore : CommonStore
}

export const store: Store = {
    pengeluaranStore: new PengeluaranStore(),
    commonStore: new CommonStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}