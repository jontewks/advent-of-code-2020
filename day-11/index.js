import { readInput } from '../helpers.js'

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

let changesThisRun
let currentSeating = [...inputArray]
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

console.log(
  currentSeating
    .join('')
    .split('')
    .filter((x) => x === '#').length
)
