import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, MenuProps, Typography } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const { Sider } = Layout;
const { Title } = Typography;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Dashboard', '/', <PieChartOutlined />),
  getItem('Pengeluaran', '/pengeluaran', <DesktopOutlined />, [
    getItem('List Pengeluaran', '/pengeluaran/'),
    getItem('Input Pengeluaran', '/pengeluaran/form'),
  ]),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />),
];

interface sideProps {
    collapse: boolean
}

function Sidebar(props : sideProps) {

  const { collapse } = props;
  const navigate = useNavigate();

  let w = 0;
  collapse? w =220 : w=0;


  return (
    <Sider trigger={null} collapsedWidth="0" width={w}>
        <div style={{ width: "100%", textAlign: "left", marginLeft: 30}}>
            <Title level={3} style={{color : "white"}}>Rekap Data</Title>
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={(e) => navigate(e.key)} />
    </Sider>
  )
}

export default Sidebar