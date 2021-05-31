import { expect } from 'chai'

import { IDistribution, Probability } from '../probability'

describe('Number generator', () => {
  const prob = new Probability()

  describe('with uniform distribution', () => {
    const uniform = prob.uniform(1, 3)

    it('has correct min/max', () => {
      assertMinMax(uniform, 1, 3)
    })

    it('has correct estimators', () => {
      assertEstimators(uniform, 2, 1 / 3)
    })

    it('generates appropriate random numbers', () => {
      assertResults(uniform)
    })
  })

  describe('with bernouilli distribution', () => {
    const bernouilli = prob.bernouilli(0.9)

    it('has correct min/max', () => {
      assertMinMax(bernouilli, 0, Number.POSITIVE_INFINITY)
    })

    it('has correct estimators', () => {
      assertEstimators(bernouilli, 0.9, 0.9 * (1 - 0.9))
    })

    it('generates appropriate random numbers', () => {
      assertResults(bernouilli)
    })
  })

  describe('with poisson distribution', () => {
    const poisson = prob.poisson(2)

    it('has correct min/max', () => {
      assertMinMax(poisson, 0, Number.POSITIVE_INFINITY)
    })

    it('has correct estimators', () => {
      assertEstimators(poisson, 2, 2)
    })

    it('generates appropriate random numbers', () => {
      assertResults(poisson)
    })
  })

  const assertMinMax = (
    distribution: IDistribution,
    expectedMin: number,
    expectedMax: number,
  ) => {
    expect(distribution.min).to.equal(expectedMin)
    expect(distribution.max).to.equal(expectedMax)
  }

  const assertEstimators = (
    distribution: IDistribution,
    expectedMean: number,
    expectedVariance: number,
  ) => {
    expect(distribution.mean).to.equal(expectedMean)
    expect(distribution.variance).to.equal(expectedVariance)
  }

  const assertResults = (distribution: IDistribution) => {
    const trials = 1000000
    const meanError = 10000 / trials
    const varianceError = 100000 / trials

    let sum = 0
    let sum2 = 0

    for (let i = 0; i < trials; i++) {
      const value = distribution.random()
      sum += value
      sum2 += value * value

      expect(value).to.be.at.least(distribution.min)
      expect(value).to.be.below(distribution.max)
    }

    const mean = sum / trials
    const variance = (sum2 - (sum * sum) / trials) / trials

    expect(mean).to.be.closeTo(distribution.mean, meanError)
    expect(variance).to.be.closeTo(distribution.variance, varianceError)
  }
})
