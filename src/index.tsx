import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import 'antd/dist/antd.css'
import { setupStore } from './store/store'

const container = document.getElementById('root')!
const root = createRoot(container)
const store = setupStore()

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
