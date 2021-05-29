// eslint-disable-next-line no-unused-vars
export const fil = <T>(fn: (a: T) => boolean, a: T[]): T[] => {
  const f: T[] = []
  for (let i = 0; i < a.length; i++) {
    if (fn(a[i])) {
      f.push(a[i])
    }
  }
  return f
}

// eslint-disable-next-line no-unused-vars
export const filterObjs = <T>(fn: (a: T) => boolean) => (a: T[]): T[] =>
  fil(fn, a)
