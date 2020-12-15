import { readInput } from '../helpers.js'

const inputPath = new URL('./input.txt', import.meta.url)
const input = await readInput(inputPath)
const inputArray = input.split('\n')

const inputs = inputArray[1]
	.split(',')
	.map((id, i) => ({ id, i }))
	.filter((eq) => eq.id !== 'x')
	.map((eq) => {
		const n = parseInt(eq.id.trim())
		return {
			n: BigInt(n),
			i: eq.i,
			a: BigInt(n - eq.i),
		}
	})

const solveMMI = (a, n) => {
	let t = 0n
	let newT = 1n
	let r = n
	let newR = a

	while (newR !== 0n) {
		const quotient = r / newR

		const tmpT = t
		t = newT
		newT = tmpT - quotient * newT

		const tmpR = r
		r = newR
		newR = tmpR - quotient * newR
	}

	if (r > 1n) {
		throw new Error('not invertible')
	}

	if (t < 0n) {
		t += n
	}

	return t
}

const solveCRT = (system) => {
	const prod = system.reduce((p, con) => p * con.n, 1n)
	return (
		system.reduce((sm, con) => {
			const p = prod / con.n
			const mmi = solveMMI(p, con.n)
			sm = sm + con.a * mmi * p

			return sm
		}, 0n) % prod
	)
}

console.log(solveCRT(inputs))
