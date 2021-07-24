import { Tile, TileType, TileValue } from '/@/classes/Tile'

/**
 * Class representing a joker tile, an extension of the usual tile of the game board.
 */
export class Joker extends Tile {
  constructor() {
    super(1 as TileValue, -1, -1, TileType.Joker)
  }
}
