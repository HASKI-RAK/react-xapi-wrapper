import { setupXAPI } from "../../src"
import BaseXAPI from '@xapi/xapi'

describe('setupXAPI', () => {
    it('should return the xAPI object', () => {
        expect(setupXAPI({
            xAPI: {
                auth: { username: 'username', password: 'password' },
                endpoint: 'http://localhost',
                version: '1.0.0',
            },
            projectURL: 'http://localhost',
            projectVersion: '1.0.0',
            repositories: 'repository/',
        })).toEqual({
            xAPI: new BaseXAPI({
                auth: BaseXAPI.toBasicAuth('username', 'password'),
                endpoint: 'http://localhost',
                version: '1.0.0',
                adapter: 'fetch'
            }),
            projectURL: 'http://localhost',
            projectVersion: '1.0.0',
            repositories: 'repository/',
        })
    })

    
    it('should return the xAPI object with auth as a string', () => {
        expect(setupXAPI({
            xAPI: {
                auth: 'auth',
                endpoint: 'http://localhost',
                version: '1.0.0',
            },
            projectURL: 'http://localhost',
            projectVersion: '1.0.0',
            repositories: 'repository/',
        })).toEqual({
            xAPI: new BaseXAPI({
                auth: 'auth',
                endpoint: 'http://localhost',
                version: '1.0.0',
                adapter: 'fetch'
            }),
            projectURL: 'http://localhost',
            projectVersion: '1.0.0',
            repositories: 'repository/',
        })
    })
})