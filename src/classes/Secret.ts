import { Tile, TileType, TileValue } from '/@/classes/Tile'

import { IMutable } from '/@/classes/interfaces'

/**
 * Class representing a secret tile, an extension of the usual tile of the game board.
 */
export class Secret extends Tile implements IMutable {
  _remaining: number

  /**
   * Create a game board secret tile.
   */
  constructor(value: TileValue, remaining: number) {
    super(value, -1, -1, TileType.Secret)
    this._remaining = remaining
  }

  /**
   * Get the remaining moves needed before the deletion of the secret tile.
   * @return {number} The remaining moves needed before the deletion of the secret tile.
   */
  public get remainingMoves(): number {
    return this._remaining
  }

  /**
   * Decrement the remaining moves of the secret before its deletion.
   */
  public decrement(): void {
    this._remaining--
  }
}
