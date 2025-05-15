import { fireEvent, render, screen } from '@testing-library/react'
import WeatherDayModal from './WeatherDayModal'
import { WeatherData } from '../../types/WeatherData'
import { DateUtils } from '../../utils/DateUtils'

describe('WeatherDayModal', () => {
  const location = 'Lisboa'
  const weatherData: WeatherData = {
    date: new Date(),
    weatherType: 1,
    weatherDescription: 'Parcialmente Nublado',
    maxTemp: 20,
    minTemp: 10,
    precipitationProb: 10,
    uv: 8,
    windType: 'Fraco',
    windDirection: 'N',
    warnings: [
      {
        type: 'YELLOW',
        name: 'Warning Name',
        description: 'Warning Description',
        start: new Date('2025-04-23T13:00:00.000Z'),
        end: new Date('2025-04-23T15:00:00.000Z'),
      },
    ],
  }
  const onClose = vi.fn()

  test('Should render the weather day modal', () => {
    render(<WeatherDayModal location={location} weatherData={weatherData} onClose={onClose} />)

    expect(screen.getByText(location)).toBeInTheDocument()
    const date = DateUtils.formatDate(weatherData.date, 'EXPANDED')
    expect(screen.getByText(date)).toBeInTheDocument()
    expect(screen.getByText(weatherData.weatherDescription)).toBeInTheDocument()
    expect(screen.getByText(`${weatherData.maxTemp}º`)).toBeInTheDocument()
    expect(screen.getByText(`/${weatherData.minTemp}º`)).toBeInTheDocument()
    expect(screen.getByText(`${Math.round(weatherData.precipitationProb)}%`)).toBeInTheDocument()
    expect(screen.getByText(`${weatherData.windType} (${weatherData.windDirection})`)).toBeInTheDocument()
    expect(screen.getByText(weatherData.warnings[0].name)).toBeInTheDocument()
    expect(screen.getByText(weatherData.warnings[0].description)).toBeInTheDocument()
    expect(screen.getByText(DateUtils.formatTime(weatherData.warnings[0].start))).toBeInTheDocument()
    expect(screen.getByText(DateUtils.formatTime(weatherData.warnings[0].end))).toBeInTheDocument()
  })

  test('Should trigger modal close function', () => {
    render(<WeatherDayModal location={location} weatherData={weatherData} onClose={onClose} />)

    const closeBtn = screen.getByRole('button')
    fireEvent.click(closeBtn)
    expect(onClose).toHaveBeenCalled()
  })
})
