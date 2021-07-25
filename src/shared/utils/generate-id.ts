import { v4 as uuid } from 'uuid'

const generateId = (): string => {
  return uuid()
}

export { generateId }
