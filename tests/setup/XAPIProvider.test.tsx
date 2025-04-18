import { render } from '@testing-library/react'
import { XAPIProvider } from '../../src'

describe('XAPIProvider', () => {
  it('should create a context', () => {
    const xAPIProvider = render(<XAPIProvider />)
    expect(xAPIProvider).toBeTruthy()
  })
})
