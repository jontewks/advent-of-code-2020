import { readInput } from '../helpers.js'

const inputPath = new URL('./input.txt', import.meta.url)
const input = await readInput(inputPath)
const inputArray = input.split('\n')

let mask
const mem = {}

const getFloatingMemoryIndex = (value) => {
	const binary = value.toString(2).split('')
	const lengthDiff = mask.length - binary.length
	return mask
		.split('')
		.map((digit, i) => {
			if (i >= lengthDiff) {
				return digit === '0' ? binary[i - lengthDiff] : digit
			}
			return digit
		})
		.join('')
}

const getAllMemoryIndexes = (floatingMemoryIndex) => {
	const split = floatingMemoryIndex.split('')
	const floatingIndex = split.indexOf('X')
	if (floatingIndex === -1) {
		return [floatingMemoryIndex]
	}

	const replaced = [0, 1].map((modifiedIndex) =>
		[
			...floatingMemoryIndex.slice(0, floatingIndex),
			modifiedIndex,
			...floatingMemoryIndex.slice(floatingIndex + 1),
		].join('')
	)

	return getAllMemoryIndexes(replaced[0]).concat(
		getAllMemoryIndexes(replaced[1])
	)
}

inputArray.forEach((input) => {
	const [key, value] = input.split(' = ')
	if (key === 'mask') {
		mask = value
	} else {
		const startingMemoryIndex = key.match(/\d+/)[0]
		const floatingMemoryIndex = getFloatingMemoryIndex(
			Number(startingMemoryIndex)
		)
		const allIndexes = getAllMemoryIndexes(floatingMemoryIndex)
		allIndexes.forEach((index) => {
			mem[index] = value
		})
	}
})

console.log(
	Object.values(mem)
		.map((x) => parseInt(x, 10))
		.reduce((a, b) => a + b)
)
