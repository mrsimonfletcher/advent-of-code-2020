import { part1 } from './solutions'

const input = ['BFFFBBFRRR', 'FFFBBBFRRR', 'BBFFBBFRLL']

test('the highest seat number for the given input is ', () => {
  expect(part1(input)).toEqual(820)
})
