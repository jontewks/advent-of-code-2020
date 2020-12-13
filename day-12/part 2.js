import { readInput } from '../helpers.js'

const inputPath = new URL('./input.txt', import.meta.url)
const input = await readInput(inputPath)
const inputArray = input.split('\n')

// First is North / South, second is East, West
const waypoint = [1, 10]
const shipPosition = [0, 0]

const moveWaypoint = ({ direction, amount }) => {
	if (direction === 'N') {
		waypoint[0] += amount
	} else if (direction === 'S') {
		waypoint[0] -= amount
	} else if (direction === 'E') {
		waypoint[1] += amount
	} else if (direction === 'W') {
		waypoint[1] -= amount
	}
}

const rotateWaypoint = ({ direction, amount }) => {
	let steps = amount / 90

	while (steps--) {
		waypoint.reverse()
		if (direction === 'R') {
			waypoint[0] = -waypoint[0]
		} else if (direction === 'L') {
			waypoint[1] = -waypoint[1]
		}
	}
}

const moveShipToWaypoint = ({ amount }) => {
	const northSouthChange = waypoint[0] * amount
	const eastWestChange = waypoint[1] * amount
	shipPosition[0] = shipPosition[0] + northSouthChange
	shipPosition[1] = shipPosition[1] + eastWestChange
}

inputArray.forEach((movement) => {
	const direction = movement[0]
	const amount = Number(movement.slice(1))
	if (direction === 'R' || direction === 'L') {
		rotateWaypoint({ direction, amount })
	} else if (direction === 'F') {
		moveShipToWaypoint({ amount })
	} else {
		moveWaypoint({ direction, amount })
	}
})

console.log('Waypoint:', waypoint)
console.log('Ship Position:', shipPosition)
console.log(shipPosition.map(Math.abs).reduce((a, b) => a + b))
