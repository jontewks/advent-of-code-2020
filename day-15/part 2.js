import { readInput } from '../helpers.js'

const inputPath = new URL('./input.txt', import.meta.url)
const input = await readInput(inputPath)
const inputArray = input.split(',').map(Number)

const TARGET_NUM = 30000000
const spokenNumbers = {}
inputArray.forEach((num, i) => (spokenNumbers[num] = i + 1))
let lastSpoken = {
	number: inputArray[inputArray.length - 1],
	turn: inputArray.length,
}

for (let i = inputArray.length + 1; i <= TARGET_NUM; i++) {
	const spokenNumbersLastNumTurn = spokenNumbers[lastSpoken.number]
	let nextLastSpoken = {}

	if (!spokenNumbersLastNumTurn) {
		nextLastSpoken = { number: 0, turn: i }
	} else {
		const nextNumber = lastSpoken.turn - spokenNumbersLastNumTurn
		nextLastSpoken = { number: nextNumber, turn: i }
	}

	spokenNumbers[lastSpoken.number] = lastSpoken.turn
	lastSpoken = nextLastSpoken
}

console.log(lastSpoken.number)
