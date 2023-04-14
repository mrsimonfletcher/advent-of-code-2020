const signalCheckers: number[] = [20, 60, 100, 140, 180, 220]

interface Instruction {
  instruction: string
  number: number | undefined
  operation: string | undefined
}

export const part1 = (input: string[]) => {
  const instructions = new SignalStrengthChecker(input)

  let x = 1
  let tick = 0
  let signalStrength = 0
  while (instructions.running(tick)) {
    if (signalCheckers.includes(tick)) signalStrength += tick * x
    x = instructions.run(tick, x)
    tick++
  }

  return signalStrength
}

export const part2 = (input: string[]) => {
  const instructions = new SignalStrengthChecker(input)

  let grid = Array.from({ length: 6 }, (v, i) => Array(40))
  let spritePosition = 1

  let tick = 0
  while (instructions.running(tick)) {
    spritePosition = instructions.run(tick, spritePosition)

    const x = tick % 40
    const y = Math.floor(tick / 40)

    const possibleCrossover = [spritePosition, spritePosition - 1, spritePosition + 1]
    grid[y][x] = possibleCrossover.includes(x) ? '#' : '.'

    tick++
  }

  return grid.reduce((acc, v) => `${acc}${v.join()}\n`, '')
}

class SignalStrengthChecker {
  static noopTickCount: number = 1
  static addTickCount: number = 2

  instructions: Instruction[] = []
  lastInstruction: Instruction | undefined
  lastInstructionTick: number = 0

  constructor(input: string[]) {
    this.instructions = input.reduce((acc: Instruction[], value) => {
      const [i, n] = value.split(' ')
      const num = Number(n)

      return [
        ...acc,
        {
          instruction: i,
          number: num ? (num < 0 ? Math.abs(Number(n)) : Number(n)) : undefined,
          operation: num ? (num < 0 ? '-' : '+') : undefined,
        },
      ]
    }, [])
  }

  run(tick: number, value: number): number {
    if (this.noopInstructionCompleteOnTick(tick) || tick == 0) {
      // do nothing here except remove the first item from the queue & set last tick.
      this.setNextInstruction(tick)
      return value
    }

    if (this.lastInstruction && this.addxInstructionCompleteOnTick(tick)) {
      const { operation, number } = this.lastInstruction
      if (!number) return value

      this.setNextInstruction(tick)
      return operation == '-' ? value - number : value + number
    }

    return value
  }

  running(tick: number): boolean {
    return this.instructions.length > 0 ? true : !this.lastInstructionCompleteOnTick(tick)
  }

  setNextInstruction(tick: number): void {
    this.lastInstruction = this.instructions.shift()
    this.lastInstructionTick = tick
  }

  lastInstructionCompleteOnTick(tick: number): boolean {
    return this.addxInstructionCompleteOnTick(tick) || this.noopInstructionCompleteOnTick(tick)
  }

  noopInstructionCompleteOnTick(tick: number): boolean {
    return (
      this.lastInstruction?.instruction == 'noop' &&
      tick == this.lastInstructionTick + SignalStrengthChecker.noopTickCount
    )
  }

  addxInstructionCompleteOnTick(tick: number): boolean {
    return (
      this.lastInstruction?.instruction == 'addx' &&
      tick == this.lastInstructionTick + SignalStrengthChecker.addTickCount
    )
  }
}
