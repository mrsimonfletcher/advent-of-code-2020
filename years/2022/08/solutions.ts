export const part1 = (input: string[]) => {
  const forrest = input.reduce((acc: number[][], value) => [...acc, value.split('').map(v => Number(v))], [])

  const initialExposedCount = forrest.length * 2 + forrest[0].length * 2 - 4
  let additionalExposed = 0

  for (let yindex = 1; yindex < forrest.length - 1; yindex++) {
    for (let xindex = 1; xindex < forrest[0].length - 1; xindex++) {
      additionalExposed += exposed(forrest, xindex, yindex) ? 1 : 0
    }
  }

  return initialExposedCount + additionalExposed
}
export const part2 = (input: string[]) => {
  const forrest = input.reduce((acc: number[][], value) => [...acc, value.split('').map(v => Number(v))], [])

  let highestScenicScore = 0
  for (let yindex = 1; yindex < forrest.length - 1; yindex++) {
    for (let xindex = 1; xindex < forrest[0].length - 1; xindex++) {
      const score = scenicScore(forrest, xindex, yindex)
      if (score > highestScenicScore) highestScenicScore = score
    }
  }

  return highestScenicScore
}

const exposed = (forrest: number[][], xcordinate: number, ycordinate: number): boolean => {
  const currentHeight = forrest[ycordinate][xcordinate]
  const [leftSide, rightSide, top, bottom] = sides(forrest, xcordinate, ycordinate)

  const checker = (side: number[]): boolean => side.every(v => v < currentHeight)

  return checker(leftSide) || checker(rightSide) || checker(top) || checker(bottom)
}

const scenicScore = (forrest: number[][], xcordinate: number, ycordinate: number): number => {
  const currentHeight = Number(forrest[ycordinate][xcordinate])
  let [leftSide, rightSide, top, bottom] = sides(forrest, xcordinate, ycordinate)

  const enumerator = (side: number[]) => {
    let c = 0
    for (let i = 0; i < side.length; i++) {
      c += 1
      if (Number(side[i]) >= currentHeight) break
    }
    return c
  }

  return enumerator(leftSide.reverse()) * enumerator(rightSide) * enumerator(top.reverse()) * enumerator(bottom)
}

const sides = (forrest: number[][], xcordinate: number, ycordinate: number) => {
  return [
    forrest[ycordinate].slice(0, xcordinate),
    forrest[ycordinate].slice(xcordinate + 1),
    forrest.filter((_, index) => index < ycordinate).map(v => v[xcordinate]),
    forrest.filter((_, index) => index > ycordinate).map(v => v[xcordinate]),
  ]
}
