import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './app/component/layouts/Dashboard';
import { useStore } from './app/stores/store';
import LoginAccount from './features/account/LoginAccount';
import PengeluaranForm from './features/pengeluaran/PengeluaranForm';
import PengeluaranIndexPage from './features/pengeluaran/PengeluaranIndexPage';
import { Spin } from 'antd';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard/>,
    children: [
      {
        path: "pengeluaran",
        element: <PengeluaranIndexPage/>
      },
      {
        path: "pengeluaran/form",
        element: <PengeluaranForm/>
      },
    ]
  },
  {
    path: "login",
    element: <LoginAccount/>
  },
]);

function App() {

  const { commonStore, accountStore } = useStore();
  useEffect(() => {
    if (commonStore.token) {
      accountStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [accountStore, commonStore]);
  
  if (!commonStore.appLoaded) return(
    <div style={{ width: '100wh', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5' }}>
      <Spin tip="Sabar Ya" size="large">
      </Spin>
  </div>
    
  )

  return (
    <RouterProvider router={router} />
  )
}

export default observer(App);