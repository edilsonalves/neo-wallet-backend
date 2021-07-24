import express, { Express } from 'express'

import { routes } from './routes'

class Server {
  constructor (private readonly app: Express, private readonly port: number) {
    this.setupServer()
    this.setupRoutes()
  }

  private setupServer (): void {
    this.app.use(express.json())
  }

  private setupRoutes (): void {
    this.app.use(routes)
  }

  public startServer (): void {
    this.app.listen(this.port, () => {
      console.log(`🚀 Server started on port ${this.port}!`)
    })
  }
}

new Server(express(), Number(process.env.PORT)).startServer()
