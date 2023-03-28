export const part1 = (input: string[]) => generateSolution(input, part1Calculator)
export const part2 = (input: string[]) => generateSolution(input, part2Calculator)

const part1Calculator = (smallest: any[], largest: any[], acc: number): number => {
  return smallest.every((currentValue, index) => (currentValue != 'X' ? true : largest[index] == currentValue))
    ? (acc += 1)
    : acc
}

const part2Calculator = (smallest: any[], largest: any[], acc: number): number => {
  return smallest.some((currentValue, index) => (currentValue != 'X' ? false : largest[index] == currentValue))
    ? (acc += 1)
    : acc
}

const generateSolution = (
  input: string[],
  calculator: (smallest: any[], largest: any, acc: number) => number,
): number => {
  return input.reduce((acc: number, value: string) => {
    const [smallest, largest] = pairGenerator(value)
    return calculator(smallest, largest, acc)
  }, 0)
}

const pairGenerator = (value: string): [any[], any[]] => {
  const [elf1, elf2] = value.split(',')
  const [elf1Start, elf1Finish] = elf1.split('-')
  const [elf2Start, elf2Finish] = elf2.split('-')
  let arr = Array.from(Array(2), () => [...new Array(100)])

  arr[0] = [...arr[0]].fill('X', parseInt(elf1Start) - 1, parseInt(elf1Finish))
  arr[1] = [...arr[1]].fill('X', parseInt(elf2Start) - 1, parseInt(elf2Finish))

  return parseInt(elf1Finish) - parseInt(elf1Start) < parseInt(elf2Finish) - parseInt(elf2Start)
    ? [arr[0], arr[1]]
    : [arr[1], arr[0]]
}
