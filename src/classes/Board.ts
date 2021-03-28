import { Tile } from '/@/classes/Tile'
import { rotateLeft } from '/@/utils/matrix'

interface Cell {
  row: number
  column: number
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
      this.cells[i] = []
      for (let j = 0; j < this.size; ++j) {
        this.cells[i].push(this.addTile())
      }
    }
    this.addRandomTile()
    this.setPositions()
    this.won = false

    // console.log(this.cells)
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
    const cell = emptyCells[index] // The cell where the tile will be added (based on the index above)
    const newValue = Math.random() < 0.1 ? 4 : 2 // Apply probability law here (will it be a 2 or a 4? Current variable for 4: 0.1)

    this.cells[cell.row][cell.column] = this.addTile(newValue)
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
    // console.log('has moved with a direction of ' + direction)

    this.clearOldTiles()

    for (let i = 0; i < direction; ++i) {
      this.cells = rotateLeft(this.cells)
    }

    const hasChanged = this.moveLeft()

    for (let i = direction; i < 4; ++i) {
      this.cells = rotateLeft(this.cells)
    }

    if (hasChanged) {
      this.addRandomTile()
    }

    this.setPositions()

    return this
  }

  private moveLeft(): boolean {
    let hasChanged = false

    for (let row = 0; row < this.size; ++row) {
      const currentRow = this.cells[row].filter((tile) => tile.getValue() !== 0)
      const resultRow: Tile[] = []

      for (let target = 0; target < this.size; ++target) {
        let targetTile: Tile = currentRow.length
          ? (currentRow.shift() as Tile)
          : this.addTile()

        if (
          currentRow.length > 0 &&
          currentRow[0].getValue() === targetTile.getValue()
        ) {
          const tile1 = targetTile
          targetTile = this.addTile(targetTile.getValue())
          tile1.setMergedInto(targetTile)

          const tile2 = currentRow.shift() as Tile
          tile2.setMergedInto(targetTile)
          targetTile.setValue(targetTile.getValue() + tile2.getValue())
        }

        resultRow[target] = targetTile
        this.won ||= targetTile.getValue() === 2048
        hasChanged ||=
          targetTile.getValue() !== this.cells[row][target].getValue()
      }

      this.cells[row] = resultRow
    }

    return hasChanged
  }

  private clearOldTiles() {
    this.tiles = this.tiles.filter(
      (tile) => tile.getMarkForDeletion() === false,
    )
    this.tiles.forEach((tile) => {
      tile.setMarkForDeletion(true)
    })
  }
}
