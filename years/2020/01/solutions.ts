import { combinations } from '../../../utils/helpers'

export const calculate = (input: number[], num: number) => {
  const match = combinations(input, num).find((combination: number[]) => {
    return combination.reduce((calculation: number, currentNumber: number) => calculation + currentNumber, 0) === 2020
  })

  if (!match) {
    throw new Error(`Sorry, couldn't find a match`)
  }

  return match.reduce((a: number, b: number) => a * b, 1)
}
