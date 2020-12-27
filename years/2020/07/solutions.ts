export const part1 = (input: string[]) => {
  return calculateBagsThatCanContainBag(rules(input), 'shiny gold').size
}

export const part2 = (input: string[]) => {
  return calculateContainingBagCount(rules(input), 'shiny gold', 1)
}

const calculateBagsThatCanContainBag = (
  rules: ParsedRule,
  bag: string,
  containers: Set<string> = new Set(),
): Set<string> => {
  return Object.keys(rules).reduce((acc: Set<string>, key: string) => {
    if (rules[key].map(g => g[1]).includes(bag)) {
      containers.add(key)
      calculateBagsThatCanContainBag(rules, key, containers)
    }
    return containers
  }, containers)
}

const calculateContainingBagCount = (
  rules: ParsedRule,
  bag: string,
  containerCount: number,
  totalBags: number = 0,
): number => {
  return rules[bag].reduce((acc: number, val: string[]) => {
    let containedCount = Number(val[0])
    let containedBag = val[1]

    if (containedCount > 0) {
      acc += calculateContainingBagCount(
        rules,
        containedBag,
        containedCount * containerCount,
        containedCount * containerCount,
      )
    }
    return acc
  }, totalBags)
}

type ParsedRule = {
  [key: string]: string[][]
}

const rules = (input: string[]) => {
  return input.reduce((acc: ParsedRule, val: string) => ({ ...acc, ...parseRules(val) }), {})
}

const parseRules = (policy: string): ParsedRule => {
  const regex = policy.match(/(?<bagColor>.*)\sbags\scontain\s(?<contains>.*)\./)
  if (!regex || !regex.groups) throw new Error(`Sorry, couldn't find a match`)

  const { bagColor, contains } = regex.groups

  const arr = contains.split(',').map((bags: string): string[] => {
    const reg = bags.match(/(?<number>\d)\s(?<bag>.*)\sbags?/)
    if (!reg || !reg.groups) return []

    const { number, bag } = reg.groups

    return [number, bag]
  })

  return { [bagColor]: arr }
}
