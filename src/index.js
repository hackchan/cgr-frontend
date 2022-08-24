import React, { Children } from 'react'
import { AppProvidercContext } from './contex/AppProvidercContext'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { GlobalStyle } from './styles/GlobalStyles'
import { App } from './routes/App'
const rootElemet = document.getElementById('root')
const root = createRoot(rootElemet)
root.render(
  <BrowserRouter>
    <GlobalStyle />
    <AppProvidercContext>
      <App />
    </AppProvidercContext>
  </BrowserRouter>
)
