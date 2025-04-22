import { useEffect } from 'react'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { ThemeTypes } from '../../types/Theme'
import { ThemeContext } from './ThemeContext'
import { themeSchema } from '../../schemas/ThemeSchema'

/**
 * ThemeProvider component wraps the application and provides theme state via context.
 *
 * @param {ThemeProviderProps} props The children to wrap with the theme context
 * @returns A React context provider for theme
 */
const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useLocalStorage<ThemeTypes>('theme', 'LIGHT', { schema: themeSchema })

  const toggleTheme = () => {
    setTheme(theme === 'LIGHT' ? 'DARK' : 'LIGHT')
  }

  useEffect(() => {
    document.querySelector('body')?.setAttribute('data-theme', theme.toLowerCase())
  }, [theme])

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export default ThemeProvider
