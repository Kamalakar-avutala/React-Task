import { useState } from 'react'
import './App.scss'
import { PrimeReactContext } from 'primereact/api';
import 'primereact/resources/themes/md-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'primeicons/primeicons.css';
import {Provider} from 'react-redux';
import store from "./redux/store";
import Layout from './pages/Layout/Layout';
import { AuthProvider } from './routes/Authenticator';

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <div className="App">
          <Layout />
        </div>
      </AuthProvider>
    </Provider>
  )
}

export default App
