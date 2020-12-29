import { part1Matches, part2Matches } from './solutions'
import { input } from '../../../utils/helpers'

// Create input.txt file and add contents for this to run!
const init = () => {
  console.log(part1Matches(input(__dirname + `/input.txt`)).length)
  console.log(part2Matches(input(__dirname + `/input.txt`)).length)
}
init()
