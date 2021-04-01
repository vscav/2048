export interface Moveable {
  hasMoved(): boolean | Tile | null
}

export class Tile implements Moveable {
  private _value: number | string
  private _row: number
  private _column: number
  private _oldRow: number
  private _oldColumn: number
  private _markForDeletion: boolean
  private _mergedInto: Tile | null
  private _id: number
  private static _count = 0

  constructor(value: number | string, row = -1, column = -1) {
    if (typeof value === 'number') {
      if (value < 0) {
        throw new Error(
          `Tile value (as number) must be >= 0 (but was ${value})`,
        )
      }
      if ((value & (value - 1)) !== 0 || value === 1) {
        throw new Error(
          `Tile value (as number) must be in the binary sequence [0, 2, 4, 8, 16, 32, 64, ...] (but was ${value})`,
        )
      }
    }
    if (typeof value === 'string') {
      if (value !== 'x' && value !== 'j') {
        throw new Error(
          `Tile value (as string) must be 'x' (obstacle) or 'j' (joker) (but was ${value})`,
        )
      }
    }
    this._value = value
    this._row = row
    this._column = column
    this._oldRow = -1
    this._oldColumn = -1
    this._markForDeletion = false
    this._mergedInto = null
    this._id = ++Tile._count
  }

  public get value(): number | string {
    return this._value
  }

  public set value(newValue: number | string) {
    this._value = newValue
  }

  public get row(): number {
    return this._row
  }

  public set row(newRow: number) {
    this._row = newRow
  }

  public get column(): number {
    return this._column
  }

  public set column(newColumn: number) {
    this._column = newColumn
  }

  public get oldRow(): number {
    return this._oldRow
  }

  public set oldRow(newOldRow: number) {
    this._oldRow = newOldRow
  }

  public get oldColumn(): number {
    return this._oldColumn
  }

  public set oldColumn(newOldColumn: number) {
    this._oldColumn = newOldColumn
  }

  public get markForDeletion(): boolean {
    return this._markForDeletion
  }

  public set markForDeletion(newMark: boolean) {
    this._markForDeletion = newMark
  }

  public get mergedInto(): Tile | null {
    return this._mergedInto
  }

  public set mergedInto(tile: Tile | null) {
    this._mergedInto = tile
  }

  public get id(): number {
    return this._id
  }

  public static get count(): number {
    return this._count
  }

  public isNew(): boolean {
    return this._oldRow === -1 && !this._mergedInto
  }

  private fromRow(): number {
    return this._mergedInto ? this._row : this._oldRow
  }

  private fromColumn(): number {
    return this._mergedInto ? this._column : this._oldColumn
  }

  private toRow(): number {
    return this._mergedInto ? this._mergedInto._row : this._row
  }

  private toColumn(): number {
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
