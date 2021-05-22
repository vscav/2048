import { Tile, TileType } from '/@/classes/Tile'
import { Mutable } from '/@/classes/interfaces'

export class Obstacle extends Tile implements Mutable {
  _remaining: number

  constructor(remaining: number) {
    super(1, -1, -1, TileType.Obstacle)
    this._remaining = remaining
  }

  public get remainingMoves(): number {
    return this._remaining
  }

  public decrement(): void {
    this._remaining--
  }
}
