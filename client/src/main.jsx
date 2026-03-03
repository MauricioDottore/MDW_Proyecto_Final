import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store, persistor } from './redux/store.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'; 



ReactDOM.createRoot(document.getElementById('root')).render(
  // 1. El Provider envuelve TODO para dar acceso al store
  <Provider store={store}>
    {/* 2. El PersistGate espera a que los datos se carguen antes de mostrar la App */}
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);