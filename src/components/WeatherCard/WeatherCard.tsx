import { WeatherData } from '../../types/WeatherData'
import CompactWeatherCard from './CompactWeatherCard/CompactWeatherCard'
import ExpandedWeatherCard from './ExpandedWeatherCard/ExpandedWeatherCard'

export interface WeatherCardProps {
  type: 'EXPANDED' | 'COMPACT'
  data: WeatherData
}

const WeatherCard = (props: WeatherCardProps) => {
  return props.type === 'EXPANDED' ? <ExpandedWeatherCard {...props.data} /> : <CompactWeatherCard {...props.data} />
}

export default WeatherCard
