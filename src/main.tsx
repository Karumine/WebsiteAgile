import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

document.querySelectorAll<HTMLLinkElement>('link[data-async-style]').forEach((link) => {
  link.media = 'all'
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
