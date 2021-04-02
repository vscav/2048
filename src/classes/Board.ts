import { rotateLeft } from '/@/lib/matrix'
import { Obstacle } from '/@/classes/Obstacle'
import { ProbManager } from '/@/classes/ProbManager'
import { Tile } from '/@/classes/Tile'

interface Cell {
  row: number
  column: number
}

export class Board {
  private readonly _probabilityManager: ProbManager
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
        this._cells[i].push(this.addTile(0))
      }
    }
    this._probabilityManager = new ProbManager()
    this.addRandomTile()
    this.setPositions()
    this._won = false
  }

  public get tiles(): Tile[] {
    return this._tiles
  }

  public get cells(): Tile[][] {
    return this._cells
  }

  public get lastScorePoints(): number {
    return this._lastScore.points
  }

  public get lastScoreAnimation(): boolean {
    return this._lastScore.animation
  }

  public get score(): number {
    return this._score
  }

  public hasWon(): boolean {
    return this._won
  }

  public hasLost(): boolean {
    let canMove = false
    for (let row = 0; row < this._size; ++row) {
      for (let column = 0; column < this._size; ++column) {
        canMove ||= this._cells[row][column].value == 0
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
            this._cells[row][column].value ===
            this._cells[newRow][newColumn].value &&
            this._cells[newRow][newColumn].value !== 'x'
        }
      }
    }
    return !canMove
  }

  private addTile(value: number | string): Tile {
    const res: Tile = new Tile(value)
    this._tiles.push(res)

    return res
  }

  private addObstacle(): Obstacle {
    const res: Obstacle = new Obstacle()
    this._tiles.push(res)

    return res
  }

  private addRandomTile(): void {
    const emptyCells: Cell[] = []
    for (let row = 0; row < this._size; ++row) {
      for (let column = 0; column < this._size; ++column) {
        if (this._cells[row][column].value === 0) {
          emptyCells.push({ row, column })
        }
      }
    }

    const uniformValue1 = this._probabilityManager.uniform()

    const index = ~~(uniformValue1 * emptyCells.length)
    const cell = emptyCells[index]
    const newValue = uniformValue1 < 0.1 ? 4 : 2

    const uniformValue2 = this._probabilityManager.uniform()

    this._cells[cell.row][cell.column] =
      uniformValue2 < 0.01 ? this.addObstacle() : this.addTile(newValue)
  }

  private setPositions(): void {
    this._cells.forEach((row, rowIndex) => {
      row.forEach((tile, columnIndex) => {
        tile.oldRow = tile.row
        tile.oldColumn = tile.column
        tile.row = rowIndex
        tile.column = columnIndex
        tile.markForDeletion = false
      })
    })
  }

  public move(direction: number): Board {
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
    let mergingCount = 0

    for (let row = 0; row < this._size; ++row) {
      const currentRow = this._cells[row].filter((tile) => tile.value !== 0)
      const resultRow: Tile[] = []

      for (let target = 0; target < this._size; ++target) {
        let targetTile: Tile = currentRow.length
          ? (currentRow.shift() as Tile)
          : this.addTile(0)

        if (
          currentRow.length > 0 &&
          typeof currentRow[0].value !== 'string' &&
          currentRow[0].value === targetTile.value
        ) {
          const tile1 = targetTile
          targetTile = this.addTile(targetTile.value)
          tile1.mergedInto = targetTile

          const tile2 = currentRow.shift() as Tile
          tile2.mergedInto = targetTile
          targetTile.value =
            (targetTile.value as number) + (tile2.value as number)

          this._lastScore.points = targetTile.value
          this._lastScore.animation = true
          this._score += this._lastScore.points
        }

        resultRow[target] = targetTile
        // Quick test (win on 8):
        // this.won ||= targetTile.value === 8
        this._won ||= targetTile.value === 2048
        hasChanged ||= targetTile.value !== this._cells[row][target].value
        mergingCount =
          targetTile.value !== this._cells[row][target].value
            ? mergingCount + 1
            : mergingCount
      }

      this._cells[row] = resultRow
    }

    for (let row = 0; row < this._size; ++row) {
      const currentRow = this._cells[row].filter((tile) => tile.value !== 0)

      for (let column = 0; column < this._size; ++column) {
        if (currentRow.length > 0 && currentRow[column]?.value === 'x') {
          const obstacle = currentRow[column] as Obstacle
          if (mergingCount > 0) {
            obstacle.decrement()
          }
          if (obstacle.remainingMoves <= 0) {
            // Transform in a null Tile
            obstacle.value = 0
          }
        }
      }
    }

    return hasChanged
  }

  private clearOldTiles() {
    this._tiles = this._tiles.filter((tile) => tile.markForDeletion === false)
    this._tiles.forEach((tile) => {
      tile.markForDeletion = true
    })
  }
}
