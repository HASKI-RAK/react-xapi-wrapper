import { ChangeEvent, ComponentType, forwardRef, MouseEvent, ReactElement, Ref, useCallback, useMemo } from 'react'
import { XAPIComponentProps, useXAPI } from './useXAPI'

// TODO: Document this type
export type EventHandlers = {
  id?: string
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void // TODO: Test with HTMLElement, Element or unknown
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void // TODO: SelectChangeEvent<> mit unknown??
  onClose?:  (event: object, reason: string) => void
}

// TODO: Document this HOC
export const withXAPI = <P extends object>(
  WrappedComponent: ComponentType<P & EventHandlers & {ref?: Ref<unknown>}>,
  { componentFilePath, componentType, pageName }: XAPIComponentProps
) => {
  // Create a new component that wraps the given component enhancing the event handlers with the ability to send xAPI statements.
  const XAPIEnhancedComponent = forwardRef<unknown, P & EventHandlers>((props: P & EventHandlers, ref: Ref<unknown>): ReactElement => {
    // Extract the event handlers from the props.
    
    const { id, onClick, onChange, onClose, ...rest } = props

    const xAPIProps = useMemo(() => ({
      componentID: id,
      componentFilePath,
      componentType,
      pageName
    }), [id, componentFilePath, componentType, pageName])

    // Get the function to send xAPI statements from the hook.
    const { sendStatement } = useXAPI(xAPIProps)

    // Enhance the onClick event handler
    const handleClick = useCallback(
      (e: MouseEvent<HTMLButtonElement>) => {
        sendStatement('clicked')
        onClick?.(e)
      },
      [onClick, sendStatement]
    )


    // Enhance the onChange event handler.
    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        sendStatement('changed')
        onChange?.(e)
      },
      [onChange, sendStatement]
    )

    // Enhance the onClose event handler.
    const handleClose = useCallback((event: object, reason: string) => {
        sendStatement('closed')
        onClose?.(event, reason)
      },
      [onClose, sendStatement]
    )

    // Return the component with the enhanced event handlers.
    return (
      <WrappedComponent
        ref={ref}
        {...(rest as P)}
        onClick={onClick ? handleClick : undefined}
        onChange={onChange ? handleChange : undefined}
        onClose={onClose ? handleClose : undefined}
      />
    )
  })

  XAPIEnhancedComponent.displayName = `withXAPI(${WrappedComponent.displayName ?? "Component"})`
  return XAPIEnhancedComponent
}