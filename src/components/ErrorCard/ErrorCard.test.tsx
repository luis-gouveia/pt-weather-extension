import { render, screen } from '@testing-library/react'
import ErrorCard from './ErrorCard'

describe('ErrorCard', () => {
  test('Should render error card', () => {
    render(<ErrorCard />)
    expect(screen.getByText('Oops!')).toBeInTheDocument()
    expect(screen.getByText('Unexpected Error Occured')).toBeInTheDocument()
    expect(screen.getByRole('img')).toBeInTheDocument()

    const btn = screen.getByRole('button')
    expect(btn).toBeInTheDocument()
    expect(btn.textContent).toEqual('Try Again')
  })

  test('Should render error card with custom error message', () => {
    render(<ErrorCard error="Custom error message" />)
    expect(screen.getByText('Oops!')).toBeInTheDocument()
    expect(screen.getByText('Custom error message')).toBeInTheDocument()
    expect(screen.getByRole('img')).toBeInTheDocument()

    const btn = screen.getByRole('button')
    expect(btn).toBeInTheDocument()
    expect(btn.textContent).toEqual('Try Again')
  })
})
