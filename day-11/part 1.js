import { readInput } from '../helpers.js'
import { findSeatingEquilibrium } from './shared.js'

const inputPath = new URL('./input.txt', import.meta.url)
const input = await readInput(inputPath)
const inputArray = input.split('\n')

const countAdjacentOccupied = ({ rowIndex, columnIndex, seating }) => {
	let adjacentOccupied = 0

	for (let i = rowIndex - 1; i < rowIndex + 2; i++) {
		const row = seating[i]
		if (!row) {
			continue
		}

		for (let j = columnIndex - 1; j < columnIndex + 2; j++) {
			const seat = row[j]
			if (!seat) {
				continue
			}

			// Don't include the current seat in the adjacent count
			if (i === rowIndex && j === columnIndex) {
				continue
			}

			if (seat === '#') {
				adjacentOccupied++
			}
		}
	}

	return adjacentOccupied
}

const applyRulesToSeat = ({ i, j, seating }) => {
	const currentSeat = seating[i][j]
	const adjacentOccupied = countAdjacentOccupied({
		rowIndex: i,
		columnIndex: j,
		seating,
	})
	if (currentSeat === 'L' && adjacentOccupied === 0) {
		return '#'
	}
	if (currentSeat === '#' && adjacentOccupied >= 4) {
		return 'L'
	}
}

const equilibriumSeating = findSeatingEquilibrium({
	seating: inputArray,
	applyRulesToSeat,
})

console.log(
	equilibriumSeating
		.join('')
		.split('')
		.filter((x) => x === '#').length
)
