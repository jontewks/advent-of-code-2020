import { readInput } from '../helpers.js'

const inputPath = new URL('./input.txt', import.meta.url)
const input = await readInput(inputPath)
const inputArray = input.split('\n')

const slopes = [
  { right: 1, down: 1 },
  { right: 3, down: 1 },
  { right: 5, down: 1 },
  { right: 7, down: 1 },
  { right: 1, down: 2 },
]

let multipleOfTreeCount = 1

slopes.forEach(({ right, down }) => {
  let xPosition = 0
  let treeCount = 0

  for (let y = down; y < inputArray.length; y += down) {
    const row = inputArray[y]
    xPosition += right

    if (row[xPosition % row.length] === '#') {
      treeCount++
    }
  }

  console.log('Right:', right, 'Down:', down, 'Tree Count:', treeCount)
  multipleOfTreeCount *= treeCount
})

console.log('Multiple of tree count:', multipleOfTreeCount)
