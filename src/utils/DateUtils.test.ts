import { DateUtils } from './DateUtils'

describe('DateUtils', () => {
  test('Should convert a date string in compact format', () => {
    const date = DateUtils.toDateString(new Date('2025-04-23'), 'COMPACT')
    expect(date).toEqual('23/04')
  })

  test('Should convert a date string in expanded format', () => {
    const date = DateUtils.toDateString(new Date('2025-04-23'), 'EXPANDED')
    expect(date).toEqual('23/04/2025')
  })

  test('Should correctly format time from date', () => {
    const time = DateUtils.formatTime(new Date('2025-04-23T13:34:00.000Z'))
    expect(time).toEqual('13h34')
  })

  test("Should correctly format today's date", () => {
    const date = DateUtils.formatDate(new Date())
    expect(date).toEqual('Hoje')
  })

  test("Should correctly format tomorrow's date", () => {
    const date = DateUtils.formatDate(new Date(new Date().getTime() + DateUtils.ONE_DAY))
    expect(date).toEqual('Amanhã')
  })

  test('Should correctly format a date', () => {
    const date = DateUtils.formatDate(new Date('2024-11-02'))
    expect(date).toEqual('02/11/2024')
  })

  test('Should correctly check if date is today', () => {
    const isToday = DateUtils.isToday(new Date())
    expect(isToday).toBeTruthy()
  })

  test('Should correctly check if date is not today', () => {
    const isToday = DateUtils.isToday(new Date('2024-11-02'))
    expect(isToday).toBeFalsy()
  })

  test('Should correctly check if date is tomorrow', () => {
    const isTomorrow = DateUtils.isTomorrow(new Date(new Date().getTime() + DateUtils.ONE_DAY))
    expect(isTomorrow).toBeTruthy()
  })

  test('Should correctly check if date is not tomorrow', () => {
    const isTomorrow = DateUtils.isTomorrow(new Date('2024-11-02'))
    expect(isTomorrow).toBeFalsy()
  })
})
