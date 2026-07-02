import { Application, Graphics, Text } from 'pixi.js'
import type { MiniGame, MiniGameModule } from '../types'

type Phase = 'waiting' | 'ready' | 'result'

class ReflexGame implements MiniGame {
  id = 'reflex-game'
  title = 'Reflex Game'
  description = 'Click the circle as soon as it turns green.'

  private app = new Application()
  private circle = new Graphics()
  private label = new Text({ text: '', style: { fill: '#ffffff', fontSize: 24 } })
  private phase: Phase = 'waiting'
  private readyAt = 0
  private timeoutId: ReturnType<typeof setTimeout> | null = null

  async mount(container: HTMLElement) {
    await this.app.init({ background: '#111827', resizeTo: container })
    container.appendChild(this.app.canvas)

    this.circle.eventMode = 'static'
    this.circle.cursor = 'pointer'
    this.circle.on('pointerdown', () => this.handleClick())
    this.app.stage.addChild(this.circle)

    this.label.anchor.set(0.5)
    this.app.stage.addChild(this.label)

    this.app.renderer.on('resize', () => this.layout())
    this.layout()
    this.scheduleRound()
  }

  destroy() {
    if (this.timeoutId) clearTimeout(this.timeoutId)
    this.app.destroy(true, { children: true })
  }

  private layout() {
    const { width, height } = this.app.screen
    this.circle.position.set(width / 2, height / 2 - 20)
    this.label.position.set(width / 2, height / 2 + 80)
  }

  private drawCircle(color: number) {
    this.circle.clear()
    this.circle.circle(0, 0, 60).fill(color)
  }

  private scheduleRound() {
    this.phase = 'waiting'
    this.drawCircle(0x374151)
    this.label.text = 'Wait for green...'
    const delay = 1000 + Math.random() * 2000
    this.timeoutId = setTimeout(() => {
      this.phase = 'ready'
      this.readyAt = performance.now()
      this.drawCircle(0x22c55e)
      this.label.text = 'Click now!'
    }, delay)
  }

  private handleClick() {
    if (this.phase === 'waiting') {
      this.label.text = 'Too soon! Click to retry.'
      this.drawCircle(0xef4444)
      this.phase = 'result'
      if (this.timeoutId) clearTimeout(this.timeoutId)
      this.circle.once('pointerdown', () => this.scheduleRound())
      return
    }
    if (this.phase === 'ready') {
      const reactionMs = Math.round(performance.now() - this.readyAt)
      this.label.text = `${reactionMs}ms — click to retry.`
      this.drawCircle(0x2563eb)
      this.phase = 'result'
      this.circle.once('pointerdown', () => this.scheduleRound())
    }
  }
}

export const reflexGameModule: MiniGameModule = {
  id: 'reflex-game',
  title: 'Reflex Game',
  description: 'Click the circle as soon as it turns green.',
  create: () => new ReflexGame(),
}
