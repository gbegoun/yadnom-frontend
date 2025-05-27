import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { HomePage } from "./pages/HomePage.jsx"
import { Board } from "./pages/Board.jsx"
import { MainHeader } from "./components/MainHeader.jsx"
import { MainSidebar } from "./components/MainSidebar.jsx"
import { ModalProvider } from './contexts/modal/ModalContext.jsx'
import { store } from './store/store.js'
import { Provider } from 'react-redux'
import { loadUsers } from './store/actions/user.actions.js'
import { loadBoards } from './store/actions/board.actions.js'
import { RightPanel } from './components/RightPanel.jsx'
import { RightPanelProvider } from './contexts/rightPanel/RightPanelContext.jsx'

function RootCmp() {
  useEffect(() => {
    // Load users and boards when the application starts
    loadUsers()
    loadBoards()
  }, [])

  return (

    <Provider store={store}>
      <ModalProvider>
        <RightPanelProvider>
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

              <div className="right-side-panel-container">
                <RightPanel />
              </div>
            </div>
          </div>
        </RightPanelProvider>
      </ModalProvider>
    </Provider>

  )
}

export default RootCmp
