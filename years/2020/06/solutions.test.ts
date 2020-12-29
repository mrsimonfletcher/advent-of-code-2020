import { part1, part2 } from './solutions'

const input = ['abc', 'a\nb\nc', 'ab\nca', 'a\na\na\na', 'b\n']

test('number of questions that anyone answered yes to is equal to 11', () => {
  expect(part1(input)).toBe(11)
})

test('number of questions that everyone answered yes to is equal to 11', () => {
  expect(part2(input)).toBe(6)
})
