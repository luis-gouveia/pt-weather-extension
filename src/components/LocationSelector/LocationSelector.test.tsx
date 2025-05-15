import { fireEvent, render, screen } from '@testing-library/react'
import LocationSelector from './LocationSelector'

describe('LocationSelector', async () => {
  const location = 'Lisboa'
  const locations = [
    { id: 1, name: 'Lisboa', warningAreaId: 'LIS' },
    { id: 2, name: 'Porto', warningAreaId: 'OPO' },
  ]
  const changeLocation = vi.fn()

  test('Should render location selector', () => {
    render(<LocationSelector location={location} locations={locations} locationChangeHandler={changeLocation} />)
    expect(screen.getByText(location)).toBeInTheDocument()
  })

  test('Should render location options on click', async () => {
    render(<LocationSelector location={location} locations={locations} locationChangeHandler={changeLocation} />)
    expect(screen.getByText(location)).toBeInTheDocument()
    const selector = screen.getByRole('button')
    fireEvent.click(selector)

    const dropdownOptions = (await screen.findAllByRole('button')).filter((e) => e.className.includes('dropdown-item'))
    expect(dropdownOptions.length).toEqual(locations.length)
  })

  test('Should trigger location change', async () => {
    render(<LocationSelector location={location} locations={locations} locationChangeHandler={changeLocation} />)
    expect(screen.getByText(location)).toBeInTheDocument()
    const selector = screen.getByRole('button')
    fireEvent.click(selector)

    const locationElement = (await screen.findAllByRole('button')).filter((e) =>
      e.className.includes('dropdown-item'),
    )[0]
    fireEvent.click(locationElement)
    expect(changeLocation).toHaveBeenCalledWith(locationElement.textContent)
  })
})
