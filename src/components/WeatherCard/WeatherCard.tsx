import { JSX } from 'react'
import { WeatherData } from '../../types/WeatherData'
import CompactWeatherCard from './CompactWeatherCard/CompactWeatherCard'
import ExpandedWeatherCard from './ExpandedWeatherCard/ExpandedWeatherCard'

export interface WeatherCardProps {
  type: 'EXPANDED' | 'COMPACT'
  data: WeatherData
}

/**
 * Weather card renders a weather card in either expanded or compact format,
 * depending on the `type` prop.
 *
 * @param {Object} props Component props
 * @param {'EXPANDED' | 'COMPACT'} props.type Defines which card layout to render
 * @param {WeatherCardData} props.data Weather forecast data
 * @returns {JSX.Element} Rendered weather card component
 */
const WeatherCard = (props: WeatherCardProps): JSX.Element => {
  return props.type === 'EXPANDED' ? <ExpandedWeatherCard {...props.data} /> : <CompactWeatherCard {...props.data} />
}

export default WeatherCard
