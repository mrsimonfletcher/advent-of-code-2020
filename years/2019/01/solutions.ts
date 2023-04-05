export const part1 = (input: string[]): number => input.reduce((acc, value) => acc + calculation(Number(value)), 0)
export const part2 = (input: string[]): number => input.reduce((acc, value) => acc + calculatePart2(Number(value)), 0)

const calculation = (value: number): number => Math.floor(value / 3) - 2

const calculatePart2 = (value: number, acc: number = 0): number => {
  const newVal = calculation(value)

  if (newVal <= 0) return acc
  return calculatePart2(newVal, acc + newVal)
}
