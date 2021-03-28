export class Tile {
  private _value: number
  private _row: number
  private _column: number
  private _oldRow: number
  private _oldColumn: number
  private _markForDeletion: boolean
  private _mergedInto: Tile | null
  private _id: number
  private static _count = 0

  constructor(value = 0, row = -1, column = -1) {
    if (value < 0) {
      throw new Error(`Tile value must be >= 0 (but was ${value})`)
    }
    if ((value & (value - 1)) !== 0 || value === 1) {
      throw new Error(
        `Tile value must be in the binary sequence [0, 2, 4, 8, 16, 32, 64, ...] (but was ${value})`,
      )
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

  public getValue(): number {
    return this._value
  }

  public setValue(newValue: number): void {
    this._value = newValue
  }

  public getRow(): number {
    return this._row
  }

  public setRow(newRow: number): void {
    this._row = newRow
  }

  public getColumn(): number {
    return this._column
  }

  public setColumn(newColumn: number): void {
    this._column = newColumn
  }

  public getOldRow(): number {
    return this._oldRow
  }

  public setOldRow(newOldRow: number): void {
    this._oldRow = newOldRow
  }

  public getOldColumn(): number {
    return this._oldColumn
  }

  public setOldColumn(newOldColumn: number): void {
    this._oldColumn = newOldColumn
  }

  public getMarkForDeletion(): boolean {
    return this._markForDeletion
  }

  public setMarkForDeletion(newMark: boolean): void {
    this._markForDeletion = newMark
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

  public getMergedInto(): Tile | null {
    return this._mergedInto
  }

  public setMergedInto(tile: Tile): void {
    this._mergedInto = tile
  }

  public getId(): number {
    return this._id
  }

  public static getCount(): number {
    return this._count
  }
}
