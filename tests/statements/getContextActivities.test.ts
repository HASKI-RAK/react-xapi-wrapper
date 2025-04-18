import { getContextActivities } from '../../src'

describe('getContextActivities', () => {
  it('should return the context activities', () => {
    Object.defineProperty(window, 'location', {
      value: {
        origin: 'http://localhost',
        href: 'http://localhost/test',
        pathname: '/test',
      },
      writable: true,
    })

    expect(getContextActivities({ pageName: 'page', repository: 'repository/pages/' })).toEqual({
      grouping: [
        {
          id: 'http://localhost',
          definition: {
            type: 'repository/pages/Home',
            name: {
              en: 'Home',
            },
          },
        },
      ],
      parent: [
        {
          id: 'http://localhost/test',
          definition: {
            type: 'repository/pages/page',
            name: {
              en: 'page',
            },
          },
        },
      ],
    })
  })

  it('should return the context activities with path', () => {
    Object.defineProperty(window, 'location', {
      value: {
        origin: 'http://localhost',
        pathname: '/',
      },
      writable: true,
    })

    expect(getContextActivities({ pageName: 'page', repository: 'repository/pages/' })).toEqual({
      parent: [
        {
          id: 'http://localhost',
          definition: {
            type: 'repository/pages/Home',
            name: {
              en: 'Home',
            },
          },
        },
      ],
    })
  })
})
