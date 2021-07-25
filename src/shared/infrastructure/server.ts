import express, { Express, Request, Response, NextFunction } from 'express'
import { createConnection } from 'typeorm'

import 'express-async-errors'
import 'reflect-metadata'
import '@/shared/containers'

import { routes } from './http/routes'
import { AppError } from '@/shared/errors/app-error'

class Server {
  constructor (
    private readonly app: Express, private readonly port: number
  ) {}

  public async start (): Promise<void> {
    await this.setupDatabase()
    this.setupServer()
    this.setupRoutes()
    this.setupErrors()
    this.setupListen()
  }

  private async setupDatabase (): Promise<void> {
    await createConnection()
  }

  private setupServer (): void {
    this.app.use(express.json())
  }

  private setupRoutes (): void {
    this.app.use(routes)
  }

  private setupErrors (): void {
    this.app.use((error: Error, request: Request, response: Response, _: NextFunction) => {
      console.log(error)

      const errorData = {
        statusCode: 500,
        message: 'Internal Server Error'
      }

      if (error instanceof AppError) {
        errorData.statusCode = error.statusCode
        errorData.message = error.message
      }

      return response.status(errorData.statusCode).json({
        status: 'error',
        message: errorData.message
      })
    })
  }

  private setupListen (): void {
    this.app.listen(this.port, () => {
      console.log(`🚀 Server started on port ${this.port}!`)
    })
  }
}

(async (): Promise<void> => {
  const server = new Server(express(), Number(process.env.PORT))
  await server.start()
})().catch(error => {
  console.log(error)
})
