import { getVerb } from '../../src'

describe('getVerb', () => {
  it('should return the verb', () => {
    expect(
      getVerb({
        verbName: 'tested',
        repository: 'repository/verbs/',
      }),
    ).toEqual({
      id: 'repository/verbs/tested',
      display: {
        en: 'tested',
      },
    })
  })
})
