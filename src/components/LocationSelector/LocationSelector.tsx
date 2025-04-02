import { useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import './LocationSelector.css'

// TODO: only temporary
const data = [
  'Aveiro',
  'Beja',
  'Braga',
  'Guimarães',
  'Bragança',
  'Castelo Branco',
  'Coimbra',
  'Évora',
  'Faro',
  'Sagres',
  'Portimão',
  'Loulé',
  'Guarda',
  'Penhas Douradas',
  'Leiria',
  'Lisboa',
  'Portalegre',
  'Porto',
  'Santarém',
  'Setúbal',
  'Sines',
  'Viana do Castelo',
  'Vila Real',
  'Viseu',
  'Funchal',
  'Porto Santo',
  'Vila do Porto',
  'Ponta Delgada',
  'Angra do Heroísmo',
  'Santa Cruz da Graciosa',
  'Velas',
  'Madalena',
  'Horta',
  'Santa Cruz das Flores',
  'Vila do Corvo',
]

const LocationSelector = () => {
  const [location, setLocation] = useState<string>(data[0])

  return (
    <Dropdown drop="down-centered" className="location-selector">
      <Dropdown.Toggle className="toggle" variant="transparent">
        {location}
      </Dropdown.Toggle>

      <Dropdown.Menu className="options">
        {data.map((locationName, index) => {
          return (
            <Dropdown.Item key={index} onClick={() => setLocation(locationName)} className="text-center">
              {locationName}
            </Dropdown.Item>
          )
        })}
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default LocationSelector
