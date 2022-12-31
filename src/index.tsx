import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { store, StoreContext } from './app/stores/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PengeluaranIndexPage from './features/pengeluaran/PengeluaranIndexPage';
import Dashboard from './app/component/layouts/Dashboard';
import PengeluaranForm from './features/pengeluaran/PengeluaranForm';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

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
]);

root.render(
  <StoreContext.Provider value={store}>
    <RouterProvider router={router} />
  </StoreContext.Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
