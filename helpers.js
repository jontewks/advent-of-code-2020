import { promisify } from 'util'
import { readFile } from 'fs'

const readFilePromise = promisify(readFile)

export const readInput = (path) => readFilePromise(path, 'utf8')
