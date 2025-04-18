import { getContext } from '../../src'

beforeAll(() => {
  Object.defineProperty(window, 'location', {
    value: {
      origin: 'http://localhost',
    },
    writable: true,
  })
})

describe('getContext', () => {
  it('should return the context', () => {
    expect(
      getContext({
        contextActivities: {
          parent: [],
          grouping: [],
          category: [],
          her: [],
        },
        componentFilePath: '/tests/statements',
        projectURL: 'https://github.com/HASKI-RAK/react-xapi-wrapper',
        projectVersion: '1.0.0',
      }),
    ).toEqual({
      contextActivities: {
        parent: [],
        grouping: [],
        category: [],
        her: [],
      },
      extensions: {
        'https://lrs.learninglocker.net/define/extensions/info': {
          domain: 'http://localhost',
          domain_version: '1.0.0',
          github: 'https://github.com/HASKI-RAK/react-xapi-wrapper',
          event_function: 'src/tests/statements',
        },
      },
      language: navigator.language,
      platform: 'Frontend',
    })
  })
})
