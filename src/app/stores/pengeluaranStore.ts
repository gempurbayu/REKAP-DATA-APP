import { action, makeAutoObservable } from "mobx"
import agent from "../api/agent";
import { IPengeluaran } from "../models/pengeluaran";

export default class PengeluaranStore {

    data = new Array<IPengeluaran>();

    constructor() {
        makeAutoObservable(this);
    }

    updateGridCallback = action(() => {
        this.getExampleList();
    })

    getExampleList = async () => {
        try {
            const result = await agent.Pengeluaran.list();
            this.setPengeluaranData(result);
            console.log(result);
        } catch (error) {
            throw error;
        }
    }

    setPengeluaranData = (res : Array<IPengeluaran>) => {
        this.data = res;
    }

}