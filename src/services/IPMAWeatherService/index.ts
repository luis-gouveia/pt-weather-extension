import axios, { AxiosInstance } from 'axios'
import { Location } from '../../types/Location'
import { FailedToGetLocations } from './IPMAWeatherServiceErrors'

export class IPMAWeatherService {
  private readonly axios: AxiosInstance

  constructor() {
    this.axios = axios.create({
      baseURL: 'https://api.ipma.pt/open-data',
    })
  }

  public async getLocations(): Promise<Location[]> {
    try {
      const response = await this.axios.get('distrits-islands.json')
      const locations: Location[] = []
      for (const location of response.data.data) {
        locations.push({
          id: location.globalIdLocal,
          name: location.local,
          warningAreaId: location.idAreaAviso,
        })
      }
      return locations
    } catch (error) {
      console.log(error)
      throw new FailedToGetLocations()
    }
  }
}
