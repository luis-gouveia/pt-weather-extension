import { z } from 'zod'

/** Schema to validate an array of locations */
const locationsSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    warningAreaId: z.string().length(3),
  }),
)

export { locationsSchema }
