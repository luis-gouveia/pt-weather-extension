import { useEffect, useRef, useState } from 'react'
import { JsonUtils } from '../utils/JsonUtils'
import storage from 'localstorage-ttl'
import { ZodSchema } from 'zod'

interface LocalStorageOptions {
  ttl?: number
  schema?: ZodSchema
}

/**
 * A custom React hook that syncs a value with `localStorage`, with optional ttl and validation.
 *
 * @template Entity The expected value type
 * @param {string} key The key used in `localStorage`
 * @param {LocalStorageOptions} [options] Optional schema to validate the stored value and ttl
 * @returns {[Entity, React.Dispatch<React.SetStateAction<Entity>>]} - The value and its setter
 */
export function useLocalStorage<Entity>(
  key: string,
  defaultValue: Entity,
  options?: LocalStorageOptions,
): [Entity, React.Dispatch<React.SetStateAction<Entity>>] {
  const { ttl, schema } = options || {}

  const hasMounted = useRef(false)

  const [entity, setEntity] = useState<Entity>(() => {
    const raw = storage.get<string>(key)
    if (!raw) return defaultValue

    const parsed = JsonUtils.safeParse(raw)

    if (schema) {
      const result = schema.safeParse(parsed)
      if (result.success) return result.data

      storage.remove(key)
      return defaultValue
    }

    return parsed as Entity
  })

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true
      return
    }

    if (entity) storage.set(key, JSON.stringify(entity), ttl)
    else storage.remove(key)
  }, [key, entity, ttl])

  return [entity, setEntity] as const
}
