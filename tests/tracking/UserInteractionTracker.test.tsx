import { fireEvent, render } from '@testing-library/react'
import { UserInteractionTracker, XAPIProvider } from '../../src'

describe('UserInteractionTracker', () => {
  jest.useFakeTimers()

  it('should create a component', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener')
    render(
      <XAPIProvider>
        <UserInteractionTracker />
      </XAPIProvider>,
    )

    fireEvent.mouseMove(window)
    expect(addEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function))
    fireEvent.keyDown(window, { key: 'Enter' })
    expect(addEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function))

    jest.advanceTimersByTime(30000)
    fireEvent.mouseMove(window)
    expect(addEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function))
    fireEvent.keyDown(window, { key: 'Enter' })
    expect(addEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function))

    jest.advanceTimersByTime(70001)
    fireEvent.mouseMove(window)
    expect(addEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function))
    fireEvent.keyDown(window, { key: 'Enter' })
    expect(addEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function))
  })
})
