import { Dropdown } from 'react-bootstrap'
import './LocationSelector.css'

interface LocationSelectorProps {
  location: string
  locations: string[]
  locationChangeHandler: (newLocation: string) => void
}

const LocationSelector = ({ location, locations, locationChangeHandler }: LocationSelectorProps) => {
  const handleLocationChange = (e: React.MouseEvent<HTMLElement, MouseEvent>, newLocation: string) => {
    e.preventDefault()
    locationChangeHandler(newLocation)
  }

  return (
    <Dropdown drop="down-centered" className="location-selector">
      <Dropdown.Toggle className="toggle" variant="transparent">
        {location}
      </Dropdown.Toggle>

      <Dropdown.Menu className="options">
        {locations.map((locationName, index) => {
          return (
            <Dropdown.Item key={index} onClick={(e) => handleLocationChange(e, locationName)} className="text-center">
              {locationName}
            </Dropdown.Item>
          )
        })}
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default LocationSelector
