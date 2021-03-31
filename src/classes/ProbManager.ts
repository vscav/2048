import { Probability } from '/@/lib/probability'

export class ProbManager {
  private _probability: Probability
  private _min: number
  private _max: number

  constructor(min = 0, max = 1) {
    if (min < 0) {
      throw new Error(`Minimal range value must be >= 0 (but was ${min})`)
    }
    if (max > 1) {
      throw new Error(`Maximal range value must be <= 1 (but was ${max})`)
    }
    if (max < min) {
      throw new Error(
        `Maximal range value must be superior or equal to the minimal value (values were max = ${max} and min = ${min})`,
      )
    }
    this._probability = new Probability()
    this._min = min
    this._max = max
  }

  public uniform(): number {
    const uniform = this._probability.uniform(this._min, this._max)
    return uniform.random()
  }
}
