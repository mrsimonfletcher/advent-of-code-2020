import { calculate } from './solutions'
import { input } from '../../../utils/helpers'

const init = () => {
  console.log(calculate(input(`${__dirname}/input.txt`).map(Number), 2))
  console.log(calculate(input(`${__dirname}/input.txt`).map(Number), 3))
}
init()
