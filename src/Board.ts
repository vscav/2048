import { Tile } from '/@/Tile'

interface Cell {
  r: number
  c: number
}

export class Board {
  readonly size: number
  private tiles: Tile[]
  private cells: Tile[][]
  private won: boolean

  constructor(size = 4) {
    this.size = size
    this.tiles = []
    this.cells = []
    for (let i = 0; i < this.size; ++i) {
      this.cells[i] = [
        this.addTile(),
        this.addTile(),
        this.addTile(),
        this.addTile(),
      ]
    }
    this.addRandomTile()
    this.setPositions()
    this.won = false
  }

  public getTiles(): Tile[] {
    return this.tiles
  }

  public getCells(): Tile[][] {
    return this.cells
  }

  public hasWon(): boolean {
    return this.won
  }

  public addTile(value = 0): Tile {
    const res: Tile = new Tile(value)
    // Tile.apply(res, [])
    this.tiles.push(res)
    return res
  }

  public addRandomTile(): void {
    const emptyCells: Cell[] = []
    for (let r = 0; r < this.size; ++r) {
      for (let c = 0; c < this.size; ++c) {
        if (this.cells[r][c].getValue() === 0) {
          emptyCells.push({ r: r, c: c })
        }
      }
    }
    const index = ~~(Math.random() * emptyCells.length) // Apply probability here
    const cell = emptyCells[index]
    const newValue = Math.random() < 0.1 ? 4 : 2 // Apply probability here
    // console.log(newValue)
    this.cells[cell.r][cell.c] = this.addTile(newValue)
  }

  public setPositions(): void {
    this.cells.forEach((row, rowIndex) => {
      row.forEach((tile, columnIndex) => {
        tile.setOldRow(tile.getRow())
        tile.setOldColumn(tile.getColumn())
        tile.setRow(rowIndex)
        tile.setColumn(columnIndex)
        tile.setMarkForDeletion(false)
      })
    })
  }
}
