import { CloseOutlined, DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Drawer, Menu, MenuProps } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom';

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
    collapse: boolean,
    setClose : () => void
}

function Sidebar(props : sideProps) {

  const { collapse, setClose } = props;
  const navigate = useNavigate();

  return (
    <Drawer open={collapse} onClose={setClose} closeIcon={<CloseOutlined style={{ color: 'white' }}/>} title={<p style={{ color: 'white', fontSize:24 }}>Rekap Data</p>} placement="left" style={{ backgroundColor: '#001529'}} width='250px'>
        <div style={{ width: "100%", textAlign: "left", marginLeft: 30, marginTop: -40}}>
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={(e) => {navigate(e.key); setClose()}} />
    </Drawer>
  )
}

export default Sidebar