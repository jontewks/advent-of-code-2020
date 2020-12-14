import { readInput } from '../helpers.js'

const inputPath = new URL('./input.txt', import.meta.url)
const input = await readInput(inputPath)
const inputArray = input.split('\n')

const busIDs = inputArray[1].split(',')
let sequenceFound = false
let iterator = 1
const maxBusWait = Math.max(...busIDs.filter((id) => id !== 'x'))
const maxBusWaitIndex = busIDs.indexOf(String(maxBusWait))

while (!sequenceFound) {
  const startingNumber = Number(maxBusWait) * iterator

  const sequenceStartFound = busIDs.every((id, i) => {
    if (id === 'x') {
      return true
    }
    const distanceFromMaxIndex = i - maxBusWaitIndex
    return (startingNumber + distanceFromMaxIndex) % Number(id) === 0
  })

  if (sequenceStartFound) {
    sequenceFound = true
    console.log(startingNumber - maxBusWaitIndex)
  } else {
    iterator++
  }
}
