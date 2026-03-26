import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Hide loading screen after React app starts
const hideLoadingScreen = () => {
  const loadingScreen = document.getElementById('loading-screen')
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.classList.add('fade-out')
      setTimeout(() => {
        loadingScreen.remove()
      }, 500)
    }, 1000) // Show loading screen for at least 1 second
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Hide loading screen when React is ready
hideLoadingScreen()