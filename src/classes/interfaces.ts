import { Tile } from '/@/classes/Tile'

export interface IMoveable {
  hasMoved(): boolean | Tile | null
}

export interface IMutable {
  _remaining: number
  decrement(): void
}

export interface ICell {
  row: number
  column: number
}

export interface IManager {
  bernouilli(): number
  binomial(): number
  geometric(): number
  poisson(): number
  uniform(): number
}
