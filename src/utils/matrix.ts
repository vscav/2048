export const rotateLeft = <T>(matrix: T[][]): T[][] => {
  const rows = matrix.length
  const columns = matrix[0].length
  const res: T[][] = []
  for (let row = 0; row < rows; ++row) {
    res.push([])
    for (let column = 0; column < columns; ++column) {
      res[row][column] = matrix[column][columns - row - 1]
    }
  }
  return res
}
