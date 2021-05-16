const combination = (n: number, k: number): number => {
  const t = new Array(n)
  t[0] = 1
  for (let i = 1; i <= n; i++) {
    t[i] = 1
    for (let j = i - 1; j >= 1; j--) t[j] = t[j] + t[j - 1]
  }
  return t[k]
}

const factorial = (num: number): number => {
  if (num == 1) return 1
  else return num * factorial(num - 1)
}

export { combination, factorial }
