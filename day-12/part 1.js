import { readInput } from '../helpers.js'

const inputPath = new URL('./input.txt', import.meta.url)
const input = await readInput(inputPath)
const inputArray = input.split('\n')

// First is North / South, second is East, West
const coords = [0, 0]
const directions = ['N', 'E', 'S', 'W']
let facingDirectionIndex = 1

const moveShip = ({ direction, amount }) => {
	if (direction === 'N') {
		coords[0] += amount
	} else if (direction === 'S') {
		coords[0] -= amount
	} else if (direction === 'E') {
		coords[1] += amount
	} else if (direction === 'W') {
		coords[1] -= amount
	}
}

const rotateShip = ({ direction, amount }) => {
	const steps = amount / 90
	const change = direction === 'R' ? steps : -steps
	const indexWithChange = facingDirectionIndex + change
	const remainder = indexWithChange % directions.length
	facingDirectionIndex =
		remainder >= 0 ? remainder : directions.length + remainder
}

inputArray.forEach((movement) => {
	const direction = movement[0]
	const amount = Number(movement.slice(1))
	if (direction === 'R' || direction === 'L') {
		rotateShip({ direction, amount })
	} else if (direction === 'F') {
		moveShip({ direction: directions[facingDirectionIndex], amount })
	} else {
		moveShip({ direction, amount })
	}
})

console.log(coords)
console.log(coords.map(Math.abs).reduce((a, b) => a + b))
