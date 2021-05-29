import { Tile } from '/@/classes/Tile'

export interface ICell {
  row: number
  column: number
}

export interface IManager {
  simulateBernouilli(): number
  simulateBinomial(): number
  simulateGeometric(): number
  simulatePoisson(): number
  simulateUniform(): number
}

export interface IMoveable {
  hasMoved(): boolean | Tile | null
}

export interface IMutable {
  _remaining: number
  decrement(): void
}
