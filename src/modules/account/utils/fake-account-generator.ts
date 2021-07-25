import { generateId } from '@/shared/utils'

interface FakeAccount {
  agency: string
  number: string
}

const fakeAccountGenerator = (): FakeAccount => {
  const agency = '0001'
  const number = generateId().slice(0, 8)

  return { agency, number }
}

export { fakeAccountGenerator }
