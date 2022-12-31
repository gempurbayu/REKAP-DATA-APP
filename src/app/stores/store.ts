import { createContext, useContext } from "react";
import AccountStore from "./accountStore";
import CommonStore from "./commonStore";
import PengeluaranStore from "./pengeluaranStore";

interface Store {
    // Pengeluaran
    pengeluaranStore : PengeluaranStore,
    commonStore : CommonStore,
    accountStore : AccountStore
}

export const store: Store = {
    pengeluaranStore: new PengeluaranStore(),
    commonStore: new CommonStore(),
    accountStore: new AccountStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}