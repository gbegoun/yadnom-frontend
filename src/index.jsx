import { createRoot } from 'react-dom/client'
import RootCmp from './RootCmp.jsx'
import './assets/styles/main.scss'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <RootCmp />
    </Router>
  </Provider>
)
