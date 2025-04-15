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

export class FailedToGetWeatherTypes extends ServiceError {
  constructor() {
    super('Failed to get weather types.')
  }
}
