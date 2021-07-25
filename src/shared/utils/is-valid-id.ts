import { validate } from 'uuid'

const isValidId = (id: string): boolean => {
  return validate(id)
}

export { isValidId }
