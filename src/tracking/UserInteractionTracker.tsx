import { useCallback, useEffect, useState, memo } from 'react'
import { XAPIComponentProps, useXAPI } from './useXAPI'

// TODO: Document this component
const UserInteractionTracker = ({ componentFilePath, componentType, pageName }: XAPIComponentProps) => {
  // States.
  const [lastKeyStroke, setLastKeyStroke] = useState<number>(Date.now())
  const [lastMouseMove, setLastMouseMove] = useState<number>(Date.now())

  // Hook.
  // TODO
  const { sendStatement } = useXAPI({
    componentID: 'user-interaction-tracker',
    componentFilePath,
    componentType,
    pageName
  })

  // Sent statement on mouse move every 30 seconds.
  const handleMouseMove = useCallback(() => {
    const now = Date.now()

    if (now - lastMouseMove > 30000) {
      sendStatement('mouseMoved')
      setLastMouseMove(now)
    }
  }, [lastMouseMove, setLastMouseMove, sendStatement])

  // Sent statement on key stroke every 1 minute.
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