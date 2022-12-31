import { makeAutoObservable } from "mobx";
import agent from "../api/agent";
import { IAccountInfo, IAccountLoginValues } from "../models/account";
import { store } from "./store";

export default class AccountStore {
    account: IAccountInfo | null = null;
    
    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn() {
        return !!this.account;
    }


    login = async (creds: IAccountLoginValues) => {
        try {
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);
            this.setUser(user);
        } catch (error) {
            throw error;
        }
    }

    private setUser = (user: IAccountInfo | null) => {
        this.account = user;
    }

    logout = async () => {
        store.commonStore.setToken(null);
        this.setUser(null);
        window.open(`/`); 
    }

    // register = async (creds: IAccountRegisterValues) => {
    //     try {
    //         const user = await agent.Account.register(creds);
    //         store.commonStore.setToken(user.token);
    //         this.setUser(user);
    //         history.push('/');
    //     } catch (error) {
    //         throw error;
    //     }
    // }

}