import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import { store } from './store/store.js'
import { BrowserRouter as Router } from 'react-router-dom'
import RootCmp from './RootCmp.jsx'
import './assets/styles/main.scss'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <RootCmp />
    </Router>
  </Provider>
)
