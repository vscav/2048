import { Tile } from '/@/classes/Tile'
import { rotateLeft } from '/@/utils/matrix'

interface Cell {
  row: number
  column: number
}

export class Board {
  private readonly _size: number
  private readonly _deltaX = [-1, 0, 1, 0]
  private readonly _deltaY = [0, -1, 0, 1]
  private _tiles: Tile[]
  private _cells: Tile[][]
  private _won: boolean
  private _score = 0
  private _lastScore = {
    points: 0,
    animation: false,
  }

  constructor(size = 4) {
    if (size <= 0) {
      throw new Error(`Board size must be >= 0 (but was ${size})`)
    }
    this._size = size
    this._tiles = []
    this._cells = []
    for (let i = 0; i < this._size; ++i) {
      this._cells[i] = []
      for (let j = 0; j < this._size; ++j) {
        this._cells[i].push(this.addTile())
      }
    }
    this.addRandomTile()
    this.setPositions()
    this._won = false
  }

  public getTiles(): Tile[] {
    return this._tiles
  }

  public getCells(): Tile[][] {
    return this._cells
  }

  public getLastScorePoints(): number {
    return this._lastScore.points
  }

  public getLastScoreAnimation(): boolean {
    return this._lastScore.animation
  }

  public getScore(): number {
    return this._score
  }

  public hasWon(): boolean {
    return this._won
  }

  public hasLost(): boolean {
    let canMove = false
    for (let row = 0; row < this._size; ++row) {
      for (let column = 0; column < this._size; ++column) {
        canMove ||= this._cells[row][column].getValue() == 0
        for (let dir = 0; dir < 4; ++dir) {
          const newRow = row + this._deltaX[dir]
          const newColumn = column + this._deltaY[dir]
          if (
            newRow < 0 ||
            newRow >= this._size ||
            newColumn < 0 ||
            newColumn >= this._size
          ) {
            continue
          }
          canMove ||=
            this._cells[row][column].getValue() ==
            this._cells[newRow][newColumn].getValue()
        }
      }
    }
    return !canMove
  }

  private addTile(value = 0): Tile {
    const res: Tile = new Tile(value)
    this._tiles.push(res)

    return res
  }

  private addRandomTile(): void {
    const emptyCells: Cell[] = []
    for (let row = 0; row < this._size; ++row) {
      for (let column = 0; column < this._size; ++column) {
        if (this._cells[row][column].getValue() === 0) {
          emptyCells.push({ row, column })
        }
      }
    }
    const index = ~~(Math.random() * emptyCells.length) // Apply probability law here
    const cell = emptyCells[index] // The cell where the tile will be added (based on the index above)
    const newValue = Math.random() < 0.1 ? 4 : 2 // Apply probability law here (will it be a 2 or a 4? Current variable for 4: 0.1)

    this._cells[cell.row][cell.column] = this.addTile(newValue)
  }

  private setPositions(): void {
    this._cells.forEach((row, rowIndex) => {
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
    this._lastScore.animation = false

    this.clearOldTiles()

    for (let i = 0; i < direction; ++i) {
      this._cells = rotateLeft(this._cells)
    }

    const hasChanged = this.moveLeft()

    for (let i = direction; i < 4; ++i) {
      this._cells = rotateLeft(this._cells)
    }

    if (hasChanged) {
      this.addRandomTile()
    }

    this.setPositions()

    return this
  }

  private moveLeft(): boolean {
    let hasChanged = false

    for (let row = 0; row < this._size; ++row) {
      const currentRow = this._cells[row].filter(
        (tile) => tile.getValue() !== 0,
      )
      const resultRow: Tile[] = []

      for (let target = 0; target < this._size; ++target) {
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

          this._lastScore.points = targetTile.getValue()
          this._lastScore.animation = true
          this._score += this._lastScore.points
        }

        resultRow[target] = targetTile
        // Quick test (win on 8):
        // this.won ||= targetTile.getValue() === 8
        this._won ||= targetTile.getValue() === 2048
        hasChanged ||=
          targetTile.getValue() !== this._cells[row][target].getValue()
      }

      this._cells[row] = resultRow
    }

    return hasChanged
  }

  private clearOldTiles() {
    this._tiles = this._tiles.filter(
      (tile) => tile.getMarkForDeletion() === false,
    )
    this._tiles.forEach((tile) => {
      tile.setMarkForDeletion(true)
    })
  }
}
