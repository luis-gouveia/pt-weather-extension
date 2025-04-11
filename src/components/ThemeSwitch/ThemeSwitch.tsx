import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { ThemeTypes } from '../../types/Theme'
import { ThemeUtils } from '../../utils/ThemeUtils'
import Sun from '../../assets/uiIcons/sun.svg?react'
import Moon from '../../assets/uiIcons/moon.svg?react'
import './ThemeSwitch.css'

const ThemeSwitch = () => {
  const [theme, setTheme] = useState<ThemeTypes>(() => {
    const localStorageTheme = localStorage.getItem('theme')
    if (localStorageTheme && ThemeUtils.isValidTheme(localStorageTheme)) {
      return localStorageTheme as ThemeTypes
    } else return 'LIGHT'
  })

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.querySelector('body')?.setAttribute('data-theme', theme.toLowerCase())
  }, [theme])

  const handleThemeChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setTheme(theme === 'LIGHT' ? 'DARK' : 'LIGHT')
  }

  return (
    <Button className="theme-switch" onClick={(e) => handleThemeChange(e)}>
      {theme === 'LIGHT' ? <Moon className="icon" /> : <Sun className="icon" />}
    </Button>
  )
}

export default ThemeSwitch
