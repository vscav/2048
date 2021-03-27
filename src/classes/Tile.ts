export class Tile {
  private value: number
  private row: number
  private column: number
  private oldRow: number
  private oldColumn: number
  private markForDeletion: boolean
  private mergedInto: Tile | null
  private id: number
  private static count = 0

  constructor(value = 0, row = -1, column = -1) {
    this.value = value
    this.row = row
    this.column = column
    this.oldRow = -1
    this.oldColumn = -1
    this.markForDeletion = false
    this.mergedInto = null
    this.id = Tile.count++

    console.log(this.id)
  }

  public getValue(): number {
    return this.value
  }

  public setValue(newValue: number): void {
    this.value = newValue
  }

  public getRow(): number {
    return this.row
  }

  public setRow(newRow: number): void {
    this.row = newRow
  }

  public getColumn(): number {
    return this.column
  }

  public setColumn(newColumn: number): void {
    this.column = newColumn
  }

  public getOldRow(): number {
    return this.oldRow
  }

  public setOldRow(newOldRow: number): void {
    this.oldRow = newOldRow
  }

  public getOldColumn(): number {
    return this.oldColumn
  }

  public setOldColumn(newOldColumn: number): void {
    this.oldColumn = newOldColumn
  }

  public getMarkForDeletion(): boolean {
    return this.markForDeletion
  }

  public setMarkForDeletion(newMark: boolean): void {
    this.markForDeletion = newMark
  }

  public isNew(): boolean {
    return this.oldRow === -1 && !this.mergedInto
  }

  public getMergedInto(): Tile | null {
    return this.mergedInto
  }

  public setMergedInto(tile: Tile): void {
    this.mergedInto = tile
  }

  public getId(): number {
    return this.id
  }

  public static getCount(): number {
    return this.count
  }
}
