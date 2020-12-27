import * as fs from 'fs'

export const input = (file_path: string, pop: Boolean = true, split: RegExp = /\n/): string[] => {
  const array = fs.readFileSync(file_path).toString().split(split)

  // Remove the last element from array which is always empty.
  if (pop) array.pop()

  return array
}

export const combinations = (set: number[], k: number): number[][] => {
  if (k > set.length) {
    return []
  }

  if (k === set.length) {
    return [set]
  }

  if (k === 1) {
    return set.map((value: number) => [value])
  }

  return set.reduce((acc: number[][], _, index) => {
    const head = set.slice(index, index + 1)
    const tail = combinations(set.slice(index + 1), k - 1)
    tail.forEach(value => acc.push(head.concat(value)))
    return acc
  }, [])
}
