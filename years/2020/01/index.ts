import { calculate } from './solutions'
import { input } from '../../../utils/helpers'

const init = () => {
  console.log(
    calculate(
      input(__dirname + `/input.txt`).map(v => parseInt(v)),
      2,
    ),
  )

  console.log(
    calculate(
      input(__dirname + `/input.txt`).map(v => parseInt(v)),
      3,
    ),
  )
}
init()
