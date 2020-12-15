import { readInput } from '../helpers.js'

const inputPath = new URL('./input.txt', import.meta.url)
const input = await readInput(inputPath)
const inputArray = input.split(',').map(Number)

const TARGET_NUM = 30000000
const spokenNumbers = {}
inputArray.forEach((num, i) => (spokenNumbers[num] = i + 1))

const lastSpoken = {
	number: inputArray[inputArray.length - 1],
	turn: inputArray.length,
}
const nextLastSpoken = {
	number: null,
	turn: null,
}

for (let i = inputArray.length + 1; i <= TARGET_NUM; i++) {
	const spokenNumbersLastNumTurn = spokenNumbers[lastSpoken.number]

	if (!spokenNumbersLastNumTurn) {
		nextLastSpoken.number = 0
		nextLastSpoken.turn = i
	} else {
		nextLastSpoken.number = lastSpoken.turn - spokenNumbersLastNumTurn
		nextLastSpoken.turn = i
	}

	spokenNumbers[lastSpoken.number] = lastSpoken.turn
	lastSpoken.number = nextLastSpoken.number
	lastSpoken.turn = nextLastSpoken.turn
}

console.log(lastSpoken.number)
