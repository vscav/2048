import { rotateLeft } from '/@/lib/matrix'
import { Joker } from '/@/classes/Joker'
import { Obstacle } from '/@/classes/Obstacle'
import { ProbManager } from '/@/classes/ProbManager'
import { Secret } from '/@/classes/Secret'
import { Tile, TileType } from '/@/classes/Tile'

import { Cell } from '/@/classes/interfaces'

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
    this.addRandomTile()
    this.setPositions()
    this._won = false
  }

  public updateBernouilliProbability(p: number): void {
    this._probabilityManager.p = p
  }

  public get probabilityManager(): ProbManager {
    return this._probabilityManager
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
            this._cells[newRow][newColumn].type !== TileType.Obstacle
        }
      }
    }
    return !canMove
  }

  private addTile(value: number): Tile {
    const res = new Tile(value)
    this._tiles.push(res)

    return res
  }

  private addJoker(): Joker {
    const res = new Joker()
    this._tiles.push(res)

    return res
  }

  private addObstacle(): Obstacle {
    const remaining = this._probabilityManager.poisson()
    const res = new Obstacle(remaining)
    this._tiles.push(res)

    return res
  }

  private addSecret(): Secret {
    const value = Math.pow(2, Math.floor(Math.random() * 4) + 1)
    const remaining = this._probabilityManager.binomial()
    const res = new Secret(value, remaining)
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

    // The next tile will be a classic or a special case?
    const classic = this._probabilityManager.geometric() === 1 ? false : true

    // We perform a uniform distribution to get the empty cell on which the next tile will appear
    const uniform = this._probabilityManager.uniform()
    const index = ~~(uniform * emptyCells.length)
    const cell = emptyCells[index]

    // If classic tile, we perform a bernouilli distribution to get the actual value (2 or 4)
    // p is by default 0.9 (probability of success)
    if (classic) {
      const bernouilli = this._probabilityManager.bernouilli()
      const newValue = bernouilli === 1 ? 2 : 4
      this._cells[cell.row][cell.column] = this.addTile(newValue)
    } else {
      const uniform2 = this._probabilityManager.uniform()
      this._cells[cell.row][cell.column] =
        uniform2 < 1 / 3
          ? this.addJoker()
          : uniform2 < 2 / 3
            ? this.addObstacle()
            : this.addSecret()
    }
  }

  private setPositions(): void {
    this._cells.forEach((row, rowIndex) => {
      row.forEach((tile, columnIndex) => {
        // console.log(tile)
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
          (currentRow[0].type === TileType.Joker ||
            targetTile.type === TileType.Joker ||
            currentRow[0].value === targetTile.value) &&
          (currentRow[0].type !== TileType.Obstacle ||
            targetTile.type !== TileType.Obstacle)
        ) {
          const tile1 = targetTile
          const tile2 = currentRow.shift() as Tile

          if (targetTile.type === TileType.Joker) {
            targetTile = this.addTile(tile2.value)
          } else {
            targetTile = this.addTile(targetTile.value)
          }

          tile1.mergedInto = targetTile
          tile2.mergedInto = targetTile

          if (
            targetTile.type === TileType.Joker &&
            tile2.type !== TileType.Joker
          ) {
            targetTile.value = tile2.value + tile2.value
          } else if (
            tile2.type === TileType.Joker &&
            targetTile.type !== TileType.Joker
          ) {
            targetTile.value = targetTile.value + targetTile.value
          } else if (
            tile2.type === TileType.Joker &&
            targetTile.type === TileType.Joker
          ) {
            targetTile.value = 4
          } else {
            targetTile.value = targetTile.value + tile2.value
          }

          this._lastScore.points = targetTile.value
          this._lastScore.animation = true
          this._score += this._lastScore.points
        }

        resultRow[target] = targetTile
        // Quick test (win on 8):
        // this._won ||= targetTile.value === 8
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
        if (
          currentRow.length > 0 &&
          (currentRow[column]?.type === TileType.Obstacle ||
            currentRow[column]?.type === TileType.Secret)
        ) {
          let toDecrement: Secret | Obstacle
          if (currentRow[column]?.type === TileType.Secret)
            toDecrement = currentRow[column] as Secret
          else toDecrement = currentRow[column] as Obstacle
          if (mergingCount > 0) {
            toDecrement.decrement()
          }
          if (toDecrement.remainingMoves <= 0) {
            // Transform obstcale in a null Tile
            if (currentRow[column]?.type === TileType.Obstacle)
              toDecrement.value = 0
            // Transform secret in classic tile
            else toDecrement.type = TileType.Classic
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
