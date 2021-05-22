import { Tile } from '/@/classes/Tile'

export interface Moveable {
  hasMoved(): boolean | Tile | null
}

export interface Mutable {
  _remaining: number
  decrement(): void
}

export interface Cell {
  row: number
  column: number
}

export interface Manager {
  bernouilli(): number
  binomial(): number
  geometric(): number
  poisson(): number
  uniform(): number
}
