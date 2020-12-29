export const part1 = (input: string[]) => {
  return input.filter(val => passportHasValidKeys(passportObject(val))).length
}

export const part2 = (input: string[]) => {
  return input.filter(val => {
    const passportObj = passportObject(val)

    if (!passportHasValidKeys(passportObj)) {
      return false
    }

    return Object.entries(passportObj).every(([key, value]) => {
      switch (key) {
        case 'byr':
          return valueBetween(value, 1920, 2002)
        case 'iyr':
          return valueBetween(value, 2010, 2020)
        case 'eyr':
          return valueBetween(value, 2020, 2030)
        case 'hgt':
          const [length, measurement] = [value.slice(0, -2), value.slice(-2)]
          if (measurement == 'cm') {
            return valueBetween(length, 150, 193)
          } else if (measurement == 'in') {
            return valueBetween(length, 59, 76)
          }
          return false
        case 'hcl':
          return /^#[a-z0-9]{6}$/.test(value)
        case 'ecl':
          return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value)
        case 'pid':
          return /^(\d{9})$/.test(value)
        default:
          return true
      }
    })
  }).length
}

const valueBetween = (value: string, a: number, b: number) => {
  return Number(value) >= a && Number(value) <= b
}

type passportObj = {
  [key: string]: string
}

const passportHasValidKeys = (hash: passportObj) => {
  const requireFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
  return requireFields.every(key => Object.keys(hash).includes(key))
}

const passportObject = (input: string) => {
  return input
    .split('\n')
    .join(' ')
    .split(' ')
    .filter(val => val !== '')
    .reduce((passportObj: passportObj, currentValue: string) => {
      const [key, val] = currentValue.split(':')
      return { ...passportObj, [key]: val }
    }, {})
}
