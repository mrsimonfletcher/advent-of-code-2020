import { part1, part2 } from './solutions'
import { input } from '../../../utils/helpers'

// Create input.txt file and add contents for this to run!
const init = () => {
  const inputArray = input(`${__dirname}/input.txt`, false, /\n\n/)
  console.log(part1(inputArray))
  console.log(part2(inputArray))
}
init()
