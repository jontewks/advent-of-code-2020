const forEachSeat = (seating, fn) => {
	for (let i = 0; i < seating.length; i++) {
		const row = seating[i]
		for (let j = 0; j < row.length; j++) {
			// Ignore the floor
			if (seating[i][j] === '.') {
				continue
			}
			fn({ i, j })
		}
	}
}

export const findSeatingEquilibrium = ({ seating, applyRulesToSeat }) => {
	let changesThisRun
	let currentSeating = [...seating]
	do {
		changesThisRun = false
		const updatedSeating = [...currentSeating]

		forEachSeat(currentSeating, ({ i, j }) => {
			const newSeat = applyRulesToSeat({ i, j, seating: currentSeating })
			if (newSeat) {
				changesThisRun = true
				const row = [...updatedSeating[i]]
				row[j] = newSeat
				updatedSeating[i] = row.join('')
			}
		})

		currentSeating = updatedSeating
	} while (changesThisRun)

	return currentSeating
}
