import { Routes, Route } from 'react-router-dom'
import { Home } from "./pages/home.jsx"
import { Board } from "./pages/board.jsx"
import { MainHeader } from "./components/MainHeader.jsx"
import { MainSidebar } from "./components/MainSidebar.jsx"
import { store } from './store/store.js'
import { Provider } from 'react-redux'

function RootCmp() {

  return (
    <Provider store={store}>
      <div className="app-container">
        <header className="main-header">
          <MainHeader />
        </header>

        <div className="main-layout">
          <aside className="main-sidebar">
            <MainSidebar />
          </aside>

          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/boards/:boardId" element={<Board />} />
              <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
          </main>
        </div>
      </div>
    </Provider>
  );
}

export default RootCmp
