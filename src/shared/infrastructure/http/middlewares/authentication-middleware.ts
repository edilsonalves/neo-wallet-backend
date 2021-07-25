import { Request, Response, NextFunction } from 'express'
import { container } from 'tsyringe'

import { JsonWebTokenProvider } from '@/shared/containers/providers/jwt-provider/implementations/jsonwebtoken-provider'
import { AppError } from '@/shared/errors/app-error'

function authenticationMiddleware (request: Request, _: Response, next: NextFunction): void {
  const authenticationHeader = request.headers.authorization
  const jsonWebTokenProvider = container.resolve(JsonWebTokenProvider)

  if (authenticationHeader === undefined) {
    throw new AppError('Sessão expirada, entre novamente', 401)
  }

  const [, token] = authenticationHeader.split(' ')

  try {
    const decoded = jsonWebTokenProvider.verifyToken(token)
    request.user = { id: decoded }

    return next()
  } catch {
    throw new AppError('Sessão expirada, entre novamente', 401)
  }
}

export { authenticationMiddleware }
