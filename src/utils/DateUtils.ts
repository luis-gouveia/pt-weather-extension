export abstract class DateUtils {
  public static formatTime(date: Date): string {
    return `${('0' + date.getUTCHours()).slice(-2)}h${('0' + date.getUTCMinutes()).slice(-2)}`
  }

  public static formatDate(date: Date, format: 'EXPANDED' | 'COMPACT' = 'EXPANDED'): string {
    if (DateUtils.isToday(date)) return 'Hoje'
    if (DateUtils.isTomorrow(date)) return 'Amanhã'
    let formattedDate = `${('0' + date.getUTCDate()).slice(-2)}/${('0' + date.getUTCMonth()).slice(-2)}`
    if (format === 'EXPANDED') formattedDate += `/${date.getUTCFullYear()}`
    return formattedDate
  }

  public static isTomorrow(date: Date): boolean {
    const now = new Date()
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)

    return (
      date.getFullYear() === tomorrow.getFullYear() &&
      date.getMonth() === tomorrow.getMonth() &&
      date.getDate() === tomorrow.getDate()
    )
  }

  public static isToday(date: Date): boolean {
    const now = new Date()

    return (
      date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDate() === now.getDate()
    )
  }
}
