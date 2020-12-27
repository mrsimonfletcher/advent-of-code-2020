import * as fs from 'fs'
import { part1, part2 } from './solutions'
import { input } from '../../../utils/helpers'

const init = () => {
  const inputArray = input(`${__dirname}/input.txt`, false, /\n\n/)
  console.log(part1(inputArray))
  console.log(part2(inputArray))
}
init()
