import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App.jsx'
import { BrowserRouter } from 'react-router-dom'

// place css in the src/style directory, and import them like this:
import './style/index.css'


createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </React.StrictMode>,
  
)