import { Col, Container, Row } from 'react-bootstrap'
import RainIcon from '../../assets/uiIcons/rain_drop.svg?react'
import UVIcon from '../../assets/uiIcons/uv.svg?react'
import WindIcon from '../../assets/uiIcons/wind.svg?react'
import './WeatherCard.css'

// TODO: only temporary
import WeatherImage from '../../assets/weatherIcons/sunny.png'

const WeatherCard = () => {
  return (
    <Container className="weather-card">
      <Row>
        <Col>
          <h3>Hoje</h3>
        </Col>
      </Row>
      <Row className="mt-1">
        <Col>
          <img src={WeatherImage} className="weather-icon" />
        </Col>
      </Row>
      <Row>
        <Col className="description text-center">
          {/*TODO: hardcoded for now */}
          Parcialmente Nublado
        </Col>
      </Row>
      <Row>
        <Col>
          {/*TODO: hardcoded for now */}
          <span className="temp-max">20º</span>
          <span className="temp-min">/10º</span>
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
            <Row className="d-flex justify-content-center detail-value">50%</Row>
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
            <Row className="d-flex justify-content-center detail-value">Fraco (SW)</Row>
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
            <Row className="d-flex justify-content-center detail-value">10</Row>
            <Row className="d-flex justify-content-center detail-label">UV</Row>
          </Container>
        </Col>
      </Row>
    </Container>
  )
}

export default WeatherCard
