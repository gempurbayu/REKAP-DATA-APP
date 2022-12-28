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
        }
    ]
    
  return (
    <Table columns={columns} dataSource={pengeluaranStore.data} rowKey="id" scroll={{ x: 1200, y: 300 }} />
  )
}

export default observer(PengeluaranIndexPage)