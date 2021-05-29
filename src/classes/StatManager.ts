import { Tile } from '/@/classes/Tile'

import { IStatManager } from '/@/classes/interfaces'

export class StatManager implements IStatManager {
  private readonly _tiles: Tile[]

  constructor() {
    this._tiles = new Array<Tile>()
  }

  public add(t: Tile): void {
    this._tiles.push(t)
  }

  public count(type: string, value = -1): number {
    return this._tiles.filter(
      (tile) =>
        tile.type === type && (value !== -1 ? tile.value === value : value),
    ).length
  }
}
