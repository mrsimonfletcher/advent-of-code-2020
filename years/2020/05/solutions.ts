export const part1 = (input: string[]): number => seats(input).reduce((a, b) => Math.max(a, b))

export const part2 = (input: string[]): number => {
  const seatIds = seats(input)

  return (
    (seatIds.sort().find((seatId: number, index: number) => index > 1 && seatId - seatIds[index - 1] === 2) || 0) - 1
  )
}

const seats = (input: string[]): number[] => {
  return input.map(pass => {
    const rows = Array.from(Array(128), (_, i) => i)
    const columns = Array.from(Array(8), (_, i) => i)

    const rowChars = pass.substr(0, 7)
    const columChars = pass.substr(-3)

    // Perform binary search
    const rowPos = rowChars.split('').reduce((acc: number[], code: string) => move(acc, code), rows)
    const columnPos = columChars.split('').reduce((acc: number[], code: string) => move(acc, code), columns)

    return rowPos[0] * 8 + columnPos[0]
  })
}

const move = (rows: number[], code: string): number[] => {
  if (code === 'F' || code === 'L') {
    return [...rows.slice(0, rows.length / 2)]
  } else {
    return [...rows.slice(rows.length / 2, rows.length)]
  }
}
