import { action, makeAutoObservable } from "mobx"
import agent from "../api/agent";
import { IPengeluaran } from "../models/pengeluaran";

export default class PengeluaranStore {

    data = new Array<IPengeluaran>();

    constructor() {
        makeAutoObservable(this);
    }

    updateGridCallback = action(() => {
        this.getList();
    })

    getList = async () => {
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

    create = async (data: IPengeluaran) => {
        try {
            await agent.Pengeluaran.create(data);
        } catch (error) {
            throw(error);
        }
    }

}