import { Col, Container, Row } from 'react-bootstrap'
import './CompactWeatherCard.css'
// TODO: only temporary
import WeatherImage from '../../assets/weatherIcons/partly_sunny.png'

const CompactWeatherCard = () => {
  return (
    <Container className="compact-weather-card text-center">
      <Row>
        <Col className="date">Amanhã</Col>
      </Row>
      <Row className="mt-1">
        <Col>
          <img src={WeatherImage} className="weather-icon" />
        </Col>
      </Row>
      <Row>
        <Col>
          {/*TODO: hardcoded for now */}
          <span className="temp-max">20º</span>
          <span className="temp-min">/10º</span>
        </Col>
      </Row>
    </Container>
  )
}

export default CompactWeatherCard
