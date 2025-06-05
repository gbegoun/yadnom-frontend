import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { HomePage } from "./pages/HomePage.jsx"
import { Board } from "./pages/board.jsx"
import { Welcome } from "./pages/Welcome.jsx"
import { MainHeader } from "./components/MainHeader.jsx"
import { MainSidebar } from "./components/MainSidebar.jsx"
import { ModalProvider } from './contexts/modal/ModalContext.jsx'
import { store } from './store/store.js'
import { Provider } from 'react-redux'
import { loadUsers, loginUserFromCookies } from './store/actions/user.actions.js'
import { loadBoards } from './store/actions/board.actions.js'
import { RightPanel } from './components/RightPanel.jsx'
import { RightPanelProvider } from './contexts/rightPanel/RightPanelContext.jsx'
import SignUp from './pages/SignUp.jsx'


function RootCmp() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isWelcomePage = location.pathname === '/welcome';

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await loginUserFromCookies();
        await loadUsers()
        await loadBoards()
      } catch (err) {

        console.log('No user found in cookies, continuing as guest');
        // Still load other data even if no user
        // await loadUsers();
        // await loadBoards();
      }
    }
    initializeApp();
  }, [])

  return (

    <Provider store={store}>
      <ModalProvider>
        <RightPanelProvider>
          <Routes>
            <Route path='/login' element={<SignUp />} />
            <Route path='/welcome' element={<Welcome />} />
          </Routes>
          {!isLoginPage && !isWelcomePage && (
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
                    <Route path="/" element={<HomePage />} />
                    <Route path="/board/:boardId" element={<Board />} />
                    <Route path="*" element={<h1>404 Not Found</h1>} />
                  </Routes>
                </main>

                <RightPanel />
              </div>
            </div>
          )}
        </RightPanelProvider>
      </ModalProvider>
    </Provider>

  )
}

export default RootCmp
