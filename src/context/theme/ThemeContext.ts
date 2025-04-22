import { createContext } from 'react'
import { ThemeTypes } from '../../types/Theme'

type ThemeContextType = {
  theme: ThemeTypes
  toggleTheme: () => void
}

/**
 * React Context for managing and accessing the application's current theme.
 * The context value includes the current theme and a function to toggle between the themes.
 */
const ThemeContext = createContext<ThemeContextType>({ theme: 'LIGHT', toggleTheme: () => {} })

export { ThemeContext }
