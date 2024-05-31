export class InvalidCredentialsError extends Error {
  constructor() {
    super('Invalid credentials.')
  }
}

export class UserAlreadyExistsError extends Error {
  constructor() {
    super('User already exists.')
  }
}
