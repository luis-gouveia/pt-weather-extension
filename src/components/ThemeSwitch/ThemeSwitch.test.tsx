import { render, screen, fireEvent } from '@testing-library/react'
import ThemeSwitch from './ThemeSwitch'
import ThemeProvider from '../../context/theme/ThemeProvider'

describe('ThemeSwitch', () => {
  test('Should render theme switch', () => {
    render(
      <ThemeProvider>
        <ThemeSwitch />
      </ThemeProvider>,
    )
    expect(document.body.getAttribute('data-theme')).toEqual('light')
  })

  test('Should toggle theme switch', () => {
    render(
      <ThemeProvider>
        <ThemeSwitch />
      </ThemeProvider>,
    )
    const switchBtn = screen.getByRole('button')
    fireEvent.click(switchBtn)
    expect(document.body.getAttribute('data-theme')).toEqual('dark')
  })
})
