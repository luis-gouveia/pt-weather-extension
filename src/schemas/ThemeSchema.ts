import { z } from 'zod'
import { ThemesEnum } from '../types/Theme'
import { EnumUtils } from '../utils/EnumUtils'

/** Schema to validate the possible theme types */
const themeSchema = z.enum(EnumUtils.enumKeys(ThemesEnum))

export { themeSchema }
