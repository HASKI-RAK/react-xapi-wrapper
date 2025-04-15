import { XAPIProvider } from '../../src'
import { render } from '@testing-library/react'

describe('XAPIProvider', () => {
    it('should create a context', () => {
        const xAPIProvider = render(<XAPIProvider />)
        expect(xAPIProvider).toBeTruthy()
    })
})