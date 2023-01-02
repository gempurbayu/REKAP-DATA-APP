import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { IAccountInfo, IAccountLoginValues, ILoginInfo } from "../models/account";
import { store } from "./store";

export default class AccountStore {
    account: ILoginInfo | null = null;
    user : IAccountInfo | null = null;
    loadingLogin = false;

    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn() {
        return !!this.user;
    }

    login = async (creds: IAccountLoginValues) => {
        try {
            this.loadingLogin = true;
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.access_token);
            this.getUser();
            window.location.replace("/");
        } catch (error) {
            throw error;
        } finally {
            runInAction(() => {
                this.loadingLogin = false;
            })
        }
    }

    private setUser = (user: ILoginInfo | null) => {
        this.account = user;
    }

    logout = async () => {
        store.commonStore.setToken(null);
        this.setUser(null);
        this.setUserInfo(null);
        window.location.replace("/login"); 
    }

    getUser = async () => {
        try {
            const user = await agent.Account.me();
            this.setUserInfo(user);
        } catch (error) {
            console.log(error);
        }
    }

    private setUserInfo = (user: IAccountInfo | null) => {
        this.user = user;
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
