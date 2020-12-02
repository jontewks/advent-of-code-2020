import { readInput } from '../helpers.js'

const inputPath = new URL('./input.txt', import.meta.url)
const input = await readInput(inputPath)
const inputArray = input.split('\n')

let validPasswordsPart1 = 0
let validPasswordsPart2 = 0

inputArray.forEach((x) => {
  const [rule, password] = x.split(': ')
  const [range, character] = rule.split(' ')
  const [min, max] = range.split('-')
  const matchingCharacters = password.split('').filter((c) => c === character)

  if (matchingCharacters.length >= min && matchingCharacters.length <= max) {
    validPasswordsPart1++
  }

  const position1 = min - 1
  const position2 = max - 1
  const firstPositionMatch = password[position1] === character
  const secondPositionMatch = password[position2] === character

  if (
    (firstPositionMatch || secondPositionMatch) &&
    !(firstPositionMatch && secondPositionMatch)
  ) {
    validPasswordsPart2++
  }
})

console.log('Part 1:', validPasswordsPart1)
console.log('Part 2:', validPasswordsPart2)
