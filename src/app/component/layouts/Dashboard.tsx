import React, { useState } from 'react';
import { Breadcrumb, Layout, theme } from 'antd';
import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

function Dashboard() {

    const [collapsed, setCollapsed] = useState(false);
  
    const {
        token: { colorBgContainer },
    } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar collapse={collapsed}/>
      <Layout className="site-layout">
        <Header style={{ paddingLeft: 10,marginTop: 20 , background: colorBgContainer }}>
        {collapsed? 
        (<MenuUnfoldOutlined style={{ fontSize : 30, marginLeft : 10 }} onClick={() => setCollapsed(false)}/>): 
        (<MenuFoldOutlined style={{ fontSize : 30, marginLeft : 10 }} onClick={() => setCollapsed(true)}/>)}
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <Outlet/>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default observer(Dashboard)