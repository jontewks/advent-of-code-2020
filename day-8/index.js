import { readInput } from '../helpers.js'

const inputPath = new URL('./input.txt', import.meta.url)
const input = await readInput(inputPath)
const inputArray = input.split('\n')

const testLoopiness = (input) => {
  let currentIndex = 0
  let accumulator = 0
  const previouslyRunIndecies = new Set()

  while (true) {
    if (previouslyRunIndecies.has(currentIndex)) {
      return false
    }
    if (currentIndex === input.length) {
      console.log(accumulator)
      return true
    }

    previouslyRunIndecies.add(currentIndex)

    const instruction = input[currentIndex]
    if (!instruction) {
      return false
    }

    const [action, amount] = instruction.split(' ')
    const amountAsNumber = Number(amount)

    if (action === 'acc') {
      accumulator += amountAsNumber
      currentIndex++
    } else if (action === 'jmp') {
      currentIndex += amountAsNumber
    } else if (action === 'nop') {
      currentIndex++
    }
  }
}

inputArray.forEach((instruction, i) => {
  if (instruction.includes('nop')) {
    const newInstruction = instruction.replace('nop', 'jmp')
    const modifiedInput = [...inputArray]
    modifiedInput[i] = newInstruction
    testLoopiness(modifiedInput)
  } else if (instruction.includes('jmp')) {
    const newInstruction = instruction.replace('jmp', 'nop')
    const modifiedInput = [...inputArray]
    modifiedInput[i] = newInstruction
    testLoopiness(modifiedInput)
  }
})
