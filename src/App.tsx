import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { observer } from 'mobx-react-lite';
import { useStore } from './app/stores/store';
import { toJS } from 'mobx';

function App() {

  const { pengeluaranStore } = useStore();

  useEffect(() => {
    pengeluaranStore.getExampleList();
  },[pengeluaranStore]);

  console.log(toJS(pengeluaranStore.data));
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className='text-red-600'>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default observer(App);
