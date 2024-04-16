import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { MsgProvider } from './context/messageContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MsgProvider>
      <App />
    </MsgProvider>
  </React.StrictMode>
)
