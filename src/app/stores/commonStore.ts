import { makeAutoObservable, reaction } from "mobx"

export default class CommonStore {

    title = "Dashboard";
    token: string | null = window.localStorage.getItem('jwt');

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.token,
            (token) => {
                if (token) {
                    window.localStorage.setItem('jwt', token);
                } else {
                    window.localStorage.removeItem('jwt');
                }
            }
        );
    }

    setTitle = (title :string) => {
        this.title = title;
    }

    setToken = (token: string | null) => {
        this.token = token;
    }

}