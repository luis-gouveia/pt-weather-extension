import { JSX } from 'react'
import { Button, Col, Container, Modal, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import WeatherCard from '../WeatherCard/WeatherCard'
import DotIcon from '../../assets/ui/dot.svg?react'
import LeftArrowIcon from '../../assets/ui/left_arrow.svg?react'
import WarningIcon from '../../assets/ui/warning.svg?react'
import { DateUtils } from '../../utils/DateUtils'
import { Warning } from '../../types/Warning'
import { WeatherData } from '../../types/WeatherData'
import './WeatherDayModal.css'

interface WeatherDayModalProps {
  location: string
  weatherData?: WeatherData
  onClose: () => void
}

/**
 * Renders a single warning line item showing the warning's type, name, description, and time range.
 *
 * @component
 * @param {Object} props Component props
 * @param {Warning} props.warning The warning object
 *
 * @returns {JSX.Element} The rendered warning line.
 */
const WarningLine = ({ warning }: { warning: Warning }): JSX.Element => {
  const descriptionTooltip = <Tooltip className="description-tooltip">{warning.description}</Tooltip>

  return (
    <Container className="warning-line">
      <Row>
        <Col xs={2} className="d-flex justify-content-end align-items-center">
          <DotIcon className={`warning-icon ${warning.type.toLowerCase()}-fill`} />
        </Col>
        <Col xs={7}>
          <Container className="p-0">
            <Row className="warning-title">{warning.name}</Row>
            {warning.description.length >= 32 ? (
              <OverlayTrigger overlay={descriptionTooltip} placement="top">
                <Row className="warning-description">{`${warning.description.slice(0, 33)}...`}</Row>
              </OverlayTrigger>
            ) : (
              <Row className="warning-description">
                {warning.description.length ? warning.description : 'Sem detalhes'}
              </Row>
            )}
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

/**
 * Modal component that displays weather information for a specific day and location.
 * Includes an expanded weather card and a list of weather warnings if present.
 *
 * @component
 * @param {Object} props Component props
 * @param {string} props.location The name of the selected location.
 * @param {WeatherData | undefined} props.weatherData The weather data for the selected day, including warnings.
 * @param {() => void} props.onClose Callback function triggered when the modal is closed.
 *
 * @returns {JSX.Element} The rendered modal with weather and warning details.
 */
const WeatherDayModal = ({ location, weatherData, onClose }: WeatherDayModalProps): JSX.Element => {
  return (
    <Modal show={!!weatherData} onHide={onClose} dialogClassName="weather-day-modal">
      <Modal.Body className="d-flex justify-content-center text-center">
        <Container>
          <Row>
            <Col xs={2}>
              <Button className="close-btn" onClick={onClose}>
                <LeftArrowIcon className="close-icon" />
              </Button>
            </Col>
            <Col xs={8} className="d-flex align-items-center justify-content-center location-title">
              <h6>{location}</h6>
            </Col>
          </Row>
          <Row className={`mt-${weatherData?.warnings.length ? 0 : 3}`}>
            {weatherData && <WeatherCard type="EXPANDED" data={weatherData} />}
          </Row>
          {weatherData?.warnings.length ? (
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
              <Row className="text-center mt-4">
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
