export class Probability {
  private _rng01: () => number
  private _rng11: () => number

  constructor(rng: () => number = Math.random) {
    this._rng01 = rng

    this._rng11 = () => {
      return (((rng() * 0x100000000) | 0) / 0x100000000) * 2
    }
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
  min: number
  max: number
  mean: number
  variance: number
  type: DistributionType

  random(): number
}

export class UniformDistribution implements Distribution {
  private _rng01: () => number
  private _min: number
  private _max: number
  private _range: number
  private _mean: number
  private _variance: number
  private _type: DistributionType

  constructor(rng01: () => number, min: number, max: number) {
    this._rng01 = rng01
    this._min = min
    this._max = max
    this._range = max - min
    this._mean = min + this._range / 2
    this._variance = ((max - min) * (max - min)) / 12
    this._type = DistributionType.Continuous
  }

  get min(): number {
    return this._min
  }

  get max(): number {
    return this._max
  }

  get mean(): number {
    return this._mean
  }

  get variance(): number {
    return this._variance
  }

  get type(): DistributionType {
    return this._type
  }

  random(): number {
    return this._min + this._rng01() * this._range
  }
}
