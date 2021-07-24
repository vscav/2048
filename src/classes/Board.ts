import { Joker } from '/@/classes/Joker'
import { Obstacle } from '/@/classes/Obstacle'
import { ProbManager } from '/@/classes/ProbManager'
import { Secret } from '/@/classes/Secret'
import { StatManager } from '/@/classes/StatManager'
import { Tile, TileType, TileValue } from '/@/classes/Tile'

import { ICell } from '/@/classes/interfaces'

import { rotateLeft } from '/@/lib/matrix'
import { fil } from '/@/lib/array'

export type MovementDirection = 0 | 1 | 2 | 3

/**
 * Class representing the game board and its logic.
 */
export class Board {
  private readonly _probabilityManager = ProbManager.getInstance()
  private readonly _statisticsManager: StatManager
  private readonly _size: number
  private readonly _deltaX = [-1, 0, 1, 0]
  private readonly _deltaY = [0, -1, 0, 1]
  private _tiles: Tile[]
  private _cells: Tile[][]
  private _won = false
  private _score = 0
  private _lastScore = {
    points: 0,
    animation: false,
  }

  /**
   * Create a the game squared board.
   * @param {number} [size = 4] - The size of the squared board.
   */
  constructor(size = 4) {
    if (size <= 0) {
      throw new Error(`Board size must be >= 0 (but was ${size})`)
    }
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
  }

  /**
   * Update the probability parameter of the Bernouilli distribution of the current probabilities Manager.
   * @param {number} p - The new probability parameter which will be used by the Bernouilli distribution.
   */
  public updateBernouilliProbability(p: number): void {
    this._probabilityManager.p = p
  }

  /**
   * Update the number of experiences performed by the Binomial distribution of the current probabilities Manager.
   * @param {number} n - The new number of experiences which will be performed by the Binomial distribution.
   */
  public updateBinomialNumberOfExperiences(n: number): void {
    this._probabilityManager.n = n
  }

  /**
   * Update the number of experiences performed by the Geometric distribution of the current probabilities Manager.
   * @param {number} k - The new number of experiences which will be performed by the Geometric distribution.
   */
  public updateGeometricNumberOfExperiences(k: number): void {
    this._probabilityManager.k = k
  }

  /**
   * Update the expected number of successes requested by the Poisson distribution of the current probabilities Manager.
   * @param {number} lambda - The new expected number of successes which will be requested by the Poisson distribution.
   */
  public updatePoissonNumberOfSuccesses(lambda: number): void {
    this._probabilityManager.lambda = lambda
  }

  /**
   * Get the probabilities Manager related to the current game.
   * @return {ProbManager} The probabilities Manager related to the current game.
   */
  public get probabilityManager(): ProbManager {
    return this._probabilityManager
  }

  /**
   * Get the statistics Manager related to the current game.
   * @return {StatManager} The statistics Manager related to the current game.
   */
  public get statisticsManager(): StatManager {
    return this._statisticsManager
  }

  /**
   * Get the tiles collection that currently compose the game board.
   * @return {Tile[]} An array of the game board tiles.
   */
  public get tiles(): Tile[] {
    return this._tiles
  }

  /**
   * Get the cells collection that represents the game board.
   * @return {Tile[][]} The cells collection that represents the game board.
   */
  public get cells(): Tile[][] {
    return this._cells
  }

  /**
   * Get the number of points won during the last player movement.
   * @return {number} The number of points won during the last player movement.
   */
  public get lastScorePoints(): number {
    return this._lastScore.points
  }

  /**
   * Check if the player scored some points during his last movement and so if an animation is required.
   * @return {boolean} A boolean to know if an animation is required.
   */
  public get lastScoreAnimation(): boolean {
    return this._lastScore.animation
  }

  /**
   * Get the score of the current game.
   * @return {number} The score of the current game.
   */
  public get score(): number {
    return this._score
  }

  /**
   * Indicates whether the game has been won or not.
   * @return {boolean} A boolean to indicate whether the game has been won or not.
   */
  public hasWon(): boolean {
    return this._won
  }

  /**
   * Indicates whether the game has been lost or not.
   * @return {boolean} A boolean to indicate whether the game has been lost or not.
   */
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

  /**
   * Add a new (classic) tile on the game board.
   * @param {TileValue} value - The value of the tile (the number which displayed on it).
   * @param {boolean} fromMerge - A boolean to indicate if the tile was created following a merge between two other tiles or not.
   * @return {Tile} The (classic) tile newly created.
   */
  private addTile(value: TileValue, fromMerge = false): Tile {
    const res = new Tile(value)
    this._tiles.push(res)
    if (value !== 0 && fromMerge === false) this._statisticsManager.add(res)

    return res
  }

  /**
   * Add a new joker tile on the game board.
   * @return {Joker} The joker tile newly created.
   */
  private addJoker(): Joker {
    const res = new Joker()
    this._tiles.push(res)
    this._statisticsManager.add(res)

    return res
  }

  /**
   * Add a new obstacle tile on the game board.
   * @return {Obstacle} The obstacle tile newly created.
   */
  private addObstacle(): Obstacle {
    const remaining = this._probabilityManager.simulatePoisson()
    const res = new Obstacle(remaining)
    this._tiles.push(res)
    this._statisticsManager.add(res)

    return res
  }

  /**
   * Add a new secret tile on the game board.
   * @return {Secret} The secret tile newly created.
   */
  private addSecret(): Secret {
    const value = Math.pow(2, Math.floor(Math.random() * 4) + 1) as TileValue
    const remaining = this._probabilityManager.simulateBinomial()
    const res = new Secret(value, remaining)
    this._tiles.push(res)
    this._statisticsManager.add(res)

    return res
  }

  /**
   * Get a collection of the coordinates of all the empty cells on the game board.
   * @return {ICell[]} An array containing the coordinates of all the empty cells on the game board.
   */
  private provideEmptyCells(): ICell[] {
    const emptyCells: ICell[] = []
    for (let row = 0; row < this._size; ++row) {
      for (let column = 0; column < this._size; ++column) {
        if (this._cells[row][column].value === 0) {
          emptyCells.push({ row, column })
        }
      }
    }

    return emptyCells
  }

  /**
   * Add a random tile on the game board. All type of tiles has a chance to be rendered.
   */
  private addRandomTile(): void {
    const emptyCells = this.provideEmptyCells()

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

  /**
   * Update coordinates information for each cell of the game board.
   */
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

  /**
   * Move all the tiles of the game board towards one of the four cardinal points.
   * @param {MovementDirection} direction - A number (0, 1, 2 or 3) that represents a direction.
   * @return {Board} The current game board object.
   */
  public move(direction: MovementDirection): Board {
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

  /**
   * Perform merging operations.
   * @return {boolean} A boolean to indicate whether the game board cells state has changed.
   */
  private moveLeft(): boolean {
    let hasChanged = false
    let mergingCount = 0
    let totalMovePoints = 0

    for (let row = 0; row < this._size; ++row) {
      const currentRow = fil((tile) => tile.value !== 0, this._cells[row])
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
            targetTile.value = (tile2.value + tile2.value) as TileValue
          } else if (
            tile2.type === TileType.Joker &&
            targetTile.type !== TileType.Joker
          ) {
            targetTile.value = (targetTile.value +
              targetTile.value) as TileValue
          } else if (
            tile2.type === TileType.Joker &&
            targetTile.type === TileType.Joker
          ) {
            targetTile.value = 4
          } else {
            targetTile.value = (targetTile.value + tile2.value) as TileValue
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
      const currentRow = fil((tile) => tile.value !== 0, this._cells[row])

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

  /**
   * Clear old tiles (previously merged tiles) from the game board by specifically marking them for deletion.
   */
  private clearOldTiles() {
    this._tiles = fil((tile) => tile.markForDeletion === false, this._tiles)
    this._tiles.forEach((tile) => {
      tile.markForDeletion = true
    })
  }
}
