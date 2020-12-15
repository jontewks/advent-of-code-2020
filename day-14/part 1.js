import { readInput } from '../helpers.js'

const inputPath = new URL('./input.txt', import.meta.url)
const input = await readInput(inputPath)
const inputArray = input.split('\n')

let mask
const mem = []

const setValue = (value) => {
	const binary = value.toString(2).split('')
	const lengthDiff = mask.length - binary.length
	return mask
		.split('')
		.map((digit, i) => {
			if (i >= lengthDiff) {
				return digit === 'X' ? binary[i - lengthDiff] : digit
			}
			return digit === 'X' ? 0 : digit
		})
		.join('')
}

inputArray.forEach((input) => {
	const [key, value] = input.split(' = ')
	if (key === 'mask') {
		mask = value
	} else {
		const memoryIndex = key.match(/\d+/)[0]
		mem[memoryIndex] = setValue(Number(value))
	}
})

console.log(
	mem
		.filter((x) => x)
		.map((x) => parseInt(x, 2))
		.reduce((a, b) => a + b)
)
