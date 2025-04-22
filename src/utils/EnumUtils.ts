export abstract class EnumUtils {
  /**
   * Converts the Enum keys into an array o strings suitable for zod validation
   *
   * @param object Enum object
   * @returns Array of enum keys suitable for zod validation
   */
  public static enumKeys<T extends object>(object: T): readonly [string, ...string[]] {
    const [firstKey, ...otherKeys] = Object.keys(object)
    return [firstKey, ...otherKeys]
  }
}
