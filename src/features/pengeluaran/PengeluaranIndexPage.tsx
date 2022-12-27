import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { useStore } from '../../app/stores/store';
import { toJS } from 'mobx';

function PengeluaranIndexPage() {
    const { pengeluaranStore } = useStore();

    useEffect(() => {
      pengeluaranStore.getExampleList();
    },[pengeluaranStore]);
  
    console.log(toJS(pengeluaranStore.data));
    
  return (
    
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="py-3 px-6">
                        Nama
                    </th>
                    <th scope="col" className="py-3 px-6">
                        <div className="flex items-center">
                            Tanggal Pengeluaran
                        </div>
                    </th>
                    <th scope="col" className="py-3 px-6">
                        <div className="flex items-center">
                            Jenis Pengeluaran
                        </div>
                    </th>
                    <th scope="col" className="py-3 px-6">
                        <div className="flex items-center">
                            Nominal
                        </div>
                    </th>
                    <th scope="col" className="py-3 px-6">
                        Keterangan
                    </th>
                    <th scope="col" className="py-3 px-6">
                        <span className="sr-only">Edit</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                {pengeluaranStore.data.map((dat, index) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                    <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {dat.nama}
                    </td>
                    <td className="py-4 px-6">
                        {dat.tgl_pengeluaran.toLocaleString()}
                    </td>
                    <td className="py-4 px-6">
                        {dat.jenis_pengeluaran}
                    </td>
                    <td className="py-4 px-6">
                        {dat.nominal}
                    </td>
                    <td className="py-4 px-6">
                        {dat.keterangan}
                    </td>
                    <td className="py-4 px-6 text-right">
                        <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>

  )
}

export default observer(PengeluaranIndexPage)