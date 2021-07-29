import { generateId } from '@/shared/utils'

const fakeAccountGenerator = (): string => {
  const fakeKey = generateId().slice(0, 13)

  return fakeKey
}

export { fakeAccountGenerator }
