import { render, screen } from '@testing-library/react'
import CompactWeatherCard from './CompactWeatherCard'
import { DateUtils } from '../../../utils/DateUtils'

describe('CompactWeatherCard', () => {
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

  test('Should render compact weather card', () => {
    render(<CompactWeatherCard {...weatherData} />)

    const date = DateUtils.formatDate(weatherData.date, 'COMPACT')
    expect(screen.getByText(date)).toBeInTheDocument()
    expect(screen.getByText(`${weatherData.maxTemp}º`)).toBeInTheDocument()
    expect(screen.getByText(`/${weatherData.minTemp}º`)).toBeInTheDocument()
  })
})
