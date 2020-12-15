import { readInput } from '../helpers.js'

const inputPath = new URL('./input.txt', import.meta.url)
const input = await readInput(inputPath)
const inputArray = input.split(',').map(Number)

const TARGET_NUM = 2020
const spokenNumbers = [...inputArray]

for (let i = spokenNumbers.length; i < TARGET_NUM; i++) {
	const lastNum = spokenNumbers.pop()
	const lastIndexOfLastNum = spokenNumbers.lastIndexOf(lastNum)
	if (lastIndexOfLastNum === -1) {
		spokenNumbers.push(lastNum)
		spokenNumbers.push(0)
	} else {
		const diff = spokenNumbers.length - lastIndexOfLastNum
		spokenNumbers.push(lastNum)
		spokenNumbers.push(diff)
	}
}

console.log(spokenNumbers.pop())
