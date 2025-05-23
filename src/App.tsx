import { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { WeatherData } from './types/WeatherData'
import { useForecastAPI } from './hooks/useForecastAPI'
import { useLocalStorage } from './hooks/useLocalStorage'
import ThemeSwitch from './components/ThemeSwitch/ThemeSwitch'
import LocationSelector from './components/LocationSelector/LocationSelector'
import WeatherCard from './components/WeatherCard/WeatherCard'
import WeatherDayModal from './components/WeatherDayModal/WeatherDayModal'
import LoadingCard from './components/LoadingCard/LoadingCard'
import ErrorCard from './components/ErrorCard/ErrorCard'
import './App.css'

function App() {
  const [location, setLocation] = useLocalStorage('location', 'Lisboa')
  const [isLoading, data, error] = useForecastAPI(location)

  const [modalData, setModalData] = useState<WeatherData | undefined>(undefined)
  const showModal = (weatherData: WeatherData) => setModalData(weatherData)
  const closeModal = () => setModalData(undefined)

  return (
    <Container className="app text-center pt-1">
      {isLoading && <LoadingCard />}
      {error && <ErrorCard error={error.message} />}
      {data && (
        <>
          <Row>
            <Col xs={{ span: 8, offset: 2 }} className="mt-2 d-flex justify-content-center align-items-center">
              <LocationSelector locations={data.locations} location={location} locationChangeHandler={setLocation} />
            </Col>
            <Col xs={2} className="d-flex justify-content-center">
              <ThemeSwitch />
            </Col>
          </Row>
          <Row className="mt-2">
            <Col onClick={() => showModal(data.forecast[0])}>
              <WeatherCard type="EXPANDED" data={data.forecast[0]} />
            </Col>
          </Row>
          <Row className="mt-4 compact-cards-container">
            {data.forecast.slice(1).map((forecast, index) => {
              return (
                <Col xs={3} className="compact-card" key={index} onClick={() => showModal(forecast)}>
                  <WeatherCard type="COMPACT" data={forecast} />
                </Col>
              )
            })}
          </Row>
          <WeatherDayModal onClose={closeModal} location={location} weatherData={modalData} />
        </>
      )}
    </Container>
  )
}

export default App
