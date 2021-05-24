import { IDistribution, Probability } from '/@/lib/probability'
import { IManager } from '/@/classes/interfaces'

export class ProbManager implements IManager {
  private _probability: Probability
  private _min: number
  private _max: number
  private _lambda: number
  private _p: number
  private _n: number
  private _k: number

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
    this._p = 0.9
    this._n = 10
    this._k = 5
    this._lambda = 10
  }

  private computeExperiences(dist: IDistribution): number {
    let k = 0
    let p = 1
    // eslint-disable-next-line no-constant-condition
    while (true) {
      p = p * this._probability.rng01()
      if (p <= dist.random()) {
        break
      }
      k++
    }
    return k
  }

  public get p(): number {
    return this._p
  }

  public set p(p: number) {
    this._p = p
  }

  public get n(): number {
    return this._n
  }

  public set n(n: number) {
    this._n = n
  }

  public get k(): number {
    return this._k
  }

  public set k(k: number) {
    this._k = k
  }

  public get lambda(): number {
    return this._lambda
  }

  public set lambda(lambda: number) {
    this._lambda = lambda
  }

  bernouilli(): number {
    const bernouilli = this._probability.bernouilli(this._p)
    return bernouilli.random()
  }

  binomial(): number {
    const binomial = this._probability.binomial(this._n, 0.8, 1)
    return this.computeExperiences(binomial)
  }

  geometric(): number {
    const geometric = this._probability.geometric(this._k, 0.2)
    let t = 1
    t = t * this._probability.rng01()
    if (t < geometric.random()) {
      return 1
    }
    return 0
  }

  poisson(): number {
    const poisson = this._probability.poisson(this._lambda)
    return this.computeExperiences(poisson)
  }

  uniform(): number {
    const uniform = this._probability.uniform(this._min, this._max)
    return uniform.random()
  }
}
