export const part1 = (input: string[]) => {
  const matches = input.filter((policy: string) => {
    const [atLeast, atMost, password, stringToMatch] = regex_match(policy)

    const stringMatchCount = password.split('').reduce((accumulator: number, character: string) => {
      if (character == stringToMatch) accumulator += 1
      return accumulator
    }, 0)

    if (stringMatchCount >= parseInt(atLeast) && stringMatchCount <= parseInt(atMost)) {
      return true
    }

    return false
  })

  return matches.length
}

export const part2 = (input: string[]) => {
  const matches = input.filter((policy: string) => {
    const [position1, position2, password, stringToMatch] = regex_match(policy)

    if (
      (password.split('')[parseInt(position1) - 1] == stringToMatch &&
        password.split('')[parseInt(position2) - 1] != stringToMatch) ||
      (password.split('')[parseInt(position1) - 1] != stringToMatch &&
        password.split('')[parseInt(position2) - 1] == stringToMatch)
    ) {
      return true
    }

    return false
  })

  return matches.length
}

function regex_match(policy: string) {
  const regex = policy.match(/(?<position1>\d*)-(?<position2>\d*)\s(?<string_to_match>[a-zA-Z]):\s(?<password>.*)/)
  if (!regex || !regex.groups) throw new Error(`Sorry, couldn't find a match`)

  return [regex.groups.position1, regex.groups.position2, regex.groups.password, regex.groups.string_to_match]
}
