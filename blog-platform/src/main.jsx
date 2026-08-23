import React from 'react'
import ReactDOM from 'react-dom/client'
import { BlogProvider } from './context/BlogContext'
import { ToastProvider } from './context/ToastContext'
import { ModalProvider } from './context/ModalContext'
import { ToastContainer } from './components/ui'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BlogProvider>
      <ToastProvider>
        <ModalProvider>
          <App />
          <ToastContainer />
        </ModalProvider>
      </ToastProvider>
    </BlogProvider>
  </React.StrictMode>,
)