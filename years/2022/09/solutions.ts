interface Tracker {
  currentPositions: {
    H: number[]
    T: number[]
  }
  visited: { [key: string]: any }
}

export const part1 = (input: string[]) => {
  const tracker = input.reduce(
    (acc: Tracker, value) => {
      const regex = value.match(/(?<direction>R|L|U|D)\s(?<steps>\d+)/)
      if (!regex || !regex.groups) throw new Error(`Sorry, couldn't find a match`)

      const { direction, steps } = regex.groups

      for (let i = 0; i < Number(steps); i++) {
        const [x, y] = acc.currentPositions.H
        switch (direction) {
          case 'R':
            acc.currentPositions.H = [x + 1, y]
            break
          case 'L':
            acc.currentPositions.H = [x - 1, y]
            break
          case 'U':
            acc.currentPositions.H = [x, y + 1]
            break
          case 'D':
            acc.currentPositions.H = [x, y - 1]
            break
          default:
            throw new Error('unknown direction')
            break
        }

        const returnEarlyPositions = [
          `${acc.currentPositions.H[0]}-${acc.currentPositions.H[1]}`,
          `${acc.currentPositions.H[0] - 1}-${acc.currentPositions.H[1]}`,
          `${acc.currentPositions.H[0] + 1}-${acc.currentPositions.H[1]}`,
          `${acc.currentPositions.H[0]}-${acc.currentPositions.H[1] - 1}`,
          `${acc.currentPositions.H[0]}-${acc.currentPositions.H[1] + 1}`,
        ]

        if (returnEarlyPositions.includes(`${acc.currentPositions.T[0]}-${acc.currentPositions.T[1]}`)) {
          continue
        }

        const moveSameDirectionPositions = [
          `${acc.currentPositions.H[0] - 2}-${acc.currentPositions.H[1]}`,
          `${acc.currentPositions.H[0] + 2}-${acc.currentPositions.H[1]}`,
          `${acc.currentPositions.H[0]}-${acc.currentPositions.H[1] - 2}`,
          `${acc.currentPositions.H[0]}-${acc.currentPositions.H[1] + 2}`,
        ]

        if (moveSameDirectionPositions.includes(`${acc.currentPositions.T[0]}-${acc.currentPositions.T[1]}`)) {
          switch (direction) {
            case 'R':
              acc.currentPositions.T = [acc.currentPositions.H[0] - 1, acc.currentPositions.H[1]]
              break
            case 'L':
              acc.currentPositions.T = [acc.currentPositions.H[0] + 1, acc.currentPositions.H[1]]
              break
            case 'U':
              acc.currentPositions.T = [acc.currentPositions.H[0], acc.currentPositions.H[1] - 1]
              break
            case 'D':
              acc.currentPositions.T = [acc.currentPositions.H[0], acc.currentPositions.H[1] + 1]
              break
            default:
              throw new Error('unknown direction')
              break
          }

          acc.visited[`${acc.currentPositions.T[0]}-${acc.currentPositions.T[1]}`] = true
        }

        const inDiagonalPosition = [
          `${acc.currentPositions.H[0] - 1}-${acc.currentPositions.H[1] + 2}`,
          `${acc.currentPositions.H[0] + 1}-${acc.currentPositions.H[1] + 2}`,
          `${acc.currentPositions.H[0] + 1}-${acc.currentPositions.H[1] - 2}`,
          `${acc.currentPositions.H[0] - 1}-${acc.currentPositions.H[1] - 2}`,
          `${acc.currentPositions.H[0] - 2}-${acc.currentPositions.H[1] + 1}`,
          `${acc.currentPositions.H[0] + 2}-${acc.currentPositions.H[1] + 1}`,
          `${acc.currentPositions.H[0] + 2}-${acc.currentPositions.H[1] - 1}`,
          `${acc.currentPositions.H[0] - 2}-${acc.currentPositions.H[1] - 1}`,
        ]

        if (inDiagonalPosition.includes(`${acc.currentPositions.T[0]}-${acc.currentPositions.T[1]}`)) {
          switch (direction) {
            case 'R':
              acc.currentPositions.T = [acc.currentPositions.H[0] - 1, acc.currentPositions.H[1]]
              break
            case 'L':
              acc.currentPositions.T = [acc.currentPositions.H[0] + 1, acc.currentPositions.H[1]]
              break
            case 'U':
              acc.currentPositions.T = [acc.currentPositions.H[0], acc.currentPositions.H[1] - 1]
              break
            case 'D':
              acc.currentPositions.T = [acc.currentPositions.H[0], acc.currentPositions.H[1] + 1]
              break
            default:
              throw new Error('unknown direction')
              break
          }
          acc.visited[`${acc.currentPositions.T[0]}-${acc.currentPositions.T[1]}`] = true
        }
      }

      return acc
    },
    { currentPositions: { H: [0, 0], T: [0, 0] }, visited: { '0-0': true } },
  )

  return Object.keys(visited.visited).length
}

export const part2 = (input: string[]) => {
  return 'part 2'
}
