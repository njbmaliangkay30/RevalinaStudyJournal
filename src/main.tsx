import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
// PENTING: Baris di bawah ini yang memanggil seluruh CSS Asli Anda!
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
