import 'reflect-metadata'
import express, { Express } from 'express'
import { createConnection } from 'typeorm'

import { routes } from './routes'

class Server {
  constructor (
    private readonly app: Express, private readonly port: number
  ) {}

  public async start (): Promise<void> {
    await this.setupDatabase()
    this.setupServer()
    this.setupRoutes()
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
