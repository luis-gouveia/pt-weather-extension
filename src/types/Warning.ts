export enum WarningTypesEnum {
  'YELLOW',
  'ORANGE',
  'RED',
}

export interface Warning {
  type: keyof typeof WarningTypesEnum
  name: string
  description: string
  start: Date
  end: Date
}
