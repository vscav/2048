import { Tile } from '/@/classes/Tile'

interface Cell {
  row: number
  column: number
}

export class Board {
  readonly size: number
  private tiles!: Tile[]
  private cells!: Tile[][]
  private won: boolean

  constructor(size = 4) {
    this.size = size
    this.tiles = []
    this.cells = []
    for (let i = 0; i < this.size; ++i) {
      this.cells[i] = []
      for (let j = 0; j < this.size; ++j) {
        this.cells[i].push(this.addTile())
      }
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

  private addTile(value = 0): Tile {
    const res: Tile = new Tile(value)
    // Tile.apply(res, [])
    this.tiles.push(res)
    return res
  }

  private addRandomTile(): void {
    const emptyCells: Cell[] = []
    for (let row = 0; row < this.size; ++row) {
      for (let column = 0; column < this.size; ++column) {
        if (this.cells[row][column].getValue() === 0) {
          emptyCells.push({ row, column })
        }
      }
    }
    const index = ~~(Math.random() * emptyCells.length) // Apply probability law here
    const cell = emptyCells[index] // The cell where tjhe tile will be added (based on the index above)
    const newValue = Math.random() < 0.1 ? 4 : 2 // Apply probability law here (will it be a 2 or a 4? Current probability for 4: 0.1)

    try {
      this.cells[cell.row][cell.column] = this.addTile(newValue)
    } catch (error) {
      console.log('[error] There are no more availabled empty cells.')
    }
  }

  private setPositions(): void {
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

  public move(direction: number): Board {
    console.log('has moved with a diretion of ' + direction)

    // TODO: moveLeft call

    // TODO: if the move change the board/positions, then add a random tile:
    this.addRandomTile()

    this.setPositions()

    return this
  }

  // TODO: move left function (private)

  // TODO: clear old tiles function
}
