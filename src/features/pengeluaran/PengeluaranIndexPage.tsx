import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { useStore } from '../../app/stores/store';
import { Col, DatePicker, List, Progress, Row, Typography } from 'antd';
import dayjs from 'dayjs';
import '../../index.css';
import { PlusCircleFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { toPercentByCategory } from '../../app/config/enum';

function PengeluaranIndexPage() {
    const { pengeluaranStore, commonStore } = useStore();
    const { Title } = Typography;
    const navigate = useNavigate();

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

    useEffect(() => {
        commonStore.setTitle('Pengeluaran');
    });   
    
  return (
    <Row gutter={[0, 24]} justify="center" >
        <div style={{ display: 'inline-flex', width: "100%", height: 30, justifyContent: "center", alignItems: "center" }}>
            <Typography style={{ fontSize: 16, marginRight: 10, color: 'gray' }}>Pilih Tanggal</Typography>
            <DatePicker
                disabledDate={d => !d || d.isAfter(new Date())}
                onChange={(e) => handleDate(e)}
                name="tgl_pengeluaran"  
                placeholder='pilih tanggal'
                size='large'
                style={{ width: 250, borderRadius:8, backgroundColor: 'white' }}
                defaultValue={dayjs(new Date())}
                className="ant-picker-input"
                inputReadOnly = {true}
            />
        </div>
        <Col xs={24} sm={24} md={24} lg={12} style={{ minHeight: 200, maxHeight: 300, borderRadius: 10, paddingLeft : 10, paddingRight: 10 }}>
            <div style={{background: "#7cb305", width : '100%', height: '100%', borderRadius: 10, padding: 20 }}>
                <div style={{ width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <div>
                    <Typography style={{ color: 'white', fontSize: 16}}>Total Pengeluaran</Typography>
                    <Typography style={{ color: 'white', fontSize: 32, fontWeight: 600 }}>Rp {Number(pengeluaranStore.dataByDate?.total_pengeluaran).toLocaleString()}</Typography>
                </div>
                    <PlusCircleFilled style={{ color: 'white', fontSize:50, cursor: 'pointer' }} onClick={() => navigate('/pengeluaran/form')}/>
                </div>
                <div>
                    <Row justify='center' style={{ marginTop: 20, marginLeft: -15 }}>
                        <Col style={{ backgroundColor: '#fadb14', height: 120, borderRadius: 5, padding: 10}} xs={{ span: 7, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                            <div style={{ textAlign: "center", marginBottom: 10 }}>
                                <Progress type="circle" percent={toPercentByCategory(pengeluaranStore.dataByDate?.nominal_jenis.produksi, pengeluaranStore.dataByDate?.total_pengeluaran)} width={50} trailColor="#ffec3d" strokeColor="#52c41a" strokeWidth={15} style={{ color: 'white' }} />
                                <Typography style={{ fontWeight: 500, color: '#876800', fontSize: 12, marginTop: 3 }}>Produksi</Typography>
                                <Typography style={{ fontWeight: 500, color: 'black', fontSize: 12 }}>Rp {Number(pengeluaranStore.dataByDate?.nominal_jenis.produksi).toLocaleString()}</Typography>
                            </div>
                        </Col>
                        <Col style={{ backgroundColor: '#fadb14', height: 120, borderRadius: 5, padding: 10}} xs={{ span: 7, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                        <div style={{ textAlign: "center", marginBottom: 10 }}>
                            <Progress type="circle" percent={toPercentByCategory(pengeluaranStore.dataByDate?.nominal_jenis.operasional, pengeluaranStore.dataByDate?.total_pengeluaran)} width={50} trailColor="#ffec3d" strokeColor="#13c2c2" strokeWidth={15} style={{ color: 'white' }} />
                            <Typography style={{ fontWeight: 500, color: '#876800', fontSize: 12, marginTop: 3 }}>Operasional</Typography>
                            <Typography style={{ fontWeight: 500, color: 'black', fontSize: 12 }}>Rp {Number(pengeluaranStore.dataByDate?.nominal_jenis.operasional).toLocaleString()}</Typography>
                        </div>
                        </Col>
                        <Col style={{ backgroundColor: '#fadb14', height: 120, borderRadius: 5, padding: 10}} xs={{ span: 7, offset: 1 }} lg={{ span: 6, offset: 2 }}>
                        <div style={{ textAlign: "center", marginBottom: 10 }}>
                            <Progress type="circle" percent={toPercentByCategory(pengeluaranStore.dataByDate?.nominal_jenis.gaji, pengeluaranStore.dataByDate?.total_pengeluaran)} width={50} trailColor="#ffec3d" strokeColor="#eb2f96" strokeWidth={15} style={{ color: 'white' }} />
                            <Typography style={{ fontWeight: 500, color: '#876800', fontSize: 12, marginTop: 3 }}>gaji</Typography>
                            <Typography style={{ fontWeight: 500, color: 'black', fontSize: 12 }}>Rp {Number(pengeluaranStore.dataByDate?.nominal_jenis.gaji).toLocaleString()}</Typography>
                        </div>
                        </Col>
                    </Row>
                </div>
            </div>
            
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} style={{ maxHeight: 550, borderRadius: 20, paddingLeft : 10, paddingRight: 10 }}>
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
                <List.Item key={idx} style={{marginBottom: 10, border: 2, backgroundColor: "white", borderRadius: 15}}>
                <List.Item.Meta
                    title={<><a href="/" style={{ color: '#5b8c00', fontSize: 16 }}>{item.nama}</a><span style={{ color: 'gray', fontWeight: 300, fontSize: 14}}> ({item.jenis_pengeluaran})</span></>}
                    description={item.keterangan}
                    style={{marginTop: -20}}
                />
                <div style={{ fontSize: 20, fontWeight: 700, color: '#5b8c00' }}>Rp {Number(item.nominal).toLocaleString()}</div>
                </List.Item>
            )}
            />
            </div>
        </Col>
    </Row>    
  )
}

export default observer(PengeluaranIndexPage)