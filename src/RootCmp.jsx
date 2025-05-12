import { Routes, Route } from 'react-router-dom'
import { HomePage } from "./pages/HomePage.jsx"
import { Board } from "./pages/Board.jsx"
import { MainHeader } from "./components/MainHeader.jsx"
import { MainSidebar } from "./components/MainSidebar.jsx"
import { ModalProvider } from './contexts/modal/ModalContext.jsx'
import { store } from './store/store.js'
import { Provider } from 'react-redux'

function RootCmp() {
  return (

    <Provider store={store}>
      <ModalProvider>
        <div className="app-container">
          <header className="main-header">
            <MainHeader />
          </header>

          <div className="main-layout">
            <aside className="main-sidebar">
              <MainSidebar />
            </aside>

            <main className="main-content">
              <Routes>
                <Route path="" element={<HomePage />} />
                <Route path="/board/:boardId" element={<Board />} />
                <Route path="*" element={<h1>404 Not Found</h1>} />
              </Routes>
            </main>
          </div>
        </div>
      </ModalProvider>
    </Provider>

  )
}

export default RootCmp
