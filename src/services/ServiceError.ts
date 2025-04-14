export abstract class ServiceError extends Error {
  constructor(message: string) {
    super(message)
  }
}
