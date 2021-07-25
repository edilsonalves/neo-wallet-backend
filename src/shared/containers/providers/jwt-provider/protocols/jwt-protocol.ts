interface JwtProtocol {
  generateToken: (payload: string) => string
  verifyToken: (token: string) => string
}

export { JwtProtocol }
