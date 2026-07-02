export interface MiniGame {
  id: string
  title: string
  description: string
  mount(container: HTMLElement): void | Promise<void>
  destroy(): void
}

export interface MiniGameModule {
  id: string
  title: string
  description: string
  create(): MiniGame
}
