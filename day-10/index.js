import { readInput } from '../helpers.js'

const inputPath = new URL('./input.txt', import.meta.url)
const input = await readInput(inputPath)
const inputArray = input.split('\n').map(Number)

inputArray.sort((a, b) => a - b)
const lastAdapter = inputArray[inputArray.length - 1]

// Part 1
let oneJoltDiff = 0

// Starts with 1 since the last jump is always 3 to the device
let threeJoltDiff = 1

inputArray.forEach((jolt, i) => {
  const lastJolt = inputArray[i - 1] || 0
  const joltDiff = jolt - lastJolt
  if (joltDiff === 1) {
    oneJoltDiff++
  } else if (joltDiff === 3) {
    threeJoltDiff++
  }
})

console.log('Part 1:', oneJoltDiff * threeJoltDiff)

// Part 2
// let totalAdapterOptions = 0
// const findNextAdapterOption = (current, remaining) => {
//   if (!remaining.length) {
//     totalAdapterOptions++
//     return
//   }

//   const remainingCopy = [...remaining]
//   while (remainingCopy[0] - current <= 3) {
//     findNextAdapterOption(remainingCopy.shift(), remainingCopy)
//   }
// }
// findNextAdapterOption(0, inputArray)

const stepsToJoltages = inputArray.reduce(
  (totals, jolt) => {
    totals[jolt] =
      (totals[jolt - 3] || 0) +
      (totals[jolt - 2] || 0) +
      (totals[jolt - 1] || 0)
    return totals
  },
  [1]
)

console.log('Part 2:', stepsToJoltages.pop())
