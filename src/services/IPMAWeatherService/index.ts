import axios, { AxiosInstance } from 'axios'
import { Location } from '../../types/Location'
import { WeatherTypes, WindTypes } from '../../types/WeatherForecast'
import { FailedToGetLocations, FailedToGetWeatherTypes, FailedToGetWindTypes } from './IPMAWeatherServiceErrors'

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
      console.error(error)
      throw new FailedToGetLocations()
    }
  }

  public async getWindTypes(): Promise<WindTypes> {
    try {
      const response = await this.axios.get('wind-speed-daily-classe.json')
      const windTypes = {} as WindTypes
      for (const windType of response.data.data) {
        windTypes[windType.classWindSpeed] = windType.descClassWindSpeedDailyPT
      }
      return windTypes
    } catch (error) {
      console.error(error)
      throw new FailedToGetWindTypes()
    }
  }

  public async getWeatherTypes(): Promise<WeatherTypes> {
    try {
      const response = await this.axios.get('weather-type-classe.json')
      const weatherTypes = {} as WeatherTypes
      for (const weatherType of response.data.data) {
        weatherTypes[weatherType.idWeatherType] = weatherType.descWeatherTypePT
      }
      return weatherTypes
    } catch (error) {
      console.error(error)
      throw new FailedToGetWeatherTypes()
    }
  }
}
