export const part1 = (input: string[]): number => {
  return input.reduce((acc: number, value: string) => (acc += calcuation(parseInt(value))), 0)
}

export const part2 = (input: string[]): number => {
  return input.reduce((acc: number, value: string) => (acc += calculatePart2(parseInt(value))), 0)
}

const calculatePart2 = (value: number, acc: number = 0): number => {
  const newVal = calcuation(value)

  if (newVal <= 0) return acc
  return calculatePart2(newVal, (acc += newVal))
}

const calcuation = (value: number): number => Math.floor(value / 3) - 2
