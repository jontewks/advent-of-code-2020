import { read } from 'fs'
import { readInput } from '../helpers.js'

const inputPath = new URL('./input.txt', import.meta.url)
const input = await readInput(inputPath)
const inputArray = input.split('\n').map((x) => Number(x))

for (let i = 0; i < inputArray.length; i++) {
  for (let j = i; j < inputArray.length; j++) {
    if (inputArray[i] + inputArray[j] === 2020) {
      console.log(inputArray[i] * inputArray[j])
    }
  }
}
