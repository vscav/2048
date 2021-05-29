import { Joker } from '/@/classes/Joker'
import { Obstacle } from '/@/classes/Obstacle'
import { ProbManager } from '/@/classes/ProbManager'
import { Secret } from '/@/classes/Secret'
import { StatManager } from '/@/classes/StatManager'
import { Tile, TileType } from '/@/classes/Tile'

import { ICell } from '/@/classes/interfaces'

import { rotateLeft } from '/@/lib/matrix'

export class Board {
  private readonly _probabilityManager: ProbManager
  private readonly _statisticsManager: StatManager
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
    this._probabilityManager = new ProbManager()
    this._statisticsManager = new StatManager()
    this._size = size
    this._tiles = []
    this._cells = []
    for (let i = 0; i < this._size; ++i) {
      this._cells[i] = []
      for (let j = 0; j < this._size; ++j) {
        this._cells[i].push(this.addTile(0))
      }
    }
    this.addRandomTile()
    this.addRandomTile()
    this.setPositions()
    this._won = false
  }

  public updateBernouilliProbability(p: number): void {
    this._probabilityManager.p = p
  }

  public updateBinomialNumberOfExperiences(n: number): void {
    this._probabilityManager.n = n
  }

  public updateGeometricNumberOfExperiences(k: number): void {
    this._probabilityManager.k = k
  }

  public updatePoissonNumberOfSuccesses(lambda: number): void {
    this._probabilityManager.lambda = lambda
  }

  public get probabilityManager(): ProbManager {
    return this._probabilityManager
  }

  public get statisticsManager(): StatManager {
    return this._statisticsManager
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

  private addTile(value: number, fromMerge = false): Tile {
    const res = new Tile(value)
    this._tiles.push(res)
    if (value !== 0 && fromMerge === false) this._statisticsManager.add(res)

    return res
  }

  private addJoker(): Joker {
    const res = new Joker()
    this._tiles.push(res)
    this._statisticsManager.add(res)

    return res
  }

  private addObstacle(): Obstacle {
    const remaining = this._probabilityManager.simulatePoisson()
    const res = new Obstacle(remaining)
    this._tiles.push(res)
    this._statisticsManager.add(res)

    return res
  }

  private addSecret(): Secret {
    const value = Math.pow(2, Math.floor(Math.random() * 4) + 1)
    const remaining = this._probabilityManager.simulateBinomial()
    const res = new Secret(value, remaining)
    this._tiles.push(res)
    this._statisticsManager.add(res)

    return res
  }

  private addRandomTile(): void {
    const emptyCells: ICell[] = []
    for (let row = 0; row < this._size; ++row) {
      for (let column = 0; column < this._size; ++column) {
        if (this._cells[row][column].value === 0) {
          emptyCells.push({ row, column })
        }
      }
    }

    const classic =
      this._probabilityManager.simulateGeometric() === 1 ? false : true

    const firstUniform = this._probabilityManager.simulateUniform()
    const index = ~~(firstUniform * emptyCells.length)
    const cell = emptyCells[index]

    if (classic) {
      const bernouilli = this._probabilityManager.simulateBernouilli()
      const newValue = bernouilli === 1 ? 2 : 4
      this._cells[cell.row][cell.column] = this.addTile(newValue)
    } else {
      const secondUniform = this._probabilityManager.simulateUniform()
      this._cells[cell.row][cell.column] =
        secondUniform < 1 / 3
          ? this.addJoker()
          : secondUniform < 2 / 3
            ? this.addObstacle()
            : this.addSecret()
    }
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
    let totalMovePoints = 0

    for (let row = 0; row < this._size; ++row) {
      const currentRow = this._cells[row].filter((tile) => tile.value !== 0)
      const resultRow: Tile[] = []

      for (let target = 0; target < this._size; ++target) {
        let targetTile: Tile = currentRow.length
          ? (currentRow.shift() as Tile)
          : this.addTile(0, true)

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
            targetTile = this.addTile(tile2.value, true)
          } else {
            targetTile = this.addTile(targetTile.value, true)
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

          totalMovePoints += targetTile.value
          this._score += targetTile.value
          this._lastScore.animation = true
        }
        this._lastScore.points = totalMovePoints

        resultRow[target] = targetTile

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
            if (currentRow[column]?.type === TileType.Obstacle)
              toDecrement.value = 0
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
