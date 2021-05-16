import { Probability } from '/@/lib/probability'

export class ProbManager {
  private _probability: Probability
  private _min: number
  private _max: number
  private _lambda: number
  private _n: number
  private _p: number

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
    this._lambda = 1
    this._n = 100
    this._p = 0.9
  }

  public bernouilli(): number {
    const bernouilli = this._probability.bernouilli(this._p)
    console.log(bernouilli.random())
    return bernouilli.random()
  }

  public binomial(): number {
    const binomial = this._probability.binomial()
    console.log(binomial.random())
    return binomial.random()
  }

  public geometric(): number {
    const geometric = this._probability.geometric()
    console.log(geometric.random())
    return geometric.random()
  }

  public poisson(): number {
    const poisson = this._probability.poisson(this._lambda)
    console.log(poisson.random())
    return poisson.random()
  }

  public uniform(): number {
    const uniform = this._probability.uniform(this._min, this._max)
    return uniform.random()
  }
}
