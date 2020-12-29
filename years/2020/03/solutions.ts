import { range } from '../../../utils/helpers'

type Move = {
  east: number
  south: number
}

class Grid {
  private grid: string[][]
  private x: number
  private y: number

  constructor(input: string[]) {
    this.x = 0
    this.y = 0
    this.grid = input.map(row => row.split(''))
  }

  currentValue() {
    // If we have got to the bottom of the grid, we no longer care.
    if (!this.grid[this.x]) {
      return null
    }

    // If the current positioning overlaps the right of the grid, we need to build the right side of the grid
    if (this.grid[this.x] && !this.grid[this.x][this.y]) {
      this.grid = this.grid.map((val, index) => val.concat(val))
    }

    return this.grid[this.x][this.y]
  }

  north(num: number) {
    this.x -= num
  }

  east(num: number) {
    this.y += num
  }

  south(num: number) {
    this.x += num
  }

  west(num: number) {
    this.y -= num
  }
}

const performSequence = (input: string[], moves: Move[]) => {
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

  return slopes.map(slope => slope.filter(val => val === 'X').length).reduce((a, b) => a * b, 1)
}
