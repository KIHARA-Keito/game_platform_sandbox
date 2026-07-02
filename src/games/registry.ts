import { reflexGameModule } from './reflex-game'
import type { MiniGameModule } from './types'

export const gameRegistry: MiniGameModule[] = [reflexGameModule]

export function getGameById(id: string): MiniGameModule | undefined {
  return gameRegistry.find((game) => game.id === id)
}
