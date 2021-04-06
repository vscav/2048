import { Tile, TileType } from '/@/classes/Tile'

export class Secret extends Tile {
  constructor() {
    const randomValue = Math.pow(2, Math.floor(Math.random() * 4) + 1)
    super(randomValue, -1, -1, TileType.Secret)
  }
}
