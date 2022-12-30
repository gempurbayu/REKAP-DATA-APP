import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { useStore } from '../../app/stores/store';
import { Col, DatePicker, List, Row, Typography } from 'antd';
import dayjs from 'dayjs';
import '../../index.css';

function PengeluaranIndexPage() {
    const { pengeluaranStore } = useStore();
    const { Title } = Typography;

    useEffect(() => {
      pengeluaranStore.getList();
    },[pengeluaranStore]);

    const handleDate = (e: dayjs.Dayjs | null) => {
        if(e){
            const tgl = e.format('YYYY-MM-DD');
            pengeluaranStore.getListByDate(tgl);
        }
    }

    useEffect(() => {
        pengeluaranStore.getListByDate(dayjs(new Date()).format('YYYY-MM-DD'));
    },[pengeluaranStore]);
    
  return (
    <Row gutter={[0, 24]} justify="center" >
        <Col xs={24} sm={24} md={24} lg={12} style={{ minHeight: 200, background: "#5b8c00", borderRadius: 10, padding: 20 }}>
        <Typography style={{ marginTop: 10, color: 'white'}}>Pilih Tanggal</Typography>
            <DatePicker
                disabledDate={d => !d || d.isAfter(new Date())}
                onChange={(e) => handleDate(e)}
                name="tgl_pengeluaran"  
                placeholder='pilih tanggal'
                size='large'
                style={{ width: "50%", borderRadius:8, marginTop: 10, backgroundColor: 'white' }}
                defaultValue={dayjs(new Date())}
                className="ant-picker-input"
            />
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} style={{ maxHeight: 550, borderRadius: 20 }}>
            <Title level={4} style={{marginTop: -7, color: '#5b8c00'}}>Daftar Pengeluaran</Title>
            <div 
            style={{
            height: 500,
            overflow: 'overlay',
            }}
            id="list-pengeluaran"
            >
            <List
            dataSource={pengeluaranStore.dataByDate?.data}
            loading={pengeluaranStore.loadingList}
            renderItem={(item, idx) => (
                <List.Item key={idx} style={{marginBottom: 20, border: 2, backgroundColor: "white", borderRadius: 15}}>
                <List.Item.Meta
                    title={<a href="https://ant.design" style={{ color: '#5b8c00' }}>{item.nama}</a>}
                    description={item.jenis_pengeluaran}
                />
                <div><Typography>{item.nominal!.toLocaleString('en-US', {
  style: 'currency',
  currency: 'USD',
})}</Typography></div>
                </List.Item>
            )}
            />
            </div>
        </Col>
    </Row>    
  )
}

export default observer(PengeluaranIndexPage)