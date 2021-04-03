import { Tile, TileType } from '/@/classes/Tile'

export class Joker extends Tile {
  constructor() {
    super(1, -1, -1, TileType.Joker)
  }
}
