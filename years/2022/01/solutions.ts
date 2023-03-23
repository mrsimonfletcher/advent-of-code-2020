export const part1 = (input: string[]) => {
  return getUsers(input)
    .sort((a, b) => a - b)
    .pop()
}

export const part2 = (input: string[]) => {
  const users = getUsers(input)

  return users
    .sort((a, b) => a - b)
    .splice(users.length - 3)
    .reduce((acc: number, currentVal: number) => {
      return acc + currentVal
    }, 0)
}

const getUsers = (input: string[]) => {
  return input.map(v => {
    return v
      .toString()
      .split(/\n/)
      .reduce((acc: number, currentVal: string) => {
        return (acc += parseInt(currentVal))
      }, 0)
  })
}
