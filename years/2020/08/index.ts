import { part1, part2 } from './solutions'
import { input } from '../../../utils/helpers'

const init = () => {
  console.log(part1(input(`${__dirname}/input.txt`)))
  console.log(part2(input(`${__dirname}/input.txt`)))
}
init()
