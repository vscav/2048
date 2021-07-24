import { IMoveable } from '/@/classes/interfaces'

/* eslint-disable no-unused-vars */
export enum TileType {
  Classic = 'classic',
  Joker = 'joker',
  Obstacle = 'obstacle',
  Secret = 'secret',
}
/* eslint-enable no-unused-vars */

export type TileValue =
  | -1
  | 0
  | 2
  | 4
  | 8
  | 16
  | 32
  | 64
  | 128
  | 256
  | 512
  | 1024
  | 2048

/**
 * Class representing a tile of the game board.
 */
export class Tile implements IMoveable {
  private _type: TileType
  private _value: TileValue
  private _row: number
  private _column: number
  private _oldRow: number
  private _oldColumn: number
  private _markForDeletion: boolean
  private _mergedInto: Tile | null
  private _id: number
  private static _count = 0

  /**
   * Create a game board tile.
   * @param {TileValue} value - The value of the tile.
   * @param {number} [row = -1] - The row index of the tile.
   * @param {number} [column = -1] - The column index of the tile.
   * @param {TileType} [type = TileType.Classic] - The type of the tile.
   */
  constructor(
    value: TileValue,
    row = -1,
    column = -1,
    type = TileType.Classic,
  ) {
    this._type = type
    this._value = value
    this._row = row
    this._column = column
    this._oldRow = -1
    this._oldColumn = -1
    this._markForDeletion = false
    this._mergedInto = null
    this._id = ++Tile._count
  }

  /**
   * Get the value of the tile.
   * @return {TileValue} The value of the tile.
   */
  public get value(): TileValue {
    return this._value
  }

  /**
   * Set the value of the tile.
   * @param {TileValue} newValue - The new value to apply.
   */
  public set value(newValue: TileValue) {
    this._value = newValue
  }

  /**
   * Get the type of the tile.
   * @return {TileType} The type of the tile.
   */
  public get type(): TileType {
    return this._type
  }

  /**
   * Set the type of the tile.
   * @param {TileType} newType - The new type to apply.
   */
  public set type(newType: TileType) {
    this._type = newType
  }

  /**
   * Get the row index of the tile.
   * @return {number} The row index of the tile.
   */
  public get row(): number {
    return this._row
  }

  /**
   * Set the row index of the tile.
   * @param {number} newRow - The new row index of the tile.
   */
  public set row(newRow: number) {
    this._row = newRow
  }

  /**
   * Get the column index of the tile.
   * @return {number} The column index of the tile.
   */
  public get column(): number {
    return this._column
  }

  /**
   * Set the column index of the tile.
   * @param {number} newColumn - The new column index of the tile.
   */
  public set column(newColumn: number) {
    this._column = newColumn
  }

  /**
   * Get the previous row index of the tile.
   * @return {number} The previous row index of the tile.
   */
  public get oldRow(): number {
    return this._oldRow
  }

  /**
   * Set the previous row index of the tile.
   * @param {number} newOldRow - The new previous row index of the tile.
   */
  public set oldRow(newOldRow: number) {
    this._oldRow = newOldRow
  }

  /**
   * Get the previous column index of the tile.
   * @return {number} The previous column index of the tile.
   */
  public get oldColumn(): number {
    return this._oldColumn
  }

  /**
   * Set the previous column index of the tile.
   * @param {number} newOldColumn - The new previous column index of the tile.
   */
  public set oldColumn(newOldColumn: number) {
    this._oldColumn = newOldColumn
  }

  /**
   * Get the mark of the tile to check if its deletion is planned.
   * @return {boolean} A boolean to indicate whether the tile deletion is planned or not.
   */
  public get markForDeletion(): boolean {
    return this._markForDeletion
  }

  /**
   * Set the mark of the tile to tell it its deletion is planed or not.
   * @param {boolean} newMark - The new deletion status mark of the tile.
   */
  public set markForDeletion(newMark: boolean) {
    this._markForDeletion = newMark
  }

  /**
   * Get the tile in which the current one has been merged into.
   * @return {Tile | null} The tile in which the current one has been merged into. If it doesn't exist, null is returned.
   */
  public get mergedInto(): Tile | null {
    return this._mergedInto
  }

  /**
   * Set the tile in which the current one has been merged into.
   * @param {Tile} tile - The tile in which the current one has been merged into.
   */
  public set mergedInto(tile: Tile | null) {
    this._mergedInto = tile
  }

  /**
   * Get the id of the tile.
   * @return {number} The id of the tile.
   */
  public get id(): number {
    return this._id
  }

  /**
   * Indicate whether the tile is new on the game board or not.
   * @return {boolean} A boolean to indicate whether the tile is new on the game board or not.
   */
  public isNew(): boolean {
    return this._oldRow === -1 && !this._mergedInto
  }

  public fromRow(): number {
    return this._mergedInto ? this._row : this._oldRow
  }

  public fromColumn(): number {
    return this._mergedInto ? this._column : this._oldColumn
  }

  public toRow(): number {
    return this._mergedInto ? this._mergedInto._row : this._row
  }

  public toColumn(): number {
    return this._mergedInto ? this._mergedInto._column : this._column
  }

  public hasMoved(): boolean | Tile | null {
    return (
      (this.fromRow() != -1 &&
        (this.fromRow() != this.toRow() ||
          this.fromColumn() != this.toColumn())) ||
      this._mergedInto
    )
  }
}
