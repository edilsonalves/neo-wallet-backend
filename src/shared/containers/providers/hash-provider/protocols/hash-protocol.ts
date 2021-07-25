interface HashProtocol {
  generateHash: (payload: string) => Promise<string>
  compareHash: (payload: string, hashed: string) => Promise<boolean>
}

export { HashProtocol }
