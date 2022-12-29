export interface IPengeluaran {
    nama?: string,
    tgl_pengeluaran?: string,
    jenis_pengeluaran?: string,
    nominal?: number | null,
    keterangan?: string,
    created_by?: string
}