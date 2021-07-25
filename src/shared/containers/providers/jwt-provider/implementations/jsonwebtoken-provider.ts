import { sign, verify } from 'jsonwebtoken'

import { AppError } from '@/shared/errors/app-error'
import { jwtConfig } from '@/configs/jwt-config'
import { JwtProtocol } from '../protocols/jwt-protocol'

interface JwtPayload {
  sub: string
}

class JsonWebTokenProvider implements JwtProtocol {
  constructor (private readonly secret = jwtConfig.secret, private readonly expiresIn = jwtConfig.expiresIn) {}

  public generateToken (payload: string): string {
    if (this.secret === undefined || this.expiresIn === undefined) {
      throw new AppError('Internal Server Error', 500)
    }

    const token = sign({}, this.secret, {
      subject: payload,
      expiresIn: this.expiresIn
    })

    return token
  }

  public verifyToken (token: string): string {
    if (this.secret === undefined || this.expiresIn === undefined) {
      throw new AppError('Internal Server Error', 500)
    }

    const { sub: decoded } = verify(token, this.secret) as JwtPayload

    return decoded
  }
}

export { JsonWebTokenProvider }
