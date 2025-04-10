import { Button, Col, Container, Modal, Row } from 'react-bootstrap'
import WeatherCard from '../WeatherCard/WeatherCard'
import DotIcon from '../../assets/uiIcons/dot.svg?react'
import LeftArrowIcon from '../../assets/uiIcons/left_arrow.svg?react'
import WarningIcon from '../../assets/uiIcons/warning.svg?react'
import './WeatherDayModal.css'
import { DateUtils } from '../../utils/DateUtils'
import { Warning } from '../../types/Warning'
import { WeatherData } from '../../types/WeatherData'

interface WeatherDayModalProps {
  show: boolean
  onClose: () => void
  location: string
  weatherData: WeatherData
}

const WarningLine = ({ warning }: { warning: Warning }) => {
  return (
    <Container className="warning-line">
      <Row>
        <Col xs={2} className="d-flex justify-content-end align-items-center">
          <DotIcon className={`warning-icon ${warning.type.toLowerCase()}-fill`} />
        </Col>
        <Col xs={7}>
          <Container className="p-0">
            <Row className="warning-title">{warning.name}</Row>
            <Row className="warning-description">{warning.description}</Row>
          </Container>
        </Col>
        <Col xs={1}>
          <Container className="p-0">
            <Row className="warning-time">{DateUtils.formatTime(warning.start)}</Row>
            <Row className="warning-time">{DateUtils.formatTime(warning.end)}</Row>
          </Container>
        </Col>
      </Row>
    </Container>
  )
}

const WeatherDayModal = ({ show, onClose, location, weatherData }: WeatherDayModalProps) => {
  return (
    <Modal show={show} onHide={onClose} dialogClassName="weather-day-modal">
      <Modal.Body className="d-flex justify-content-center text-center">
        <Container>
          <Row>
            <Col xs={2}>
              <Button className="close-btn" onClick={onClose}>
                <LeftArrowIcon className="close-icon" />
              </Button>
            </Col>
            <Col xs={8} className="d-flex align-items-center justify-content-center location-title">
              <h3>{location}</h3>
            </Col>
          </Row>
          <Row className={`mt-${weatherData.warnings.length ? 0 : 3}`}>
            <WeatherCard type="EXPANDED" data={weatherData} />
          </Row>
          {weatherData.warnings.length ? (
            <Row className="warnings-container mt-3 pt-2 d-flex justify-content-center align-items-center text-center">
              <Row className="text-center mb-2">
                <Col>
                  <WarningIcon className="warnings-title-icon" />
                  Avisos Meterológicos
                </Col>
              </Row>
              <Row className="warning-lines-container">
                {weatherData.warnings.map((warning, index) => {
                  return <WarningLine key={index} warning={warning} />
                })}
              </Row>
            </Row>
          ) : (
            <Row className="warnings-container mt-4 pt-2 d-flex justify-content-center align-items-center text-center">
              <Row className="text-center mt-2">
                <Col className="warnings-title-empty">Sem Avisos Meterológicos</Col>
              </Row>
            </Row>
          )}
        </Container>
      </Modal.Body>
    </Modal>
  )
}

export default WeatherDayModal
