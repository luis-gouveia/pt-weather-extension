import { ServiceError } from '../ServiceError'

export class FailedToGetLocations extends ServiceError {
  constructor() {
    super('Failed to get locations.')
  }
}

export class FailedToGetWindTypes extends ServiceError {
  constructor() {
    super('Failed to get wind types.')
  }
}

