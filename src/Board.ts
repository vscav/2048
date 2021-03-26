export class Board {
  readonly size: number
  private tiles: []
  private cells: []
  private won: boolean

  constructor(size = 4) {
    this.size = size
    this.tiles = []
    this.cells = []
    this.won = false
  }

  public getTiles(): [] {
    return this.tiles
  }

  public getCells(): [] {
    return this.cells
  }

  public getWinningStatus(): boolean {
    return this.won
  }
}
