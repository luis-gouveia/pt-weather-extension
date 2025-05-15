import { render, screen } from '@testing-library/react'
import ExpandedWeatherCard from './ExpandedWeatherCard'
import { DateUtils } from '../../../utils/DateUtils'

describe('ExpandedWeatherCard', () => {
  const weatherData = {
    date: new Date(),
    weatherType: 1,
    weatherDescription: 'Parcialmente Nublado',
    maxTemp: 20,
    minTemp: 10,
    precipitationProb: 10,
    uv: 8,
    windType: 'Fraco',
    windDirection: 'N',
    warnings: [],
  }

  test('Should render expanded weather card', () => {
    render(<ExpandedWeatherCard {...weatherData} />)

    const date = DateUtils.formatDate(weatherData.date, 'EXPANDED')
    expect(screen.getByText(date)).toBeInTheDocument()
    expect(screen.getByText(weatherData.weatherDescription)).toBeInTheDocument()
    expect(screen.getByText(`${weatherData.maxTemp}º`)).toBeInTheDocument()
    expect(screen.getByText(`/${weatherData.minTemp}º`)).toBeInTheDocument()
    expect(screen.getByText(`${Math.round(weatherData.precipitationProb)}%`)).toBeInTheDocument()
    expect(screen.getByText(`${weatherData.windType} (${weatherData.windDirection})`)).toBeInTheDocument()
    expect(screen.getByText(weatherData.uv)).toBeInTheDocument()
  })
})
