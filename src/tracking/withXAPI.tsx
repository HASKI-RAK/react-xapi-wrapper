import { ComponentType, forwardRef, ReactElement, Ref, useCallback, useMemo } from 'react'
import { XAPIComponentProps, useXAPI } from './useXAPI'

// TODO: Document this type
export type EventHandlers = {
  id?: string
  onClick?: (...args: any[]) => void // ✅
  onChange?: (...args: any[]) => void
  onClose?:  (...args: any[]) => void // ✅
}

// TODO: Document this HOC
export const withXAPI = <P extends object, T extends (...args: any[]) => void>(
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
      (...args: any[]) => {
        sendStatement('clicked')
        onClick?.(...args)
      },
      [onClick, sendStatement]
    )

    // Enhance the onChange event handler.
    // function handleChange(e: ChangeEvent<HTMLInputElement>): void
    // function handleChange(e: MouseEvent<HTMLElement>, value: unknown): void
    // function handleChange(e: ChangeEvent<HTMLInputElement> | MouseEvent<HTMLElement>, value?: unknown): void {
    //   sendStatement('changed')
    //   onChange?.(e, value)
    // }
    const handleChange = useCallback((...args: any[]) => {
      sendStatement('changed')
      if (onChange) {
        onChange?.(...args)
      }
    }, [onChange, sendStatement])

    // Enhance the onClose event handler.
    const handleClose = useCallback((...args: any[]) => {
        sendStatement('closed')
        onClose?.(...args)
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