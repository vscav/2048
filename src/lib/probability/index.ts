import { combination } from '/@/lib/probability/utils'

export class Probability {
  private _rng01: () => number
  private _rng11: () => number

  constructor(rng: () => number = Math.random) {
    this._rng01 = rng

    this._rng11 = () => {
      return (((rng() * 0x100000000) | 0) / 0x100000000) * 2
    }
  }

  get rng01(): () => number {
    return this._rng01
  }

  get rng11(): () => number {
    return this._rng11
  }

  bernouilli(p = 0.9): Distribution {
    return new BernouilliDistribution(this._rng01, p)
  }

  binomial(n = 10, p = 0.8, k = 1): BinomialDistribution {
    return new BinomialDistribution(this._rng01, n, p, k)
  }

  geometric(k = 5, p = 0.2): GeometricDistribution {
    return new GeometricDistribution(this._rng01, k, p)
  }

  // lambda: 1 to 15 (range of 1)
  poisson(lambda = 1): PoissonDistribution {
    return new PoissonDistribution(this._rng01, lambda)
  }

  uniform(min = 0, max = 1): UniformDistribution {
    return new UniformDistribution(this._rng01, min, max)
  }
}

/* eslint-disable no-unused-vars */
export enum DistributionType {
  Unknown,
  Continuous,
  Discrete,
}
/* eslint-enable no-unused-vars */

export interface Distribution {
  type: DistributionType

  random(): number
}

export class BernouilliDistribution implements Distribution {
  private _rng01: () => number
  private _type: DistributionType
  private _p: number

  constructor(rng01: () => number, p: number) {
    this._rng01 = rng01
    this._type = DistributionType.Discrete
    this._p = p
  }

  get type(): DistributionType {
    return this._type
  }

  random(): number {
    let t = 1
    t = t * this._rng01()
    if (t < this._p) {
      return 1
    }
    return 0
  }
}

export class BinomialDistribution implements Distribution {
  private _rng01: () => number
  private _type: DistributionType
  private _n: number
  private _p: number
  private _k: number

  constructor(rng01: () => number, n: number, p: number, k: number) {
    this._rng01 = rng01
    this._type = DistributionType.Discrete
    this._n = n
    this._p = p
    this._k = k
  }

  get type(): DistributionType {
    return this._type
  }

  random(): number {
    return (
      combination(this._n, this._k) *
      Math.pow(this._p, this._k) *
      Math.pow(1 - this._p, this._n - this._k)
    )
  }
}

export class GeometricDistribution implements Distribution {
  private _rng01: () => number
  private _type: DistributionType
  private _k: number
  private _p: number

  constructor(rng01: () => number, k: number, p: number) {
    this._rng01 = rng01
    this._type = DistributionType.Discrete
    this._k = k
    this._p = p
  }

  get type(): DistributionType {
    return this._type
  }

  random(): number {
    return this._p * Math.pow(1 - this._p, this._k - 1)
  }
}

export class PoissonDistribution implements Distribution {
  private _rng01: () => number
  private _type: DistributionType
  private _lambda: number

  constructor(rng01: () => number, lambda: number) {
    this._rng01 = rng01
    this._type = DistributionType.Discrete
    this._lambda = lambda
  }

  get type(): DistributionType {
    return this._type
  }

  random(): number {
    return Math.exp(-this._lambda)
  }
}

export class UniformDistribution implements Distribution {
  private _rng01: () => number
  private _min: number
  private _max: number
  private _range: number
  private _type: DistributionType

  constructor(rng01: () => number, min: number, max: number) {
    this._rng01 = rng01
    this._min = min
    this._max = max
    this._range = max - min
    this._type = DistributionType.Continuous
  }

  get min(): number {
    return this._min
  }

  get max(): number {
    return this._max
  }

  get type(): DistributionType {
    return this._type
  }

  random(): number {
    return this._min + this._rng01() * this._range
  }
}
