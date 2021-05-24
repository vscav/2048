import { Tile, TileType } from '/@/classes/Tile'
import { IMutable } from '/@/classes/interfaces'

export class Secret extends Tile implements IMutable {
  _remaining: number

  constructor(value: number, remaining: number) {
    super(value, -1, -1, TileType.Secret)
    this._remaining = remaining
  }

  public get remainingMoves(): number {
    return this._remaining
  }

  public decrement(): void {
    this._remaining--
  }
}
