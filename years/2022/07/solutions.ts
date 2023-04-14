const CHANGE_DIR = /\$\scd\s(?<dir>.*)/
const LIST_DIR = /\$\sls/
const DIR_REGEX = /dir\s.*/

interface StringArray {
  [index: string]: number
}

// This needs refactoring!!!

export const part1 = (input: string[]) => {
  let parentNode = new TreeNode(0, true)
  let stack: TreeNode[] = [parentNode]

  const dirTree = input.forEach(value => {
    const regex = value.match(CHANGE_DIR)

    let dir
    if (regex && regex.groups) {
      dir = regex.groups?.dir
    }

    if (dir === '/') {
      stack = [parentNode]
      return
    }

    if (value.match(LIST_DIR) || value.match(DIR_REGEX)) {
      // We don't care about listing a directory
      return
    }

    if (dir != '..' && dir) {
      const newNode = new TreeNode(0, true, dir)
      const parentNode = stack.pop()
      if (!parentNode) throw new Error('Error, should have parent node')
      // Add node as decendent
      parentNode.addDescendent(newNode)

      stack = [...stack, parentNode, newNode]
      return
    }

    if (dir === '..') {
      stack = [...stack.slice(0, -1)]
      return
    }

    const currentTreeNode = stack.pop()
    if (!currentTreeNode) throw new Error('error, should have a node here')

    const [size, _] = value.split(' ')

    currentTreeNode.addDescendent(new TreeNode(Number(size)))

    stack = [...stack, currentTreeNode]
  })

  console.log(
    parentNode.nodesUnderThreshold().reduce((acc: number, node: TreeNode) => {
      return acc + node.value
    }, 0),
  )
  let [first] = parentNode
    .nodesOverThreshold(30000000 - (70000000 - parentNode.value))
    .sort((a, b) => a.value - b.value)
  console.log(first.value)

  return 'part 1'
}

export const part2 = (input: string[]) => {
  return 'part 2'
}

class TreeNode {
  value: number = 0
  directory: boolean = false
  directoryName: string = ''
  descendents: TreeNode[] = []

  constructor(value: number = 0, directory = false, directoryName = '') {
    this.value = value
    this.directory = directory
    this.directoryName = directoryName
  }

  addDescendent(node: TreeNode): void {
    this.descendents = [...this.descendents, node]
  }

  addSize(value: number) {
    this.value += value
  }

  sumTotal(): number {
    if (!this.directory) return this.value

    const rv = this.descendents.reduce((acc, node) => {
      return acc + node.sumTotal()
    }, 0)

    this.value = rv
    return rv
  }

  nodesUnderThreshold(): TreeNode[] {
    this.sumTotal()

    return this.descendents.reduce((acc: TreeNode[], node) => {
      if (!node.directory) return acc

      if (node.value <= 100000) {
        acc = [...acc, node]
      }

      if (node.descendents.length > 0) {
        acc = [...acc, ...node.nodesUnderThreshold()]
      }

      return acc
    }, [])
  }

  nodesOverThreshold(threshold: number): TreeNode[] {
    this.sumTotal()

    return this.descendents.reduce((acc: TreeNode[], node) => {
      if (!node.directory) return acc

      if (node.value >= threshold) {
        acc = [...acc, node]
      }

      if (node.descendents.length > 0) {
        acc = [...acc, ...node.nodesOverThreshold(threshold)]
      }

      return acc
    }, [])
  }
}
