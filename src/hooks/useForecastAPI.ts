import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { Location } from '../types/Location'
import { ServiceError } from '../services/ServiceError'
import { weatherForecastService } from '../services'
import { UV, WeatherForecast, WeatherTypes, WindTypes } from '../types/WeatherForecast'
import { Warning } from '../types/Warning'
import { WeatherData } from '../types/WeatherData'
import { DateUtils } from '../utils/DateUtils'
import { locationsSchema } from '../schemas/LocationsSchema'
import {
  uvSchema,
  warningsSchema,
  weatherForecastSchema,
  weatherTypesSchema,
  windTypesSchema,
} from '../schemas/WeatherForecastSchema'

interface ForecastData {
  locations: Location[]
  forecast: WeatherData[]
}

export function useForecastAPI(locationName: string) {
  // Hook status states
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<{ message?: string } | undefined>()
  const [data, setData] = useState<ForecastData>()

  // Weather Data states using localstorage
  const [locations, setLocations] = useLocalStorage<Location[] | undefined>('locations', undefined, {
    schema: locationsSchema,
    ttl: DateUtils.ONE_DAY * 7,
  })
  const [weatherTypes, setWeatherTypes] = useLocalStorage<WeatherTypes | undefined>('weatherTypes', undefined, {
    schema: weatherTypesSchema,
    ttl: DateUtils.ONE_DAY * 7,
  })
  const [windTypes, setWindTypes] = useLocalStorage<WindTypes | undefined>('windTypes', undefined, {
    schema: windTypesSchema,
    ttl: DateUtils.ONE_DAY * 7,
  })
  const [warnings, setWarnings] = useLocalStorage<Record<string, Warning[]> | undefined>('warnings', undefined, {
    schema: warningsSchema,
    ttl: DateUtils.ONE_HOUR,
  })
  const [uv, setUv] = useLocalStorage<Record<string, UV> | undefined>('uv', undefined, {
    schema: uvSchema,
    ttl: DateUtils.ONE_HOUR,
  })
  const [forecast, setForecast] = useLocalStorage<WeatherForecast[] | undefined>('forecast', undefined, {
    schema: weatherForecastSchema,
    ttl: DateUtils.ONE_HOUR,
  })

  // Refs to access current values without re-triggering callbacks
  const locationsRef = useRef(locations)
  const weatherTypesRef = useRef(weatherTypes)
  const windTypesRef = useRef(windTypes)
  const warningsRef = useRef(warnings)
  const uvRef = useRef(uv)
  const forecastRef = useRef(forecast)

  // Keep refs up to date
  useEffect(() => {
    locationsRef.current = locations
  }, [locations])
  useEffect(() => {
    weatherTypesRef.current = weatherTypes
  }, [weatherTypes])
  useEffect(() => {
    windTypesRef.current = windTypes
  }, [windTypes])
  useEffect(() => {
    warningsRef.current = warnings
  }, [warnings])
  useEffect(() => {
    uvRef.current = uv
  }, [uv])
  useEffect(() => {
    forecastRef.current = forecast
  }, [forecast])

  // Loads data from local storage if available, otherwise fetches it from the service.
  const loadFromStorageOrFetch = useCallback(
    async <T>(
      entity: T,
      fetch: () => Promise<T>,
      set: React.Dispatch<React.SetStateAction<T>>,
      useStorage: boolean,
    ): Promise<NonNullable<T>> => {
      if (useStorage) {
        if (entity) return entity
      }
      const fetchedData = await fetch()
      set(fetchedData)
      return fetchedData as NonNullable<T>
    },
    [],
  )

  // Fetch all the data needed to get the weather forecast
  const fetchData = useCallback(
    async (refetch: boolean) => {
      setIsLoading(true)
      setData(undefined)
      setError(undefined)

      try {
        const fetchedLocations = await loadFromStorageOrFetch(
          locationsRef.current,
          () => weatherForecastService.getLocations(),
          setLocations,
          true,
        )
        const location = fetchedLocations.find((l) => l.name === locationName)
        if (!location) throw new Error('Location not found!')

        const fetchedWeaterTypes = await loadFromStorageOrFetch(
          weatherTypesRef.current,
          () => weatherForecastService.getWeatherTypes(),
          setWeatherTypes,
          true,
        )
        const fetchedWindTypes = await loadFromStorageOrFetch(
          windTypesRef.current,
          () => weatherForecastService.getWindTypes(),
          setWindTypes,
          true,
        )
        const fetchedWarnings = await loadFromStorageOrFetch(
          warningsRef.current,
          () => weatherForecastService.getWarnings(location.warningAreaId),
          setWarnings,
          !refetch,
        )
        const fetchedUv = await loadFromStorageOrFetch(
          uvRef.current,
          () => weatherForecastService.getUV(location.id),
          setUv,
          !refetch,
        )
        const fetchedForecast = await loadFromStorageOrFetch(
          forecastRef.current,
          () => weatherForecastService.getForecast(location.id),
          setForecast,
          !refetch,
        )

        // Map weather forecast data
        const result: WeatherData[] = []
        for (const forecastDay of fetchedForecast) {
          result.push({
            date: forecastDay.date,
            weatherType: forecastDay.weatherType,
            weatherDescription: fetchedWeaterTypes[forecastDay.weatherType],
            maxTemp: forecastDay.maxTemp,
            minTemp: forecastDay.minTemp,
            precipitationProb: forecastDay.precipitationProb,
            uv: fetchedUv[DateUtils.toDateString(forecastDay.date)],
            windType: fetchedWindTypes[forecastDay.windType],
            windDirection: forecastDay.windDirection,
            warnings: fetchedWarnings[DateUtils.toDateString(forecastDay.date)] ?? [],
          })
        }
        setData({ locations: fetchedLocations, forecast: result })
      } catch (error) {
        let message: string | undefined
        if (error instanceof ServiceError) message = error.message
        else console.error(error)
        setError({ message })
      } finally {
        setIsLoading(false)
      }
    },
    [
      locationName,
      loadFromStorageOrFetch,
      setForecast,
      setLocations,
      setWarnings,
      setUv,
      setWeatherTypes,
      setWindTypes,
    ],
  )

  useEffect(() => {
    fetchData(false)
  }, [fetchData])

  useEffect(() => {
    fetchData(true)
  }, [locationName, fetchData])

  return [isLoading, data, error] as const
}
