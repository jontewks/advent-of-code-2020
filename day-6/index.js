import { readInput } from '../helpers.js'

const inputPath = new URL('./input.txt', import.meta.url)
const input = await readInput(inputPath)
const inputArray = input.split('\n\n')

// Part 1
const cleanedInput = inputArray.map((x) => x.replace(/\n/g, ''))

let part1YesAnswers = 0
cleanedInput.forEach((input) => {
  const answers = input.split('')
  const set = new Set(answers)
  part1YesAnswers += set.size
})
console.log(part1YesAnswers)

// Part 2
let part2AllYesAnswers = 0
inputArray.forEach((input) => {
  const split = input.split('\n')
  const counts = split.reduce((counts, next) => {
    const answers = next.split('')
    answers.forEach((answer) => {
      if (counts[answer]) {
        counts[answer]++
      } else {
        counts[answer] = 1
      }
    })
    return counts
  }, {})

  Object.values(counts).forEach((count) => {
    if (count === split.length) {
      part2AllYesAnswers++
    }
  })
})
console.log(part2AllYesAnswers)
