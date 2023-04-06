export const part1 = (input: string[]) => {
  const forrest = input.reduce((acc: number[][], value) => [...acc, value.split('').map(v => Number(v))], [])
  const innerLength = forrest[0].length - 1

  const initialExposedCount = forrest.length * 2 + forrest[0].length * 2 - 4

  const additionalExposed = forrest.reduce((acc, _, yindex) => {
    if (yindex == 0 || yindex == forrest.length) return acc
    Array.from(Array(innerLength)).forEach((_, xindex) => {
      if (xindex == 0 || yindex == innerLength) return acc
      acc += exposed(forrest, xindex, yindex) ? 1 : 0
    })
    return acc
  }, 0)

  return initialExposedCount + additionalExposed
}
export const part2 = (input: string[]) => {
  const forrest = input.reduce((acc: number[][], value) => [...acc, value.split('').map(v => Number(v))], [])
  const innerLength = forrest[0].length - 1

  const highestScenicScore = forrest.reduce((acc, _, yindex) => {
    if (yindex == 0 || yindex == forrest.length) return acc

    Array.from(Array(innerLength)).forEach((_, xindex) => {
      if (xindex == 0 || yindex == innerLength) return acc

      const score = scenicScore(forrest, xindex, yindex)
      if (score > acc) acc = score
    })
    return acc
  }, 0)

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

  const countValuesAboveHeight = (values: number[]): number => {
    let count = 0
    for (const value of values) {
      if (value >= currentHeight) {
        count++
        break
      } else {
        count++
      }
    }
    return count
  }

  return (
    countValuesAboveHeight(leftSide.reverse()) *
    countValuesAboveHeight(rightSide) *
    countValuesAboveHeight(top.reverse()) *
    countValuesAboveHeight(bottom)
  )
}

const sides = (forrest: number[][], xcordinate: number, ycordinate: number) => {
  return [
    forrest[ycordinate].slice(0, xcordinate),
    forrest[ycordinate].slice(xcordinate + 1),
    forrest.filter((_, index) => index < ycordinate).map(v => v[xcordinate]),
    forrest.filter((_, index) => index > ycordinate).map(v => v[xcordinate]),
  ]
}
