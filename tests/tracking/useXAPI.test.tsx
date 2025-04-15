import { renderHook } from "@testing-library/react"
import { useXAPI, XAPIProvider, setupXAPI } from "../../src"

describe('useXAPI', () => {
    it('should return a function to send xAPI statements', () => {
        Object.defineProperty(window, 'location', {
            value: {
              pathname: '/',
              href: 'http://localhost'
            },
            writable: true,
        })

        const xAPI = setupXAPI({
            projectURL: 'https://github.com/HASKI-RAK/react-xapi-wrapper',
            projectVersion: '1.0.0',
            repositories: {
                component: 'component',
                page: 'page',
                verb: 'verb'
            },
            userID: 'userID',
            xAPI: {
                auth: { username: 'username', password: 'password' },
                endpoint: 'http://localhost',
                version: '1.0.0'
            }
        })

        const { result } = renderHook(() => useXAPI(), {
            wrapper: ({ children }) => <XAPIProvider value={xAPI}>{children}</XAPIProvider>            
        })

        expect(result.current).toStrictEqual({
            sendStatement: expect.any(Function)
        })

        expect(result.current.sendStatement).toBeDefined()
        result.current.sendStatement('clicked')
    })
})