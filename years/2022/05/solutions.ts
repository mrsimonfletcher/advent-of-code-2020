export const part1 = (input: string[]) => generateSolution(input, part1Sort)
export const part2 = (input: string[]) => generateSolution(input, part2Sort)

const part1Sort = (input: string[]): string[] => input.reverse()
const part2Sort = (input: string[]): string[] => input

const generateSolution = (input: string[], sortFunc: (input: string[]) => string[]) => {
  const crates = input[0]
  const moves = input[1]

  // Create the following format
  // [
  //   [ '[Z]', '[N]' ],
  //   [ '[M]', '[C]', '[D]' ],
  //   [ '[P]' ]
  // ]
  const originalCrates = crates
    .split('\n')
    .slice(0, -1)
    .reduce((acc: string[][], value) => {
      const createLine = value.match(/(.{1,3})\s?/g)
      createLine?.forEach((element, index) => {
        if (element.trim() == '') return
        if (!acc[index]) acc[index] = []
        acc[index].unshift(element.trim().replace('[', '').replace(']', ''))
      })
      return acc
    }, [])

  const rearrangedCrates = moves.split('\n').reduce((acc: string[][], value) => {
    const regex = value.match(/move\s(?<amount>\d+)\sfrom\s(?<from>\d+)\sto\s(?<to>\d+)/)
    if (!regex || !regex.groups) throw new Error(`Sorry, couldn't find a match`)

    const { rawAmount, rawFrom, rawTo } = regex.groups

    const from = parseInt(rawFrom) - 1
    const to = parseInt(rawTo) - 1
    const amount = parseInt(rawAmount)

    const newArr = [...acc]
    const toMove = newArr[from].splice(newArr[from].length - amount)

    newArr[to] = [...newArr[to], ...sortFunc(toMove)]

    return newArr
  }, originalCrates)

  return rearrangedCrates.reduce((acc: string, value: string[]) => (acc += value?.pop() || 0), '')
}
