import * as fs from "fs"

export function input(file_path: string): string[] {
  const array = fs
    .readFileSync(file_path)
    .toString()
    .split(/\n/)

  // Remove the last element from array which is always empty.
  array.pop()

  return array
}
