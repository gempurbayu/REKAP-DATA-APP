import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { useStore } from '../../app/stores/store';
import { toJS } from 'mobx';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { IPengeluaran } from '../../app/models/pengeluaran';

function PengeluaranIndexPage() {
    const { pengeluaranStore } = useStore();

    useEffect(() => {
      pengeluaranStore.getExampleList();
    },[pengeluaranStore]);
  
    console.log(toJS(pengeluaranStore.data));

    const columns: ColumnsType<IPengeluaran> = [
        {
            title: 'Nama',
            width: 150,
            dataIndex: 'nama',
            key: 'nama',
            fixed: 'left',
        },
        {
            title: 'Tanggal',
            width: 150,
            dataIndex: 'tgl_pengeluaran',
            key: 'tgl_pengeluaran',
            fixed: 'left',
        },
        {
            title: 'Jenis Pengeluaran',
            width: 150,
            dataIndex: 'jenis_pengeluaran',
            key: 'jenis_pengeluaran',
            fixed: 'left',
        },
        {
            title: 'Nominal',
            width: 150,
            dataIndex: 'nominal',
            key: 'nominal',
            fixed: 'left',
            render: (row) => {
                return (row).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
            }
        },
        {
            title: 'Keterangan',
            width: 150,
            dataIndex: 'keterangan',
            key: 'keterangan',
            fixed: 'left',
        },
        {
            title: 'Created By',
            width: 150,
            dataIndex: 'created_by',
            key: 'created_by',
            fixed: 'left',
        },
    ]
    
  return (
    <Table columns={columns} dataSource={pengeluaranStore.data} rowKey="id" scroll={{ x: 1200, y: 300 }} />
  )
}

export default observer(PengeluaranIndexPage)