import { Tile, TileType, TileValue } from '/@/classes/Tile'

import { IStatManager } from '/@/classes/interfaces'

import { fil } from '/@/lib/array'

/**
 * Class representing a game statistics manager.
 */
export class StatManager implements IStatManager {
  private readonly _tiles: Tile[]

  /**
   * Create a game statistics manager.
   */
  constructor() {
    this._tiles = new Array<Tile>()
  }

  /**
   * Add a tile in the structure of the statistics manager.
   * @param {Tile} t - A tile to add in the structure of the statistics manager.
   */
  public add(t: Tile): void {
    this._tiles.push(t)
  }

  /**
   * Count the number of specific tiles based on search parameters (type and value).
   * @param {TileType} type - The type of tile, used as a search parameter.
   * @param {number} [value = -1] - The value associated to the tile, used as a search parameter.
   * @return {number} The count of the searched tiles.
   */
  public count(type: TileType, value: TileValue = -1): number {
    return fil(
      (tile) =>
        tile.type === type && (value !== -1 ? tile.value === value : true),
      this._tiles,
    ).length
  }
}
