import { JSX, useContext } from 'react'
import { ThemeContext } from '../../context/theme/ThemeContext'
import { Button } from 'react-bootstrap'
import Sun from '../../assets/uiIcons/sun.svg?react'
import Moon from '../../assets/uiIcons/moon.svg?react'
import './ThemeSwitch.css'

/**
 * A toggle button component that switches between light and dark themes.
 * Integrates with the `ThemeContext` to read and update the current theme.
 *
 * @returns {JSX.Element} A theme switch toggle button
 */
const ThemeSwitch = (): JSX.Element => {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <Button className="theme-switch" onClick={() => toggleTheme()}>
      {theme === 'LIGHT' ? <Moon className="icon" /> : <Sun className="icon" />}
    </Button>
  )
}

export default ThemeSwitch
