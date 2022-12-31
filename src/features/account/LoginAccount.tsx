import React from 'react';
import { Button, Form, Input } from 'antd';
import { observer } from 'mobx-react-lite';
import { IAccountLoginValues } from '../../app/models/account';
import { useStore } from '../../app/stores/store';
import { Navigate } from 'react-router-dom';

const initialValuesLogin: IAccountLoginValues = {
    email: '',
    password: '',
  }

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
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={initialValuesLogin}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default observer(LoginAccount);