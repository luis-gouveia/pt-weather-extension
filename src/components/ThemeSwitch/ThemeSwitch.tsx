import { Button } from 'react-bootstrap'
import Sun from '../../assets/uiIcons/sun.svg?react'
import Moon from '../../assets/uiIcons/moon.svg?react'
import './ThemeSwitch.css'
import { useState } from 'react'

const ThemeSwitch = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const handleThemeChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setTheme((theme) => {
      const newTheme = theme === 'light' ? 'dark' : 'light'
      document.querySelector('body')?.setAttribute('data-theme', newTheme)
      return newTheme
    })
  }

  return (
    <Button className="theme-switch" onClick={(e) => handleThemeChange(e)}>
      {theme === 'light' ? <Moon className="icon" /> : <Sun className="icon" />}
    </Button>
  )
}

export default ThemeSwitch
