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
    const mountResult = game.mount(container)
    let unmountedBeforeReady = false

    Promise.resolve(mountResult).then(() => {
      if (unmountedBeforeReady) game.destroy()
    })

    return () => {
      if (mountResult instanceof Promise) {
        // Destroying mid-init crashes Pixi (e.g. React StrictMode's mount->cleanup->mount
        // cycle in dev). Defer to the .then() above once mount actually finishes.
        unmountedBeforeReady = true
      } else {
        game.destroy()
      }
    }
  }, [module])

  return <div ref={containerRef} className="h-full w-full" />
}
