export const calculate = (input: number[], num: number) => {
  const match = combinations(input, num).find((combination: number[]) => {
    return combination.reduce((calculation: number, currentNumber: number) => calculation + currentNumber, 0) === 2020
  })

  if (!match) {
    throw new Error(`Sorry, couldn't find a match`)
  }

  return match.reduce((a: number, b: number) => a * b, 1)
}

function combinations(set: number[], k: number): number[][] {
  if (k > set.length) return []
  if (k == set.length) return [set]

  if (k == 1) {
    let con: number[][] = []
    set.forEach((_, index: number) => {
      con.push([set[index]])
    })
    return con
  }

  let con: number[][] = []
  for (let i = 0; i < set.length - k + 1; i++) {
    let head = set.slice(i, i + 1)
    let tail = combinations(set.slice(i + 1), k - 1)
    tail.forEach((_: number[], index: number) => con.push(head.concat(tail[index])))
  }

  return con
}
