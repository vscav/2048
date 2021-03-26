export class Tile {
  private value: number
  private row: number
  private column: number
  private oldRow: number
  private oldColumn: number
  private markForDeletion: boolean
  private mergedInto: boolean | null
  private id: number
  static count: number

  constructor(value: number, row: number, column: number) {
    this.value = value || 0
    this.row = row || -1
    this.column = column || -1
    this.oldRow = -1
    this.oldColumn = -1
    this.markForDeletion = false
    this.mergedInto = null
    this.id = Tile.count++
  }
}
