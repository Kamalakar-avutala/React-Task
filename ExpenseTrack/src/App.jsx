import { useState } from 'react'
import './App.scss'
import { PrimeReactContext } from 'primereact/api';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'primeicons/primeicons.css';
import AppRoutes from './AppRoutes';
import {Provider} from 'react-redux';
import store from "./redux/store"

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppRoutes />
      </div>
    </Provider>
  )
}

export default App
