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

export class ResourceNotFoundError extends Error {
  constructor() {
    super('Resource not found.')
  }
}

export class ImageAlreadyEvaluatedError extends Error {
  constructor() {
    super('Image alreadyEvaluated.')
  }
}

export class ImageDoesNotBelongToUserError extends Error {
  constructor() {
    super('The image does not belong to the user.')
  }
}
