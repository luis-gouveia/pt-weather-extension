import { Dropdown } from 'react-bootstrap'
import { JSX } from 'react'
import { Location } from '../../types/Location'
import './LocationSelector.css'

interface LocationSelectorProps {
  location: string
  locations: Location[]
  locationChangeHandler: (newLocation: string) => void
}

/**
 * A dropdown component for selecting a location from a list.
 *
 * @component
 * @param {LocationSelectorProps} props Props for the location selector
 * @param {string} props.location The currently selected location
 * @param {Location[]} props.locations Array of available locations to choose from
 * @param {(location: string) => void} props.locationChangeHandler Callback function invoked when a new location is selected
 * @returns {JSX.Element} A dropdown menu to select a location
 */
const LocationSelector = ({ location, locations, locationChangeHandler }: LocationSelectorProps): JSX.Element => {
  return (
    <Dropdown drop="down-centered" className="location-selector">
      <Dropdown.Toggle className="toggle" variant="transparent">
        {location}
      </Dropdown.Toggle>

      <Dropdown.Menu className="options">
        {locations.map(({ name }, index) => {
          return (
            <Dropdown.Item key={index} onClick={() => locationChangeHandler(name)} className="text-center">
              {name}
            </Dropdown.Item>
          )
        })}
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default LocationSelector
