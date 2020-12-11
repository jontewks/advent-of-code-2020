import { readInput } from '../helpers.js'
import { findSeatingEquilibrium } from './shared.js'

const inputPath = new URL('./input.txt', import.meta.url)
const input = await readInput(inputPath)
const inputArray = input.split('\n')

const findNextSeatInDirection = ({
	rowIndex,
	columnIndex,
	vertical,
	horizontal,
	seating,
}) => {
	let currentRowIndex = rowIndex
	let currentColumnIndex = columnIndex
	while (true) {
		currentRowIndex += vertical
		currentColumnIndex += horizontal

		const row = seating[currentRowIndex] || []
		const seat = row[currentColumnIndex]
		if (seat !== '.') {
			return seat
		}
	}
}

const countVisibleOccupied = ({ rowIndex, columnIndex, seating }) => {
	const seatDirections = [
		[-1, 0], // Up
		[1, 0], // Down
		[0, -1], // Left
		[0, 1], // Right
		[-1, -1], // Up Left
		[-1, 1], // Up Right
		[1, -1], // Down Left
		[1, 1], // Down Right
	]
	const nextSeatsInEachDirection = seatDirections.map(
		([vertical, horizontal]) =>
			findNextSeatInDirection({
				rowIndex,
				columnIndex,
				vertical,
				horizontal,
				seating,
			})
	)
	return nextSeatsInEachDirection.filter((x) => x === '#').length
}

const applyRulesToSeat = ({ i, j, seating }) => {
	const currentSeat = seating[i][j]
	const visibleOccupied = countVisibleOccupied({
		rowIndex: i,
		columnIndex: j,
		seating,
	})
	if (currentSeat === 'L' && visibleOccupied === 0) {
		return '#'
	}
	if (currentSeat === '#' && visibleOccupied >= 5) {
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
