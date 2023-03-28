import { intersection, splitIntoChunk } from '../../../utils/helpers'

const scores = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 10,
  k: 11,
  l: 12,
  m: 13,
  n: 14,
  o: 15,
  p: 16,
  q: 17,
  r: 18,
  s: 19,
  t: 20,
  u: 21,
  v: 22,
  w: 23,
  x: 24,
  y: 25,
  z: 26,
  A: 27,
  B: 28,
  C: 29,
  D: 30,
  E: 31,
  F: 32,
  G: 33,
  H: 34,
  I: 35,
  J: 36,
  K: 37,
  L: 38,
  M: 39,
  N: 40,
  O: 41,
  P: 42,
  Q: 43,
  R: 44,
  S: 45,
  T: 46,
  U: 47,
  V: 48,
  W: 49,
  X: 50,
  Y: 51,
  Z: 52,
}
type Keys = keyof typeof scores

export const part1 = (input: string[]): number => {
  return input.reduce((acc: number, value: string): number => {
    const middle = Math.floor(value.length / 2)
    const intersct = intersection(Array.from(value.substring(0, middle)), Array.from(value.substring(middle)))

    return (acc += scores[intersct[0] as Keys])
  }, 0)
}

export const part2 = (input: string[]): number => {
  return splitIntoChunk(input, 3).reduce((acc: number, value: any[]): number => {
    const [r1, r2, r3] = value
    const r1chars = r1.split('')
    const r2chars = r2.split('')
    const r3chars = r3.split('')

    const intersecion1 = intersection(r1chars, r2chars)
    if (intersecion1.length <= 0) return acc

    const intersecion2 = intersection(intersecion1, r3chars)
    if (intersecion2.length <= 0) return acc

    return (acc += scores[intersecion2[0] as Keys])
  }, 0)
}
