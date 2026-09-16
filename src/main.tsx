import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/styles/index.css'
import './shared/config/theme'
import App from './app/App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
