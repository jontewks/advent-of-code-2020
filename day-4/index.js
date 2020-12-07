import { readInput } from '../helpers.js'

const inputPath = new URL('./input.txt', import.meta.url)
const input = await readInput(inputPath)
const inputArray = input.split('\n\n')
const cleanedInput = inputArray.map((input) => input.replace(/\n/g, ' '))

const numberValidator = ({ min, max }) => (number) => {
  if (!min || !max || !number) {
    return false
  }

  return number >= min && number <= max
}
const isBirthYearValid = numberValidator({ min: 1920, max: 2002 })
const isIssueYearValid = numberValidator({ min: 2010, max: 2020 })
const isExpirationYearValid = numberValidator({ min: 2020, max: 2030 })
const heightInValidator = numberValidator({ min: 59, max: 76 })
const heightCmValidator = numberValidator({ min: 150, max: 193 })
const isHeightValid = (hgt) => {
  if (!hgt) {
    return false
  }

  const inIn = hgt.includes('in')
  const inCm = hgt.includes('cm')
  const numberMatches = hgt.match(/[0-9]+/)
  if (!(inIn || inCm) || !numberMatches) {
    return false
  }

  const number = numberMatches[0]
  if (inIn) {
    return heightInValidator(number)
  }
  return heightCmValidator(number)
}
const isHairColorValid = (hcl) => {
  const regex = /\#[a-f0-9]{6}/
  return regex.test(hcl)
}
const isEyeColorValid = (ecl) =>
  ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(ecl)
const isPassportIDValid = (pid) => {
  const regex = /^[0-9]{9}$/
  return regex.test(pid)
}

let valid = 0
cleanedInput.forEach((input) => {
  const splitInput = input.split(' ')
  const passportObject = splitInput.reduce((obj, next) => {
    const [key, value] = next.split(':')
    obj[key] = value
    return obj
  }, {})

  const birthYearValid = isBirthYearValid(passportObject.byr)
  const issueYearValid = isIssueYearValid(passportObject.iyr)
  const expirationYearValid = isExpirationYearValid(passportObject.eyr)
  const heightValid = isHeightValid(passportObject.hgt)
  const hairColorValid = isHairColorValid(passportObject.hcl)
  const eyeColorValid = isEyeColorValid(passportObject.ecl)
  const passportIDValid = isPassportIDValid(passportObject.pid)

  if (
    birthYearValid &&
    issueYearValid &&
    expirationYearValid &&
    heightValid &&
    hairColorValid &&
    eyeColorValid &&
    passportIDValid
  ) {
    valid++
  }
})

console.log(valid)
