type opponentShapes = 'A' | 'B' | 'C'
type myShapes = 'X' | 'Y' | 'Z'

const shapeScores = { X: 1, Y: 2, Z: 3 }
const outcomeScores = { win: 6, draw: 3, loss: 0 }

const combinations = {
  win: { A: 'Y', B: 'Z', C: 'X' },
  draw: { A: 'X', B: 'Y', C: 'Z' },
  loss: { A: 'Z', B: 'X', C: 'Y' },
}

export const part1 = (input: string[]): number => {
  return input.reduce((acc: number, value) => {
    const [opponentShape, myShape] = value.split(' ')
    const result =
      combinations.win[opponentShape as opponentShapes] == myShape
        ? 'win'
        : combinations.draw[opponentShape as opponentShapes] == myShape
        ? 'draw'
        : 'loss'
    return (acc += outcomeScores[result] + shapeScores[myShape as myShapes])
  }, 0)
}

export const part2 = (input: string[]): number => {
  return input.reduce((acc: number, value) => {
    const [opponentShape, myShape] = value.split(' ')
    const result = myShape == 'X' ? 'loss' : myShape == 'Y' ? 'draw' : 'win'

    return (acc += calculate(result, opponentShape as opponentShapes))
  }, 0)
}

const calculate = (str: 'win' | 'draw' | 'loss', opponentShape: opponentShapes): number => {
  const key = combinations[str][opponentShape as opponentShapes] as myShapes
  return outcomeScores[str] + shapeScores[key]
}
