import { JSX } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { WeatherCardProps } from '../WeatherCard'
import { DateUtils } from '../../../utils/DateUtils'
import { mapWeatherTypetoImage } from '../../../libs/weatherImageMapper'
import RainIcon from '../../../assets/ui/rain_drop.svg?react'
import UVIcon from '../../../assets/ui/uv.svg?react'
import WindIcon from '../../../assets/ui/wind.svg?react'
import WarningIcon from '../../../assets/ui/warning.svg?react'
import './ExpandedWeatherCard.css'

/**
 * Expanded weather card that displays detailed weather information in an expanded layout.
 *
 * @component
 * @param {WeatherCardProps['data']} props The weather data for the card.
 *
 * @returns {JSX.Element} The rendered expanded weather card.
 */
const ExpandedWeatherCard = (props: WeatherCardProps['data']): JSX.Element => {
  return (
    <Container className="expanded-weather-card">
      <Row>
        <Col className="d-flex align-items-center justify-content-center text-center">
          {props.warnings.length > 0 && <WarningIcon className="warning-icon" />}
          <h3 className="m-0">{DateUtils.formatDate(props.date, 'EXPANDED')}</h3>
        </Col>
      </Row>
      <Row className="mt-1">
        <Col>
          <img src={mapWeatherTypetoImage(props.weatherType)} className="weather-icon" />
        </Col>
      </Row>
      <Row>
        <Col className="description text-center">{props.weatherDescription}</Col>
      </Row>
      <Row>
        <Col>
          <span className="temp-max">{Math.round(props.maxTemp)}º</span>
          <span className="temp-min">/{Math.round(props.minTemp)}º</span>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center mt-2">
        <Col xs={3}>
          <Container>
            <Row className="d-flex justify-content-center">
              <Col>
                <RainIcon className="detail-icon rain-drop" />
              </Col>
            </Row>
            <Row className="d-flex justify-content-center detail-value">{Math.round(props.precipitationProb)}%</Row>
            <Row className="d-flex justify-content-center detail-label">Chuva</Row>
          </Container>
        </Col>
        <Col xs={5}>
          <Container>
            <Row className="d-flex justify-content-center">
              <Col>
                <WindIcon className="detail-icon" />
              </Col>
            </Row>
            <Row className="d-flex justify-content-center detail-value">
              {props.windType} ({props.windDirection})
            </Row>
            <Row className="d-flex justify-content-center detail-label">Vento</Row>
          </Container>
        </Col>
        <Col xs={3}>
          <Container>
            <Row className="d-flex justify-content-center">
              <Col>
                <UVIcon className="detail-icon" />
              </Col>
            </Row>
            <Row className="d-flex justify-content-center detail-value">{props.uv ? Math.round(props.uv) : 'N/A'}</Row>
            <Row className="d-flex justify-content-center detail-label">UV</Row>
          </Container>
        </Col>
      </Row>
    </Container>
  )
}

export default ExpandedWeatherCard
