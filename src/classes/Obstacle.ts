import { Tile, TileType, TileValue } from '/@/classes/Tile'

import { IMutable } from '/@/classes/interfaces'

/**
 * Class representing a obstacle tile, an extension of the usual tile of the game board.
 */
export class Obstacle extends Tile implements IMutable {
  _remaining: number

  constructor(remaining: number) {
    super(1 as TileValue, -1, -1, TileType.Obstacle)
    this._remaining = remaining
  }

  public get remainingMoves(): number {
    return this._remaining
  }

  public decrement(): void {
    this._remaining--
  }
}
