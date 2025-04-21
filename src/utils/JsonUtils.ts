export abstract class JsonUtils {
  /**
   * Safely attempts to parse a JSON string. If parsing fails,
   * the original string is returned instead.
   *
   * @param {string} value The string to parse
   * @returns {any} Returns the parsed object if valid JSON, or the original string if parsing fails
   */
  public static safeParse(value: string): any {
    try {
      return JSON.parse(value)
    } catch {
      return value
    }
  }
}
