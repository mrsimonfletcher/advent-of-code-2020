import { cons } from '../../../utils/helpers'

export const part1 = (input: string) => runner(input, 4)
export const part2 = (input: string) => runner(input, 14)

const runner = (input: string, count: number): number =>
  cons(input.split(''), count)
    .map(v => [...new Set(v)])
    .findIndex(v => v.length >= count) + count
