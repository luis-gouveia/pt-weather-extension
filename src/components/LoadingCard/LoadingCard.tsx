import { JSX } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Sun from '../../assets/weather/sunny.png'
import './LoadingCard.css'

/**
 * A loading card component to indicate a loading state while
 * awaiting data from API.
 *
 * @returns {JSX.Element} Rendered loading card
 */
const LoadingCard = (): JSX.Element => {
  return (
    <Container className="loading-card">
      <Row>
        <Col>
          <h2 className="title">Loading</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <img src={Sun} className="image" />
        </Col>
      </Row>
      <Row className="description">
        <Col>Fetching all the data...</Col>
      </Row>
    </Container>
  )
}

export default LoadingCard
