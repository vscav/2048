import { Tile, TileType, TileValue } from '/@/classes/Tile'

export interface ICell {
  row: number
  column: number
}

export interface IProbManager {
  simulateBernouilli(): number
  simulateBinomial(): number
  simulateGeometric(): number
  simulatePoisson(): number
  simulateUniform(): number
}

export interface IStatManager {
  // eslint-disable-next-line no-unused-vars
  count(type: TileType, value: TileValue): number
}

export interface IMoveable {
  hasMoved(): boolean | Tile | null
}

export interface IMutable {
  _remaining: number
  decrement(): void
}
