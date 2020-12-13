import { readInput } from '../helpers.js'

const inputPath = new URL('./input.txt', import.meta.url)
const input = await readInput(inputPath)
const inputArray = input.split('\n')

const wait = Number(inputArray[0])
const busses = inputArray[1]
	.split(',')
	.filter((bus) => bus !== 'x')
	.map(Number)

const closestWaits = busses.map((bus) => {
	let busWait = bus
	while (busWait < wait) {
		busWait += bus
	}
	return busWait
})
const bestBusClosestWait = Math.min(...closestWaits)
const bestBusIndex = closestWaits.indexOf(bestBusClosestWait)
const bestBusID = busses[bestBusIndex]
const bestBusActualWait = bestBusClosestWait - wait

console.log(bestBusID * bestBusActualWait)
