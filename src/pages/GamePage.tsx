import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { GameCanvasHost } from '../components/GameCanvasHost'
import { getGameById } from '../games/registry'
import { useAppStore } from '../store/useAppStore'

export function GamePage() {
  const { gameId } = useParams<{ gameId: string }>()
  const setLastPlayedGameId = useAppStore((state) => state.setLastPlayedGameId)
  const game = gameId ? getGameById(gameId) : undefined

  useEffect(() => {
    if (game) setLastPlayedGameId(game.id)
  }, [game, setLastPlayedGameId])

  if (!game) return <Navigate to="/" replace />

  return (
    <div className="flex h-screen flex-col">
      <header className="flex items-center gap-4 border-b border-gray-700 p-4">
        <Link to="/" className="text-sm text-blue-400 hover:underline">
          ← Back
        </Link>
        <h1 className="text-lg font-semibold text-white">{game.title}</h1>
      </header>
      <div className="flex-1">
        <GameCanvasHost module={game} />
      </div>
    </div>
  )
}
