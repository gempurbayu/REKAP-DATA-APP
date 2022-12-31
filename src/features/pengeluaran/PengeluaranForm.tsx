import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  InputNumber,
  Card,
  message,
} from 'antd';
import { observer } from 'mobx-react-lite';
import dayjs from 'dayjs';
import { IPengeluaran } from '../../app/models/pengeluaran';
import { useStore } from '../../app/stores/store';

const initialValue = {
    nama : "",
    tgl_pengeluaran : new Date().toLocaleDateString("en-CA"),
    jenis_pengeluaran : "",
    nominal : 0,
    keterangan : "",
    created_by : ""
}

const { TextArea } = Input;

function PengeluaranForm() {

    const [messageApi, contextHolder] = message.useMessage();
    const { pengeluaranStore, commonStore } = useStore();
    const [form] = Form.useForm();

    const [pengeluaran, setPengeluaran] = useState<IPengeluaran>(initialValue);

    const handleDate = (e: dayjs.Dayjs | null) => {
        if(e){
            const tgl = e.format('YYYY-MM-DD');
            setPengeluaran({...pengeluaran, tgl_pengeluaran : tgl});
        }
    }

    const onFinishFailed = () => {
        message.error('Isi form dengan lengkap!');
      };

      const onFinish = async () => {
        await pengeluaranStore.create(pengeluaran);
        messageApi.open({
            type: 'success',
            content: 'Berhasil Menambahkan Data',
            duration: 2.5
          });
        setPengeluaran(initialValue);
        form.resetFields();
      };

      useEffect(() => {
        commonStore.setTitle('Pengeluaran');
      });   

  return (
    <Card title="Tambah Pengeluaran" bordered={false} headStyle={{backgroundColor: "#1677ff", color: 'white' }} style={{ minHeight: 360, background: "white", borderRadius: 10 }}>
      {contextHolder}
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="vertical"
        onFinishFailed={onFinishFailed}
        onFinish={onFinish}
        autoComplete="off"
        initialValues={initialValue}
      >
        <Form.Item label="Nama Pengeluaran" name="nama" rules={[{ required: true }, { type:'string', warningOnly: true }, { type: 'string', min: 2 }]} required>
          <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPengeluaran({...pengeluaran, [e.target.name] : e.target.value})} name="nama"/>
        </Form.Item>
        <Form.Item label="Jenis Pengeluaran" name="jenis pengeluaran" rules={[{ required: true }, { type:'string', warningOnly: true }]}>
          <Select className="jenis_pengeluaran" placeholder="Pilih Jenis Pengeluaran" onChange={(e) => setPengeluaran({...pengeluaran, jenis_pengeluaran : e})}>
            <Select.Option value="produksi">Produksi</Select.Option>
            <Select.Option value="operasional">Operasional</Select.Option>
            <Select.Option value="gaji">Gaji</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Tanggal Pengeluaran" name="tanggal" rules={[{ required: true }, { type:'date', warningOnly: true }]}>
          <DatePicker
            disabledDate={d => !d || d.isAfter(new Date())}
            onChange={(e) => handleDate(e)}
            name="tgl_pengeluaran"  
            placeholder='pilih tanggal'
          />
        </Form.Item>
        <Form.Item label="Nominal" name="nominal" rules={[{ required: true }, { type:'number', warningOnly: true }, { type: 'number', min: 2 }]}>
          <InputNumber prefix="Rp" style={{ width: '100%' }} onChange={(e:number | null) => setPengeluaran({...pengeluaran, nominal : e})} name="nominal"/>
        </Form.Item>
        <Form.Item label="Keterangan">
          <TextArea rows={2} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPengeluaran({...pengeluaran, [e.target.name] : e.target.value})} name="keterangan"/>
        </Form.Item>
        <Form.Item>
        <Button 
          type="primary"
          htmlType="submit"
          style={{ backgroundColor : "green", color: "white", width: 100, height: 40 }}
          disabled={pengeluaranStore.loadingForm}
          loading = {pengeluaranStore.loadingForm}
        >
          Submit
        </Button>
      </Form.Item>
      </Form>
    </Card>
  );
};

export default observer(PengeluaranForm) ;