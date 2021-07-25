import { hash, compare } from 'bcrypt'

import { HashProtocol } from '../protocols/hash-protocol'

class BCryptProvider implements HashProtocol {
  public async generateHash (payload: string): Promise<string> {
    const hashed = await hash(payload, 10)

    return hashed
  }

  public async compareHash (payload: string, hashed: string): Promise<boolean> {
    const match = await compare(payload, hashed)

    return match
  }
}

export { BCryptProvider }
