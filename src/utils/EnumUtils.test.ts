import { EnumUtils } from './EnumUtils'

describe('EnumUtils', () => {
  enum TestEnum {
    'foo',
    'bar',
  }

  test('Should return enum keys', () => {
    const keys = EnumUtils.enumKeys(TestEnum)
    expect(keys).toContainEqual('foo')
    expect(keys).toContainEqual('bar')
  })
})
