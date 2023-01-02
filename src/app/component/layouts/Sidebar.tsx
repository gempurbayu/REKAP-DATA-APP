import { CloseOutlined, CreditCardOutlined, FileOutlined, MinusSquareOutlined, PieChartOutlined, PlusSquareOutlined, TeamOutlined } from '@ant-design/icons';
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
  getItem('Pemasukan', '/pemasukan', <PlusSquareOutlined />, [
    getItem('List Pemasukan', '/pemasukan/'),
    getItem('Input Pemasukan', '/pemasukan/form'),
  ]),
  getItem('Pengeluaran', '/pengeluaran', <MinusSquareOutlined />, [
    getItem('List Pengeluaran', '/pengeluaran/'),
    getItem('Input Pengeluaran', '/pengeluaran/form'),
  ]),
  getItem('Belanja', '/belanja', <CreditCardOutlined />, [
    getItem('List Belanja', '/belanja/'),
    getItem('Input Belanja', '/belanja/form'),
  ]),
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