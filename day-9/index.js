import { readInput } from '../helpers.js'

const inputPath = new URL('./input.txt', import.meta.url)
const input = await readInput(inputPath)
const inputArray = input.split('\n').map(Number)

// Part 1
const preamble = 25
let weaknessNumber
for (let i = preamble; i < inputArray.length; i++) {
  let foundSum = false

  for (let j = i - preamble; j < i; j++) {
    for (let k = j + 1; k < i; k++) {
      if (inputArray[j] + inputArray[k] === inputArray[i]) {
        foundSum = true
      }
    }
  }

  if (!foundSum) {
    console.log('Part 1:', inputArray[i])
    weaknessNumber = inputArray[i]
  }
}

// Part 2
part2Loop: for (let i = 0; i < inputArray.length; i++) {
  let sum = 0
  const numbers = []

  for (let k = i; k < inputArray.length; k++) {
    sum += inputArray[k]
    numbers.push(inputArray[k])

    if (sum > weaknessNumber) {
      break
    } else if (sum === weaknessNumber) {
      numbers.sort((a, b) => a - b)
      console.log('Part 2:', numbers.shift() + numbers.pop())
      break part2Loop
    }
  }
}
