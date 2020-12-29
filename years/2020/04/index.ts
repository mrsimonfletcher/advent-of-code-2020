import * as fs from 'fs'
import { part1, part2 } from './solutions'

// Create input.txt file and add contents for this to run!
const init = () => {
  const passports = fs.readFileSync(`${__dirname}/input.txt`).toString().split(/\n\n/)
  console.log(part1(passports))
  console.log(part2(passports))
}
init()
