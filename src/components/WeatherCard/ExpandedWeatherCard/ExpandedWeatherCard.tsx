import { Col, Container, Row } from 'react-bootstrap'
import { WeatherCardProps } from '../WeatherCard'
import { DateUtils } from '../../../utils/DateUtils'
import RainIcon from '../../../assets/uiIcons/rain_drop.svg?react'
import UVIcon from '../../../assets/uiIcons/uv.svg?react'
import WindIcon from '../../../assets/uiIcons/wind.svg?react'
import './ExpandedWeatherCard.css'

// TODO: only temporary
import WeatherImage from '../../../assets/weatherIcons/sunny.png'

const ExpandedWeatherCard = (props: WeatherCardProps['data']) => {
  return (
    <Container className="expanded-weather-card">
      <Row>
        <Col>
          <h3>{DateUtils.formatDate(props.date, 'EXPANDED')}</h3>
        </Col>
      </Row>
      <Row className="mt-1">
        <Col>
          {/*TODO: hardcoded for now */}
          <img src={WeatherImage} className="weather-icon" />
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
            <Row className="d-flex justify-content-center detail-value">{Math.round(props.rainPercentage)}%</Row>
            <Row className="d-flex justify-content-center detail-label">Chuva</Row>
          </Container>
        </Col>
        <Col xs={4}>
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
