import { JSX } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { WeatherCardProps } from '../WeatherCard'
import { DateUtils } from '../../../utils/DateUtils'
import WarningIcon from '../../../assets/ui/warning.svg?react'
import { mapWeatherTypetoImage } from '../../../libs/weatherImageMapper'
import './CompactWeatherCard.css'

/**
 * Compact weather card that displays summarized weather information like date, image and temperature.
 *
 * @component
 * @param {WeatherCardProps['data']} props The weather data for the card.
 *
 * @returns {JSX.Element} The rendered compact weather card.
 */
const CompactWeatherCard = (props: WeatherCardProps['data']): JSX.Element => {
  return (
    <Container className="compact-weather-card text-center">
      <Row>
        <Col className="date d-flex align-items-center justify-content-center text-center">
          {props.warnings.length > 0 && <WarningIcon className="warning-icon" />}
          {DateUtils.formatDate(props.date, 'COMPACT')}
        </Col>
      </Row>
      <Row className="mt-1">
        <Col>
          <img src={mapWeatherTypetoImage(props.weatherType)} className="weather-icon" />
        </Col>
      </Row>
      <Row>
        <Col>
          <span className="temp-max">{Math.round(props.maxTemp)}º</span>
          <span className="temp-min">/{Math.round(props.minTemp)}º</span>
        </Col>
      </Row>
    </Container>
  )
}

export default CompactWeatherCard
