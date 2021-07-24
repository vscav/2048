import { Tile, TileType, TileValue } from '/@/classes/Tile'

import { IMutable } from '/@/classes/interfaces'

/**
 * Class representing a secret tile, an extension of the usual tile of the game board.
 */
export class Secret extends Tile implements IMutable {
  _remaining: number

  constructor(value: TileValue, remaining: number) {
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
