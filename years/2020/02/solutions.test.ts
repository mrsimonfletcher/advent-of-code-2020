import { part1Matches, part2Matches } from './solutions'

const input = ['1-3 a: abcde', '1-3 b: cdefg', '2-9 c: ccccccccc']

test('2 passwords are valid under part 1 rules', () => {
  expect(part1Matches(input)).toEqual(['1-3 a: abcde', '2-9 c: ccccccccc'])
})

test('1 password is valid under part 2 rules', () => {
  expect(part2Matches(input)).toEqual(['1-3 a: abcde'])
})
