import { action, makeAutoObservable, runInAction } from "mobx"
import agent from "../api/agent";
import { IPengeluaran, IPengeluaranByDate } from "../models/pengeluaran";

export default class PengeluaranStore {

    data = new Array<IPengeluaran>();
    dataByDate: IPengeluaranByDate | null = null;
    loadingForm = false;
    loadingList = false;

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
        } catch (error) {
            throw error;
        }
    }

    getListByDate = async (date : string) => {
        try {
            this.loadingList = true;
            const result = await agent.Pengeluaran.listByDate(date);
            this.setPengeluaranDataByDate(result);
        } catch (error) {
            throw error;
        } finally {
            runInAction(() => {
                this.loadingList = false;
            })
        }
    }

    setPengeluaranDataByDate = (res : IPengeluaranByDate) => {
        this.dataByDate = res;
    }

    setPengeluaranData = (res : Array<IPengeluaran>) => {
        this.data = res;
    }

    create = async (data: IPengeluaran) => {
        try {
            this.loadingForm = true;
            await agent.Pengeluaran.create(data);
        } catch (error) {
            throw(error);
        } finally {
            runInAction(() => {
                this.loadingForm = false
              })
        }
    }

}