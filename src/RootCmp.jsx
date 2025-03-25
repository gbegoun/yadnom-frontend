import { Routes, Route } from 'react-router-dom'
import { Home } from "./pages/home.jsx"
import { Board } from "./pages/board.jsx"

function RootCmp() {

  return (
    <>
      <header>
        {/* You can add navigation links here */}
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/boards/" element={<Board/>} />
          <Route path="/boards/:boardId" element={<Board/>} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </main>
    </>
  );
}

export default RootCmp
