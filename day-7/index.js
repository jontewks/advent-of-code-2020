import { readInput } from '../helpers.js'

const inputPath = new URL('./input.txt', import.meta.url)
const input = await readInput(inputPath)
const inputArray = input.split('\n')

const rules = inputArray.reduce((rules, next) => {
  const [bag, contains] = next.split(' bags contain ')
  const bagRegex = /\d.+?bag/g
  const matches = contains.match(bagRegex)

  if (!matches) {
    return rules
  }

  const bagContents = []
  matches.forEach((match) => {
    const bagTypeRegex = /(\d\s)(.+)(\sbag)/
    const numberOfBags = match.match(bagTypeRegex)[1]
    const bagType = match.match(bagTypeRegex)[2]

    // Uncomment for loop for part 2 only, and comment out part 1 otherwise it takes forever
    // for (let i = 0; i < numberOfBags; i++) {
    bagContents.push(bagType)
    // }
  })
  rules[bag] = bagContents
  return rules
}, {})

const getAllBagPossibilities = (bags) => {
  return bags.reduce((allBags, next) => {
    if (rules[next]) {
      return [...allBags, next, ...getAllBagPossibilities(rules[next])]
    }
    return [...allBags, next]
  }, [])
}

// Part 1
let numberThatCanContainShinyGold = 0
Object.keys(rules).forEach((rule) => {
  const possibilities = getAllBagPossibilities(rules[rule])
  if (possibilities.includes('shiny gold')) {
    numberThatCanContainShinyGold++
  }
})
console.log('Part 1:', numberThatCanContainShinyGold)

// Part 2
const shinyGoldBagPossibilities = getAllBagPossibilities(rules['shiny gold'])
console.log('Part 2:', shinyGoldBagPossibilities.length)
