import { getActor } from '../../src'

beforeAll(() => {
    Object.defineProperty(window, 'location', {
      value: {
        origin: 'http://localhost',
      },
      writable: true,
    });
  });

describe('getActor', () => {
    it('should return the actor', () => {
        expect(getActor({ userID: 'user' })).toEqual({
            account: {
                homePage: 'http://localhost',
                name: 'user',
            }
        })
    })
})