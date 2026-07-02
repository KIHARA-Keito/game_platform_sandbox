import { useEffect, useRef } from 'react'
import type { MiniGameModule } from '../games/types'

interface GameCanvasHostProps {
  module: MiniGameModule
}

export function GameCanvasHost({ module }: GameCanvasHostProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const game = module.create()
    game.mount(container)

    return () => {
      game.destroy()
    }
  }, [module])

  return <div ref={containerRef} className="h-full w-full" />
}
