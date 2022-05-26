import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { App } from './routes/App'
const rootElemet = document.getElementById('root')
const root = createRoot(rootElemet)
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
