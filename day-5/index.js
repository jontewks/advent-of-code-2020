import { readInput } from '../helpers.js'

const inputPath = new URL('./input.txt', import.meta.url)
const input = await readInput(inputPath)
const inputArray = input.split('\n')

const sequentialArrayOfLength = (length) =>
  new Array(length).fill(null).map((_, i) => i)

const splitInHalf = (array) => {
  const midPoint = array.length / 2
  return [array.slice(0, midPoint), array.slice(midPoint)]
}

const seatIDs = []
inputArray.forEach((input) => {
  let rows = sequentialArrayOfLength(128)
  let columns = sequentialArrayOfLength(8)
  const rowCode = input.slice(0, 7).split('')
  const columnCode = input.slice(7).split('')

  rowCode.forEach((code) => {
    const splitRows = splitInHalf(rows)
    if (code === 'F') {
      rows = splitRows[0]
    } else {
      rows = splitRows[1]
    }
  })
  columnCode.forEach((code) => {
    const splitColumns = splitInHalf(columns)
    if (code === 'L') {
      columns = splitColumns[0]
    } else {
      columns = splitColumns[1]
    }
  })

  seatIDs.push(rows[0] * 8 + columns[0])
})

seatIDs
  .sort((a, b) => a - b)
  .forEach((id, i) => {
    if (seatIDs[i + 1] === id + 2) {
      console.log(id + 1)
    }
  })
