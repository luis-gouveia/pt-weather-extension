import { Col, Container, Row } from 'react-bootstrap'
import { WeatherCardProps } from '../WeatherCard'
import { DateUtils } from '../../../utils/DateUtils'
import WarningIcon from '../../../assets/uiIcons/warning.svg?react'
import './CompactWeatherCard.css'

// TODO: only temporary
import WeatherImage from '../../../assets/weatherIcons/partly_sunny.png'

const CompactWeatherCard = (props: WeatherCardProps['data']) => {
  return (
    <Container className="compact-weather-card text-center">
      <Row>
        <Col className="date d-flex align-items-center justify-content-center text-center">
          {props.warnings.length && <WarningIcon className="warning-icon" />}
          {DateUtils.formatDate(props.date, 'COMPACT')}
        </Col>
      </Row>
      <Row className="mt-1">
        <Col>
          {/*TODO: hardcoded for now */}
          <img src={WeatherImage} className="weather-icon" />
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
