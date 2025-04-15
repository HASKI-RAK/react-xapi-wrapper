import { getContext } from '../../src'

beforeAll(() => {
    Object.defineProperty(window, 'location', {
      value: {
        origin: 'http://localhost',
      },
      writable: true,
    });
  });

describe('getContext', () => {
    it('should return the context', () => {
        expect(getContext({
            contextActivities: {
                parent: [],
                grouping: [],
                category: [],
                her: [],
            },
            domainVersion: '1.0.0',
            filePath: '/tests/statements',
            gitHub: 'https://github.com/HASKI-RAK/react-xapi-wrapper',
        })).toEqual({
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

    it('should return the context with context activities undefined', () => {
        expect(getContext({
            domainVersion: '1.0.0',
            filePath: '/tests/statements',
            gitHub: '',
        })).toEqual({
            extensions: {
                'https://lrs.learninglocker.net/define/extensions/info': {
                    domain: 'http://localhost',
                    domain_version: '1.0.0',
                    github: '',
                    event_function: 'src/tests/statements',
                },
            },
            language: navigator.language,
            platform: 'Frontend',
        })
    })
})