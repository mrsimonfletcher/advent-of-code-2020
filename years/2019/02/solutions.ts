export const part1 = (input: string[]): number => {
  const i = input[0].split(',').map(v => Number(v))
  i[1] = 12
  i[2] = 2

  const g = calculatePart1(i)
  return g[0]
}

const calculatePart1 = (input: number[], key: number = 0): number[] => {
  const opcode = input[key]
  if (opcode != 1 && opcode != 2 && opcode != 99) {
    throw `Unknown opcode ${opcode}`
  }

  const newArr = [...input]

  if (newArr[key] == 99) {
    return newArr
  }

  const posA = newArr[newArr[key + 1]]
  const posB = newArr[newArr[key + 2]]
  const posC = newArr[key + 3]
  newArr[posC] = newArr[key] == 1 ? posA + posB : newArr[key] == 2 ? posA * posB : newArr[posC]

  return calculatePart1(newArr, key + 4)
}
