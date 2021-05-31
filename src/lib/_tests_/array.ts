import { expect } from 'chai'

import { fil, filterObjs } from '../array'

describe('Array operations', () => {
  it('has correct array filter', () => {
    expect(fil((e) => e < 5, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])).to.deep.eq([
      1,
      2,
      3,
      4,
    ])
    expect(fil((e) => e === 'foo', [])).to.deep.eq([])
  })
  const obj: { [key: string]: number }[] = [{ n: 15 }, { n: 2, m: 15 }]
  it('has correct object filter', () => {
    expect(
      filterObjs((o: { [key: string]: number }) => o.n === 15)(obj),
    ).to.deep.eq([{ n: 15 }])
  })
})
