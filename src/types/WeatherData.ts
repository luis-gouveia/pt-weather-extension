import { Warning } from './Warning'

export interface WeatherData {
  date: Date
  weatherType: number
  weatherDescription: string
  maxTemp: number
  minTemp: number
  rainPercentage: number
  uv?: number
  windType: string
  windDirection: string
  warnings: Warning[]
}
