import { ThemesEnum } from '../types/Theme'

export abstract class ThemeUtils {
  public static isValidTheme(theme: string): boolean {
    return theme in ThemesEnum
  }
}
