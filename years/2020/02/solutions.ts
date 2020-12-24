export const part1Matches = (input: string[]) => {
  const matches = input.filter((policy: string) => {
    const [atLeast, atMost, password, stringToMatch] = regexMatch(policy)

    const stringMatchCount = password.split('').reduce((accumulator: number, character: string) => {
      if (character == stringToMatch) accumulator += 1
      return accumulator
    }, 0)

    if (stringMatchCount >= parseInt(atLeast) && stringMatchCount <= parseInt(atMost)) {
      return true
    }

    return false
  })

  return matches
}

export const part2Matches = (input: string[]) => {
  const matches = input.filter((policy: string) => {
    const [position1, position2, password, stringToMatch] = regexMatch(policy)

    const p1 = password.charAt(Number(position1) - 1)
    const p2 = password.charAt(Number(position2) - 1)

    if ((p1 == stringToMatch && p2 != stringToMatch) || (p1 != stringToMatch && p2 == stringToMatch)) {
      return true
    }

    return false
  })

  return matches
}

function regexMatch(policy: string) {
  const regex = policy.match(/(?<position1>\d*)-(?<position2>\d*)\s(?<stringToMatch>[a-zA-Z]):\s(?<password>.*)/)
  if (!regex || !regex.groups) throw new Error(`Sorry, couldn't find a match`)

  const { position1, position2, password, stringToMatch } = regex.groups
  return [position1, position2, password, stringToMatch]
}
