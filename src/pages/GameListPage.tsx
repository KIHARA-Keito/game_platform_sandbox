import { Link } from 'react-router-dom'
import { gameRegistry } from '../games/registry'
import { useAppStore } from '../store/useAppStore'

export function GameListPage() {
  const lastPlayedGameId = useAppStore((state) => state.lastPlayedGameId)

  return (
    <div className="mx-auto max-w-3xl p-8">
      <h1 className="mb-6 text-3xl font-bold text-white">Game Platform Sandbox</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {gameRegistry.map((game) => (
          <Link
            key={game.id}
            to={`/games/${game.id}`}
            className="rounded-lg border border-gray-700 bg-gray-800 p-4 transition hover:border-blue-500"
          >
            <h2 className="text-xl font-semibold text-white">
              {game.title}
              {lastPlayedGameId === game.id && (
                <span className="ml-2 text-xs font-normal text-blue-400">Last played</span>
              )}
            </h2>
            <p className="mt-1 text-sm text-gray-400">{game.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
