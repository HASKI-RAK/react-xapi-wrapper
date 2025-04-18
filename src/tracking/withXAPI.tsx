import { ComponentType, forwardRef, ReactElement, Ref, useCallback, useMemo } from 'react'
import { XAPIComponentProps, useXAPI } from './useXAPI'

/**
 * The type definition of EventHandlers.
 * Used to define the structure of the event handlers for the withXAPI function.
 */
export type EventHandlers = {
  id?: string
  onClick?: (...args: any[]) => void
  onChange?: (...args: any[]) => void
  onClose?: (...args: any[]) => void
  pageName?: string
}

/**
 * The withXAPI function.
 * Used to enhance a component with xAPI tracking capabilities.
 *
 * @param componentFilePath - The file path of the component to be used in the statement.
 * @param componentType - The type of the component to be used in the statement.
 * @param id - The ID of the component to be used in the statement.
 * @param onChange - The change event handler to be overwritten with xAPI tracking capabilities.
 * @param onClick - The click event handler to be overwritten with xAPI tracking capabilities.
 * @param onClose - The close event handler to be overwritten with xAPI tracking capabilities.
 * @param pageName - The name of the page to be used in the statement.
 * @param ref - The ref to be passed to the wrapped component.
 * @param WrappedComponent - The component to be enhanced with xAPI tracking capabilities.
 * @returns A new component that wraps the given component enhancing the event handlers with the ability to send xAPI statements.
 */
export const withXAPI = <P extends object>(
  WrappedComponent: ComponentType<P & EventHandlers & { ref?: Ref<unknown> }>,
  { componentFilePath, componentType }: XAPIComponentProps,
) => {
  /**
   * The XAPIEnhancedComponent component.
   * Creates a new component that wraps the given component enhancing the event handlers with the ability to send xAPI statements.
   *
   * @param id - The ID of the component to be used in the statement.
   * @param onChange - The change event handler to be overwritten with xAPI tracking capabilities.
   * @param onClick - The click event handler to be overwritten with xAPI tracking capabilities.
   * @param onClose - The close event handler to be overwritten with xAPI tracking capabilities.
   * @param pageName - The name of the page to be used in the statement.
   * @param ref - The ref to be passed to the wrapped component.
   * @returns A new instance of the XAPIEnhancedComponent component.
   */
  const XAPIEnhancedComponent = forwardRef<unknown, P & EventHandlers>(
    (props: P & EventHandlers, ref: Ref<unknown>): ReactElement => {
      // Extract the event handlers from the props.
      const { id, onClick, onChange, onClose, pageName, ...rest } = props

      const xAPIProps = useMemo(
        () => ({
          componentID: id,
          componentFilePath,
          componentType,
          pageName,
        }),
        [id, componentFilePath, componentType, pageName],
      )

      // Get the function to send xAPI statements from the hook.
      const { sendStatement } = useXAPI(xAPIProps)

      // Enhance the onChange event handler.
      const handleChange = useCallback(
        (...args: any[]) => {
          sendStatement('changed')
          onChange?.(...args)
        },
        [onChange, sendStatement],
      )

      // Enhance the onClick event handler
      const handleClick = useCallback(
        (...args: any[]) => {
          sendStatement('clicked')
          onClick?.(...args)
        },
        [onClick, sendStatement],
      )

      // Enhance the onClose event handler.
      const handleClose = useCallback(
        (...args: any[]) => {
          sendStatement('closed')
          onClose?.(...args)
        },
        [onClose, sendStatement],
      )

      // Return the component with the enhanced event handlers.
      return (
        <WrappedComponent
          ref={ref}
          {...(rest as P)}
          onChange={onChange ? handleChange : undefined}
          onClick={onClick ? handleClick : undefined}
          onClose={onClose ? handleClose : undefined}
        />
      )
    },
  )

  XAPIEnhancedComponent.displayName = `withXAPI(${WrappedComponent.displayName ?? 'Component'})`
  return XAPIEnhancedComponent
}
