import { ServiceError } from '../ServiceError'

export class FailedToGetLocations extends ServiceError {
  constructor() {
    super('Failed to get locations.')
  }
}
