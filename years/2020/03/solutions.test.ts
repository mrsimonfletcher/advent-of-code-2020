import { part1, part2 } from './solutions'

const input = [
  '..##.......',
  '#...#...#..',
  '.#....#..#.',
  '..#.#...#.#',
  '.#...##..#.',
  '..#.##.....',
  '.#.#.#....#',
  '.#........#',
  '#.##...#...',
  '#...##....#',
  '.#..#...#.#',
]

test('we encounter 7 trees when moving right 3 and down 1', () => {
  expect(part1(input)).toEqual(7)
})

test('number of trees multiplied together is equal to 336', () => {
  expect(part2(input)).toEqual(336)
})
