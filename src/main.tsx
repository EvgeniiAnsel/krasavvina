import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// С плавным скроллом (Lenis) восстановление позиции браузером мешает —
// всегда открываем страницу сверху.
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
  window.scrollTo(0, 0)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
