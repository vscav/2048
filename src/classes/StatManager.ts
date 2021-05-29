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

  get total(): number {
    return this._tiles.length
  }

  public getTotalByType(t: string): number {
    return this._tiles.filter((tile) => tile.type === t).length
  }
}
