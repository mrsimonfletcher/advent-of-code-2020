import { calculate } from './solutions'

const input = [1721, 979, 366, 299, 675, 1456]

test('the multiplication of the two entries that sum to 2020 is 514579', () => {
  expect(calculate(input, 2)).toBe(514579)
})

test('the multiplication of the three entries that sum to 2020 is 241861950', () => {
  expect(calculate(input, 3)).toBe(241861950)
})
