import { makeAutoObservable } from "mobx"

export default class CommonStore {

    title = "Dashboard";

    constructor() {
        makeAutoObservable(this);
    }

    setTitle = (title :string) => {
        this.title = title;
    }

}