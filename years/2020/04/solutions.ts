export const part1 = (input: string[]) => {
  return input.filter(val => {
    const passwordObj = passwordObject(val)

    if (!passwordHasValidKeys(passwordObj)) {
      return false
    }

    return true
  }).length
}

export const part2 = (input: string[]) => {
  return input.filter(val => {
    const passwordObj = passwordObject(val)

    if (!passwordHasValidKeys(passwordObj)) {
      return false
    }

    return Object.keys(passwordObj).every(key => {
      const value = passwordObj[key]
      switch (key) {
        case 'byr':
          return valueBetween(value, 1920, 2002)
        case 'iyr':
          return valueBetween(value, 2010, 2020)
        case 'eyr':
          return valueBetween(value, 2020, 2030)
        case 'hgt':
          const measurement = value.substr(-2)
          const length = value.slice(0, value.length - 2)
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
        case 'cid':
          return true
      }
    })
  }).length
}

const valueBetween = (value: string, a: number, b: number) => {
  return Number(value) >= a && Number(value) <= b
}

type PasswordObj = {
  [key: string]: string
}

const requireFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
const passwordHasValidKeys = (hash: PasswordObj) => {
  return requireFields.every(key => Object.keys(hash).includes(key))
}

const passwordObject = (input: string) => {
  return input
    .split('\n')
    .join(' ')
    .split(' ')
    .filter(val => val != '')
    .reduce((passwordObj: PasswordObj, currentValue: string) => {
      const [key, val] = currentValue.split(':')
      return { ...passwordObj, [key]: val }
    }, {})
}
