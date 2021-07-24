import { Tile, TileType, TileValue } from '/@/classes/Tile'

import { IMutable } from '/@/classes/interfaces'

/**
 * Class representing a obstacle tile, an extension of the usual tile of the game board.
 */
export class Obstacle extends Tile implements IMutable {
  _remaining: number

  /**
   * Create a game board obstacle tile.
   */
  constructor(remaining: number) {
    super(1 as TileValue, -1, -1, TileType.Obstacle)
    this._remaining = remaining
  }

  /**
   * Get the remaining moves needed before the deletion of the obstacle tile.
   * @return {number} The remaining moves needed before the deletion of the obstacle tile.
   */
  public get remainingMoves(): number {
    return this._remaining
  }

  /**
   * Decrement the remaining moves of the obstacle before its deletion.
   */
  public decrement(): void {
    this._remaining--
  }
}
