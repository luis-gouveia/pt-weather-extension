import { JSX } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import ErrorImage from '../../assets/weatherIcons/sunny.png'
import './ErrorCard.css'

interface ErrorCardProps {
  error?: string
}

/**
 * Error card that displays an error message in a styled card format.
 * Used to inform the user when an error occurs, such as during
 * data fetching.
 *
 * @param {Object} props Component props
 * @param {string} [props.message] Optional custom error message to display
 * @returns {JSX.Element} Rendered error card
 */
const ErrorCard = ({ error }: ErrorCardProps): JSX.Element => {
  const defaultErrorMessage = 'An unexpected error occured, restart the extension.'

  return (
    <Container className="error-card">
      <Row>
        <Col>
          <h2 className="title">Oops!</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <img src={ErrorImage} className="image" />
        </Col>
      </Row>
      <Row>
        <Col>
          <h3 className="title">Unexpected Error Occured</h3>
        </Col>
      </Row>
      <Row className="description">
        <Col>{error ?? defaultErrorMessage}</Col>
      </Row>
      <Row>
        <Col>
          <Button className="reload-button" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default ErrorCard
