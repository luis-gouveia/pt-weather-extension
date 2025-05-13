import { JsonUtils } from './JsonUtils'

describe('JsonUtils', () => {
  test('Should parse a valid JSON', () => {
    const parsedValue = JsonUtils.safeParse('{"foo":"bar"}')
    expect(parsedValue).toHaveProperty('foo')
    expect(parsedValue.foo).toEqual('bar')
  })

  test('Should return the original string when parsing if invalid JSON', () => {
    const parsedValue = JsonUtils.safeParse('invalid_json')
    expect(parsedValue).toEqual('invalid_json')
  })
})
