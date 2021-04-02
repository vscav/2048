import { Tile } from '/@/classes/Tile'

export class Obstacle extends Tile {
  private _remainingMoves: number

  constructor() {
    super('x')
    this._remainingMoves = Math.random() * (20 - 10) + 10 // Apply probability here
  }

  public get remainingMoves(): number {
    return this._remainingMoves
  }

  public decrement(): void {
    this._remainingMoves--
  }
}
