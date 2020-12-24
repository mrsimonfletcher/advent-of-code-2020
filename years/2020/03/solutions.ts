import { range } from '../../../utils/helpers'

class Grid {
  private input: string[]
  private grid: string[][]
  private currentPosition: number[]

  constructor(input: string[], currentPosition: number[] = [0, 0]) {
    this.input = input
    this.currentPosition = currentPosition
    this.grid = this.input.map(row => row.split(''))
  }

  // Wrap grid will essentially build the right side again if the position exceeds the current grid
  wrapGrid() {
    this.grid = this.grid.map((val, index) => val.concat(val))
  }

  currentValue() {
    // If we have got to the bottom of the grid, we no longer care.
    if (!this.grid[this.currentPosition[0]]) {
      return null
    }

    // If the current positing overlaps the right of the grid, we need to build the right side of the grid
    if (this.grid[this.currentPosition[0]] && !this.grid[this.currentPosition[0]][this.currentPosition[1]]) {
      this.wrapGrid()
    }

    return this.grid[this.currentPosition[0]][this.currentPosition[1]]
  }

  north(num: number) {
    this.currentPosition = [this.currentPosition[0] - num, this.currentPosition[1]]
  }

  east(num: number) {
    this.currentPosition = [this.currentPosition[0], this.currentPosition[1] + num]
  }

  south(num: number) {
    this.currentPosition = [this.currentPosition[0] + num, this.currentPosition[1]]
  }

  west(num: number) {
    this.currentPosition = [this.currentPosition[0], this.currentPosition[1] - num]
  }
}

const performSequence = (input: string[], moves: { east: number; south: number }[]) => {
  return moves.map(({ east, south }) => {
    const grid = new Grid(input)

    const positionValues = range(0, input.length - 2).map(() => {
      grid.east(east)
      grid.south(south)
      return grid.currentValue()
    })

    return positionValues.filter(Boolean).map(val => (val === '.' ? 'O' : 'X'))
  })
}

export const part1 = (input: string[]) => {
  const slopes = performSequence(input, [{ east: 3, south: 1 }])

  return slopes.map(slope => slope.filter(val => val === 'X').length)[0]
}

export const part2 = (input: string[]) => {
  const moves = [
    { east: 1, south: 1 },
    { east: 3, south: 1 },
    { east: 5, south: 1 },
    { east: 7, south: 1 },
    { east: 1, south: 2 },
  ]

  const slopes = performSequence(input, moves)

  return slopes.map(val => val.filter(x => x === 'X').length).reduce((a, b) => a * b, 1)
}
