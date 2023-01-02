export interface IPengeluaran {
    id?: string,
    nama?: string,
    tgl_pengeluaran?: string,
    jenis_pengeluaran?: string,
    nominal?: number | null,
    keterangan?: string,
    created_by?: string
}

export interface IPengeluaranByDate {
    nominal_jenis : {
        gaji: number,
        operasional: number,
        produksi: number
    },
    total_pengeluaran: number,
    jumlah_data: number,
    data: IPengeluaran[]
}