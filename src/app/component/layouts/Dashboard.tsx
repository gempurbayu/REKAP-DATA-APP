import React, { useState } from 'react';
import { Layout, Typography } from 'antd';
import { observer } from 'mobx-react-lite';
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { MenuOutlined } from '@ant-design/icons';
import { useStore } from '../../stores/store';

const { Header, Content, Footer } = Layout;

function Dashboard() {

    const [collapsed, setCollapsed] = useState(false);
    const { commonStore, accountStore } = useStore();
    
    if (!accountStore.isLoggedIn) {
      return <Navigate to="/login" />;
    } 

    const setClose = () => {
      setCollapsed(false);
    } 

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar collapse={collapsed} setClose={setClose}/>
      <Layout style={{ backgroundColor: '#f5f5f5' }}>
        <Header style={{ padding: 5, marginLeft: 20, marginRight: 20, marginTop: 20, borderRadius: 10, backgroundColor:"transparent" }}>
        <div style={{ display: "inline-flex", alignItems: "center", width:'100%' }}>
          <MenuOutlined style={{ fontSize : 30, marginRight: 15, color: 'gray' }} onClick={() => setCollapsed(true)}/>
          <div style={{ display: "inline-flex", alignItems: "center", width: "100%", justifyContent: "space-between"}}>
            <Typography style={{ fontSize: 24, fontWeight: 700, color: 'gray' }}>{commonStore.title}</Typography>
            <Typography onClick={() => accountStore.logout() } style={{ cursor: 'pointer' }}>Keluar</Typography>
          </div>
        </div>
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