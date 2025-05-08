import { z } from 'zod'
import { EnumUtils } from '../utils/EnumUtils'
import { WarningTypesEnum } from '../types/Warning'

/** Schema to validate a date */
const dateSchema = z.string().length(24).pipe(z.coerce.date())

/** Schema to validate an wind types */
const windTypesSchema = z.record(z.coerce.number(), z.string())

/** Schema to validate an weather types */
const weatherTypesSchema = z.record(z.coerce.number(), z.string())

/** Schema to validate UV value */
const uvSchema = z.record(z.number().min(0))

/** Schema to validate warning object */
const warningsSchema = z.record(
  z.string(),
  z.object({
    type: z.enum(EnumUtils.enumKeys(WarningTypesEnum)),
    name: z.string(),
    description: z.string(),
    start: dateSchema,
    end: dateSchema,
  }),
)

/** Schema to weather forecast */
const weatherForecastSchema = z.array(
  z.object({
    date: z.string().length(24).pipe(z.coerce.date()),
    weatherType: z.number(),
    precipitationProb: z.number(),
    maxTemp: z.number(),
    minTemp: z.number(),
    windType: z.number(),
    windDirection: z.string(),
  }),
)

export { windTypesSchema, weatherTypesSchema, uvSchema, warningsSchema, weatherForecastSchema }
