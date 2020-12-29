export const part1 = (input: string[]): number => {
  return input
    .map(fileContents => {
      return fileContents
        .replace(/\n/g, '')
        .split('')
        .reduce((acc, val) => acc.add(val), new Set())
    })
    .reduce((acc, val) => (acc += val.size), 0)
}

export const part2 = (input: string[]): number => {
  return input
    .map(group => {
      return group
        .split('\n')
        .filter(v => v !== '') // ensure that we don't compare a blank string
        .map(v => v.split(''))
        .reduce((acc, v) => acc.filter(c => v.includes(c)))
    })
    .reduce((acc, val) => (acc += val.length), 0)
}
