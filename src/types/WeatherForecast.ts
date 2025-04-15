export type WindTypes = Record<number, string>

export type WeatherTypes = Record<number, string>

export type UV = number

export interface WeatherForecast {
  date: Date
  weatherType: keyof WeatherTypes
  precipitationProb: number
  minTemp: number
  maxTemp: number
  windType: keyof WindTypes
  windDirection: string
}
