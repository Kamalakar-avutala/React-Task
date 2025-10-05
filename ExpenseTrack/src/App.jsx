import { useState } from 'react'
import './App.scss'
import { PrimeReactContext } from 'primereact/api';
import 'primereact/resources/themes/md-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'primeicons/primeicons.css';
import {Provider} from 'react-redux';
import store from "./redux/store"
import Layout from './components/Layout/Layout'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
          <Layout />
      </div>
    </Provider>
  )
}

export default App
