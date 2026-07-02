import { Route, Routes } from 'react-router-dom'
import { GameListPage } from './pages/GameListPage'
import { GamePage } from './pages/GamePage'

function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Routes>
        <Route path="/" element={<GameListPage />} />
        <Route path="/games/:gameId" element={<GamePage />} />
      </Routes>
    </div>
  )
}

export default App
