import * as fs from 'fs'
import { input } from '../../../utils/helpers'
import { part1, part2 } from './solutions'

const init = () => {
  console.log(part1(input(__dirname + `/input.txt`)))
  console.log(part2(input(__dirname + `/input.txt`)))
}
init()
