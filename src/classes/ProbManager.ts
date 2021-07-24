import { IProbManager } from '/@/classes/interfaces'

import { IDistribution, Probability } from '/@/lib/probability'

/**
 * Class representing a game probability manager.
 */
export class ProbManager implements IProbManager {
  private static _instance: ProbManager
  private _probability: Probability
  private _min: number
  private _max: number
  private _lambda = 10
  private _p = 0.75
  private _n = 10
  private _k = 2

  /**
   * Create a game probabillity manager.
   */
  private constructor(min = 0, max = 1) {
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

  /**
   * Get the instance of the probability manager.
   * @alias ProbManager.getInstance
   * @return {ProbManager} The instance of the probability manager.
   */
  public static getInstance(): ProbManager {
    if (!ProbManager._instance) {
      ProbManager._instance = new ProbManager()
    }

    return ProbManager._instance
  }

  /**
   * Process and count the number of experieces needed before the realization of the probability.
   * @param {IDistribution} dist The probability distributio used for these experiences.
   * @return {number} The number of experiences that have been processed.
   */
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

  /**
   * Get the probability of having a tile with the value 2.
   * @return {number} The probability of having a tile with the value 2.
   */
  public get tileTwoProbability(): number {
    return 100 * (1 - this.simulateGeometric(true)) * this._p
  }

  /**
   * Get the probability of having a tile with the value 4.
   * @return {number} The probability of having a tile with the value 4.
   */
  public get tileFourProbability(): number {
    return 100 * (1 - this.simulateGeometric(true)) * (1 - this._p)
  }

  /**
   * Get the probability of having a classic tile.
   * @return {number} The probability of having a classic tile.
   */
  public get classicTileProbability(): number {
    return this.tileTwoProbability + this.tileFourProbability
  }

  /**
   * Get the probability of having a joker tile.
   * @return {number} The probability of having a joker tile.
   */
  public get jokerTileProbability(): number {
    return 100 * this.simulateGeometric(true) * (1 / 3)
  }

  /**
   * Get the probability of having a secret tile.
   * @return {number} The probability of having a secret tile.
   */
  public get secretTileProbability(): number {
    return 100 * this.simulateGeometric(true) * (1 / 3)
  }

  /**
   * Get the probability of having an obstacle tile.
   * @return {number} The probability of having an obstacle tile.
   */
  public get obstacleTileProbability(): number {
    return 100 * this.simulateGeometric(true) * (1 / 3)
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

  simulateBernouilli(): number {
    const bernouilli = this._probability.bernouilli(this._p)
    return bernouilli.random()
  }

  simulateBinomial(): number {
    const binomial = this._probability.binomial(this._n, 0.8, 1)
    return this.computeExperiences(binomial)
  }

  simulateGeometric(original = false): number {
    const geometric = this._probability.geometric(this._k, 0.25)

    if (original) return geometric.random()
    let t = 1
    t = t * this._probability.rng01()
    if (t < geometric.random()) {
      return 1
    }
    return 0
  }

  simulatePoisson(): number {
    const poisson = this._probability.poisson(this._lambda)
    return poisson.random()
  }

  simulateUniform(): number {
    const uniform = this._probability.uniform(this._min, this._max)
    return uniform.random()
  }
}
