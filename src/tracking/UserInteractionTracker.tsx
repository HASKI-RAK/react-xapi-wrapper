import { useCallback, useEffect, useState, memo } from 'react'
import { XAPIComponentProps, useXAPI } from './useXAPI'

/**
 * The UserInteractionTracker component.
 * Used to track user interactions such as mouse movements and key presses.
 *
 * @param componentFilePath - The file path of the component.
 * @param componentType - The type of the component.
 * @param pageName - The name of the page.
 * @returns A new instance of the UserInteractionTracker component.
 */
const UserInteractionTracker = ({
  componentFilePath,
  componentType,
  pageName,
}: XAPIComponentProps) => {
  // Initialize state variables to track the user interactions.
  const [lastKeyStroke, setLastKeyStroke] = useState<number>(0)
  const [lastMouseMove, setLastMouseMove] = useState<number>(0)

  // Retrieve the sendStatement function from the useXAPI hook.
  const { sendStatement } = useXAPI({
    componentFilePath,
    componentID: 'user-interaction-tracker',
    componentType,
    pageName,
  })

  // Sent statement on mouse move every 30 seconds.
  const handleMouseMove = useCallback(() => {
    const now = Date.now()

    if (now - lastMouseMove > 30000) {
      sendStatement('mouseMoved')
      setLastMouseMove(now)
    }
  }, [lastMouseMove, setLastMouseMove, sendStatement])

  // Sent statement on key stroke every minute.
  const handleKeyStroke = useCallback(() => {
    const now = Date.now()

    if (now - lastKeyStroke > 100000) {
      sendStatement('keyPressed')
      setLastKeyStroke(now)
    }
  }, [lastKeyStroke, setLastKeyStroke, sendStatement])

  // Add and remove event listeners.
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('keydown', handleKeyStroke)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('keydown', handleKeyStroke)
    }
  }, [handleMouseMove, handleKeyStroke, sendStatement])

  return null
}

export default memo(UserInteractionTracker)
