import { getStatement } from '../../src'

beforeAll(() => {
  Object.defineProperty(window, 'location', {
    value: {
      origin: 'http://localhost',
      href: 'http://localhost/test',
    },
    writable: true,
  })
})

describe('getStatement', () => {
  it('should return the statement', () => {
    expect(
      getStatement({
        componentFilePath: '/tests/statements',
        componentID: 'componentID',
        componentType: 'componentType',
        currentLanguage: 'en',
        pageName: 'pageName',
        projectURL: 'https://github.com/HASKI-RAK/react-xapi-wrapper',
        projectVersion: '1.0.0',
        repositories: 'repository/',
        userID: 'userID',
        verbName: 'verbName',
      }),
    ).toEqual({
      actor: {
        account: {
          name: 'userID',
          homePage: 'http://localhost',
        },
      },
      verb: {
        id: 'repository/verbName',
        display: {
          en: 'verbName',
        },
      },
      object: {
        definition: {
          name: {
            en: 'componentType',
          },
          type: 'repository/componentType',
        },
        id: 'http://localhost/test#componentID',
      },
      context: {
        contextActivities: {
          grouping: [
            {
              id: 'http://localhost',
              definition: {
                name: {
                  en: 'Home',
                },
                type: 'repository/Home',
              },
            },
          ],
          parent: [
            {
              id: 'http://localhost/test',
              definition: {
                name: {
                  en: 'pageName',
                },
                type: 'repository/pageName',
              },
            },
          ],
        },
        extensions: {
          'https://lrs.learninglocker.net/define/extensions/info': {
            domain: 'http://localhost',
            domain_version: '1.0.0',
            event_function: 'src/tests/statements',
            github: 'https://github.com/HASKI-RAK/react-xapi-wrapper',
          },
        },
        language: 'en',
        platform: 'Frontend',
      },
      timestamp: expect.any(String),
    })
  })

  it('should return the statement with repositories as an object', () => {
    expect(
      getStatement({
        componentFilePath: '/tests/statements',
        componentID: 'componentID',
        componentType: 'componentType',
        currentLanguage: 'en',
        pageName: 'pageName',
        projectURL: 'https://github.com/HASKI-RAK/react-xapi-wrapper',
        projectVersion: '1.0.0',
        repositories: {
          page: 'repository/pages/',
          component: 'repository/components/',
          verb: 'repository/verbs/',
        },
        userID: 'userID',
        verbName: 'verbName',
      }),
    ).toEqual({
      actor: {
        account: {
          name: 'userID',
          homePage: 'http://localhost',
        },
      },
      verb: {
        id: 'repository/verbs/verbName',
        display: {
          en: 'verbName',
        },
      },
      object: {
        definition: {
          name: {
            en: 'componentType',
          },
          type: 'repository/components/componentType',
        },
        id: 'http://localhost/test#componentID',
      },
      context: {
        contextActivities: {
          grouping: [
            {
              id: 'http://localhost',
              definition: {
                name: {
                  en: 'Home',
                },
                type: 'repository/pages/Home',
              },
            },
          ],
          parent: [
            {
              id: 'http://localhost/test',
              definition: {
                name: {
                  en: 'pageName',
                },
                type: 'repository/pages/pageName',
              },
            },
          ],
        },
        extensions: {
          'https://lrs.learninglocker.net/define/extensions/info': {
            domain: 'http://localhost',
            domain_version: '1.0.0',
            event_function: 'src/tests/statements',
            github: 'https://github.com/HASKI-RAK/react-xapi-wrapper',
          },
        },
        language: 'en',
        platform: 'Frontend',
      },
      timestamp: expect.any(String),
    })
  })
})
