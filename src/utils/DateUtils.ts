export abstract class DateUtils {
  public static readonly ONE_HOUR = 60 * 60 * 1000
  public static readonly ONE_DAY = 24 * this.ONE_HOUR

  /**
   * Converts a `Date` object to a readable short date string (e.g., "12/01" or "12/01/2025").
   *
   * @param {Date} date The date to convert
   * @param {'EXPANDED' | 'COMPACT'} [format='EXPANDED'] The desired date format
   * @returns {string} A human-readable date string
   */
  public static toDateString(date: Date, format: 'EXPANDED' | 'COMPACT' = 'EXPANDED'): string {
    let formattedDate = `${('0' + date.getUTCDate()).slice(-2)}/${('0' + date.getUTCMonth()).slice(-2)}`
    if (format === 'EXPANDED') formattedDate += `/${date.getUTCFullYear()}`
    return formattedDate
  }

  /**
   * Formats a `Date` into a 24-hour time format (e.g., "14h30").
   *
   * @param {string | Date} date The date to format
   * @returns {string} Formatted time string
   */
  public static formatTime(date: Date): string {
    return `${('0' + date.getUTCHours()).slice(-2)}h${('0' + date.getUTCMinutes()).slice(-2)}`
  }

  /**
   * Returns a formatted date string, replacing today and tomorrow with localized labels.
   *
   * @param {Date} date The date to format
   * @param {'EXPANDED' | 'COMPACT'} [format='EXPANDED'] Determines the verbosity of the date format
   * @returns {string} `"Hoje"`, `"Amanhã"`  or a formatted date string
   */
  public static formatDate(date: Date, format: 'EXPANDED' | 'COMPACT' = 'EXPANDED'): string {
    if (DateUtils.isToday(date)) return 'Hoje'
    if (DateUtils.isTomorrow(date)) return 'Amanhã'
    return DateUtils.toDateString(date, format)
  }

  /**
   * Checks whether a given date is **today**.
   *
   * @param {Date} date The date to compare
   * @returns {boolean} `true` if the date is today, otherwise `false`
   */
  public static isToday(date: Date): boolean {
    const now = new Date()

    return (
      date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDate() === now.getDate()
    )
  }

  /**
   * Checks whether a given date is **tomorrow**.
   *
   * @param {Date} date The date to compare
   * @returns {boolean} `true` if the date is tomorrow, otherwise `false`
   */
  public static isTomorrow(date: Date): boolean {
    const now = new Date()
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)

    return (
      date.getFullYear() === tomorrow.getFullYear() &&
      date.getMonth() === tomorrow.getMonth() &&
      date.getDate() === tomorrow.getDate()
    )
  }
}
