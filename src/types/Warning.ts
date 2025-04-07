export interface Warning {
  type: 'YELLOW' | 'ORANGE' | 'RED'
  name: string
  description: string
  start: Date
  end: Date
}
