import axios, { AxiosInstance } from 'axios'
import { Location } from '../../types/Location'
import { Warning } from '../../types/Warning'
import { UV, WeatherForecast, WeatherTypes, WindTypes } from '../../types/WeatherForecast'
import { DateUtils } from '../../utils/DateUtils'
import {
  FailedToGetLocations,
  FailedToGetUV,
  FailedToGetWeatherForecast,
  FailedToGetWeatherTypes,
  FailedToGetWindTypes,
} from './IPMAWeatherServiceErrors'

export class IPMAWeatherService {
  private readonly axios: AxiosInstance

  constructor() {
    this.axios = axios.create({
      baseURL: 'https://api.ipma.pt/open-data',
    })
  }

  /**
   * Fetches the list of available locations.
   *
   * @returns {Promise<Location[]>} An array of `Location` objects.
   */
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
      return locations.sort((a, b) => a.name.localeCompare(b.name, 'pt', { sensitivity: 'base' }))
    } catch (error) {
      console.error(error)
      throw new FailedToGetLocations()
    }
  }

  /**
   * Fetches the types of wind types used in the forecasts.
   *
   * @returns {Promise<WindTypes>} `Record` of wind type definitions.
   */
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

  /**
   * Fetches the available weather types used in forecasts.
   *
   * @returns {Promise<WeatherTypes>} `Record` of weather type definitions.
   */
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

  /**
   * Fetches the weather warnings for a given location.
   *
   * @param {string} warningAreaId Area warning ID of the location.
   * @returns {Promise<Record<string, Warning[]>>} `Record` mapping date strings to arrays of `Warning` objects.
   */
  public async getWarnings(warningAreaId: string): Promise<Record<string, Warning[]>> {
    try {
      const response = await this.axios.get('forecast/warnings/warnings_www.json')
      const relevantWarnings = response.data.filter(
        (w: any) => w.awarenessLevelID !== 'green' && w.idAreaAviso === warningAreaId,
      )

      const warnings = {} as Record<string, Warning[]>
      for (const warning of relevantWarnings) {
        const warningData = {
          type: (<string>warning.awarenessLevelID).toUpperCase() as Warning['type'],
          name: warning.awarenessTypeName,
          description: warning.text,
          start: new Date(warning.startTime),
          end: new Date(warning.endTime),
        }

        const warningDate = DateUtils.toDateString(warningData.start)
        if (warnings[warningDate]) warnings[warningDate].push(warningData)
        else warnings[warningDate] = [warningData]
      }
      return warnings
    } catch (error) {
      console.error(error)
      return {}
    }
  }

  /**
   * Fetches the UV index forecast for a specific location.
   *
   * @param {number} locationId Identifier of the location.
   * @returns {Promise<Record<string, UV>>} `Record` mapping date strings to UV index values.
   */
  public async getUV(locationId: number): Promise<Record<string, UV>> {
    try {
      const response = await this.axios.get('forecast/meteorology/uv/uv.json')
      const relevantData = response.data.filter((d: any) => d.globalIdLocal === locationId)

      const result = {} as Record<string, UV>
      for (const uvDay of relevantData) {
        result[DateUtils.toDateString(new Date(uvDay.data))] = Number(uvDay.iUv)
      }
      return result
    } catch (error) {
      console.error(error)
      throw new FailedToGetUV()
    }
  }

  /**
   * Fetches the five day weather forecast data for a given location.
   *
   * @param {number} locationId Identifier of the location.
   * @returns {Promise<WeatherForecast[]>} An array of `WeatherForecast` objects.
   */
  public async getForecast(locationId: number): Promise<WeatherForecast[]> {
    try {
      const response = await this.axios.get(`forecast/meteorology/cities/daily/${locationId}.json`)

      const forecast: WeatherForecast[] = []
      for (const dayForecast of response.data.data) {
        forecast.push({
          date: new Date(dayForecast.forecastDate),
          weatherType: dayForecast.idWeatherType,
          minTemp: Number(dayForecast.tMin),
          maxTemp: Number(dayForecast.tMax),
          precipitationProb: Number(dayForecast.precipitaProb),
          windDirection: dayForecast.predWindDir,
          windType: dayForecast.classWindSpeed,
        })
      }
      return forecast
    } catch (error) {
      console.error(error)
      throw new FailedToGetWeatherForecast()
    }
  }
}
