import { render, screen } from '@testing-library/react'
import LoadingCard from './LoadingCard'

describe('LoadingCard', () => {
  test('Should render loading card', () => {
    render(<LoadingCard />)
    expect(screen.getByText('Loading')).toBeInTheDocument()
    expect(screen.getByText('Fetching all the data...')).toBeInTheDocument()
    expect(screen.getByRole('img')).toBeInTheDocument()
  })
})
