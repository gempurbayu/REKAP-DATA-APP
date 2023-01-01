import React from 'react';
import { Button, Form, Input, Layout, Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import { IAccountLoginValues } from '../../app/models/account';
import { useStore } from '../../app/stores/store';
import { Navigate } from 'react-router-dom';
import { LockTwoTone, MailTwoTone } from '@ant-design/icons';
import '../../index.css';

const initialValuesLogin: IAccountLoginValues = {
    email: '',
    password: '',
}

const { Title } = Typography;

const { Content } = Layout;

function LoginAccount() {

const { accountStore } = useStore();

  const onFinish = (values: IAccountLoginValues) => {
    accountStore.login(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  if (accountStore.isLoggedIn) {
    return <Navigate to="/" />;
  } 

  
  return (
    <Layout style={{width: '100wh', height: '100vh'}}>
      <Content style={{width: '100wh', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fcffe6'}}>
      <div style={{ width: 400,height: 300 ,padding: 10, backgroundColor: 'white', display: 'flex', alignItems: 'center', flexDirection: 'column', borderRadius: 20}}>
        <Title level={3} style={{ color: '#3f6600', marginBottom: -10}}>Welcome Back</Title>
        <p style={{ color: '#8c8c8c', marginBottom: 25}}>Enter your credentials to access the Apps</p>
        <Form
          name="basic"
          initialValues={initialValuesLogin}
          onFinish={onFinish}
          layout="vertical"
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input size="large" placeholder="Enter your email" prefix={<MailTwoTone style={{ marginRight: 5 }} twoToneColor='#a0d911'/>} style={{ fontSize: 16, width: 300 }}/>
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password placeholder="Enter your password" prefix={<LockTwoTone style={{ marginRight: 5 }} twoToneColor='#a0d911'/>} style={{ fontSize: 16, width: 300 }}/>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: 300,height: 40,backgroundColor: '#a0d911' }}>
                Sign In
              </Button>
            </Form.Item>
          </Form>
      </div>
      </Content>
    </Layout>
  );
};

export default observer(LoginAccount);