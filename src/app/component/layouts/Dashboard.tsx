import React, { useState } from 'react';
import { Layout, theme } from 'antd';
import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

function Dashboard() {

    const [collapsed, setCollapsed] = useState(false);

    const setClose = () => {
      setCollapsed(false);
    }
  
    const {
        token: { colorBgContainer },
    } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar collapse={collapsed} setClose={setClose}/>
      <Layout style={{ backgroundColor: '#f5f5f5' }}>
        <Header style={{ padding: 5, marginLeft: 20, marginRight: 20, marginTop: 20 , background: colorBgContainer, borderRadius: 10 }}>
        {collapsed? 
        (<MenuUnfoldOutlined style={{ fontSize : 30, marginLeft : 10 }} onClick={() => setCollapsed(false)}/>): 
        (<MenuFoldOutlined style={{ fontSize : 30, marginLeft : 10 }} onClick={() => setCollapsed(true)}/>)}
        </Header>
        <Content style={{ margin: '10px 16px' }}>
          <Outlet/>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Gempur Dev @2022</Footer>
      </Layout>
    </Layout>
  );
};

export default observer(Dashboard)