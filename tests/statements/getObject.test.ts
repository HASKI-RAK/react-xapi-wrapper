import { getObject } from '../../src'

beforeAll(() => {
  Object.defineProperty(window, 'location', {
    value: {
      href: 'http://localhost/test',
    },
    writable: true,
  })
})

describe('getObject', () => {
  it('should return the object', () => {
    expect(
      getObject({
        componentType: 'component',
        componentID: 'componentID',
        repository: 'repository/components/',
      }),
    ).toEqual({
      id: 'http://localhost/test#componentID',
      definition: {
        name: {
          en: 'component',
        },
        type: 'repository/components/component',
      },
    })
  })
})
