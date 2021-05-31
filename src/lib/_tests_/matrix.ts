import { expect } from 'chai'

import { rotateLeft } from '../matrix'

describe('Matrix operation', () => {
  const numberMatrix44: number[][] = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
  ]
  const stringMatrix44: string[][] = [
    ['a', 'b', 'c', 'd'],
    ['e', 'f', 'g', 'h'],
    ['i', 'j', 'k', 'l'],
    ['m', 'n', 'o', 'p'],
  ]
  const empty: number[][] = [[], [], [], []]
  it('has correct rotateLeft transform on a 4 by 4 generic matrix', () => {
    expect(rotateLeft(numberMatrix44)).to.deep.eq([
      [4, 8, 12, 16],
      [3, 7, 11, 15],
      [2, 6, 10, 14],
      [1, 5, 9, 13],
    ])
    expect(rotateLeft(stringMatrix44)).to.deep.eq([
      ['d', 'h', 'l', 'p'],
      ['c', 'g', 'k', 'o'],
      ['b', 'f', 'j', 'n'],
      ['a', 'e', 'i', 'm'],
    ])
  })
  it('has correct rotateLeft transform on a 2D empty matrix', () => {
    expect(rotateLeft(empty)).to.deep.eq([[], [], [], []])
  })
})
