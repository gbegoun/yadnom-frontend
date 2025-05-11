//import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home } from "./pages/home.jsx"
import { Board } from "./pages/board.jsx"
import { MainHeader } from "./components/MainHeader.jsx"
import { MainSidebar } from "./components/MainSidebar.jsx"
import { ModalProvider } from './contexts/modal/ModalContext.jsx'
import { store } from './store/store.js'
import { Provider } from 'react-redux'
import { useEffect } from 'react'

function RootCmp() {

  // Ofir - I put this here for farther consideration, I'm not sure if we need it here or inside the index.html file
  useEffect(() => {
    // Dynamically create the modal root div
    const modalRoot = document.createElement('div');
    modalRoot.id = 'modal-root';
    document.body.appendChild(modalRoot);

    // Cleanup on unmount
    return () => {
      document.body.removeChild(modalRoot);
    };
  }, []);

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
                <Route path="/" element={<Home />} />
                <Route path="/boards/:boardId" element={<Board />} />
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
