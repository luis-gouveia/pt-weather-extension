import { useState } from 'react'
import icon from '/icon128.png'
import './App.css'
import { Button, Col, Container, Row } from 'react-bootstrap'
import ThemeSwitch from './components/ThemeSwitch/ThemeSwitch'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Container className="app text-center pt-5">
      <Row className="bg-success">
        <Col xs={{ span: 8, offset: 2 }} className="d-flex justify-content-center align-items-center">
          <h1>Funchal</h1>
        </Col>
        <Col xs="2" className="d-flex justify-content-center">
          <ThemeSwitch />
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <a href="https://vite.dev" target="_blank">
            <img src={icon} className="logo" alt="Vite logo" />
          </a>
        </Col>
      </Row>
      <Row>
        <Col>
          <h1>Hello World</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="primary" onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default App
