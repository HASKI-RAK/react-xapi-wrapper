import { fireEvent, render } from '@testing-library/react'
import { withXAPI } from '../../src'

describe('withXAPI', () => {
  it('', () => {
    const Component = (props: any) => <button data-testid="button" {...props} />
    const EnhancedComponent = withXAPI(Component, {
      componentFilePath: 'src/tracking/',
      componentType: 'componentType',
    })
    expect(EnhancedComponent).toBeDefined()
    expect(EnhancedComponent.displayName).toBe('withXAPI(Component)')

    const handleClick = jest.fn()
    const handleClose = jest.fn()
    const { getByTestId } = render(
      <EnhancedComponent id="id" onClick={handleClick} onClose={handleClose} />,
    )

    const wrappedComponent = getByTestId('button')
    expect(wrappedComponent).toBeDefined()

    fireEvent.click(wrappedComponent)
    expect(handleClick).toHaveBeenCalled()
  })

  it('', () => {
    const Component = (props: any) => <select data-testid="select" {...props} />
    const EnhancedComponent = withXAPI(Component, {
      componentFilePath: 'src/tracking/',
      componentType: 'componentType',
    })
    expect(EnhancedComponent).toBeDefined()
    expect(EnhancedComponent.displayName).toBe('withXAPI(Component)')

    const handleChange = jest.fn()
    const { getByTestId } = render(<EnhancedComponent id="id" onChange={handleChange} />)

    const wrappedComponent = getByTestId('select')
    expect(wrappedComponent).toBeDefined()

    fireEvent.change(wrappedComponent, { target: { value: 'foo' } })
    expect(handleChange).toHaveBeenCalled()
  })

  it('', () => {
    const Component = (props: any) => <button data-testid="button" onClick={props.onClose} />
    const EnhancedComponent = withXAPI(Component, {
      componentFilePath: 'src/tracking/',
      componentType: 'componentType',
    })
    expect(EnhancedComponent).toBeDefined()
    expect(EnhancedComponent.displayName).toBe('withXAPI(Component)')

    const handleClose = jest.fn()
    const { getByTestId } = render(<EnhancedComponent id="id" onClose={handleClose} />)

    const wrappedComponent = getByTestId('button')
    expect(wrappedComponent).toBeDefined()

    fireEvent.click(wrappedComponent)
    expect(handleClose).toHaveBeenCalled()
  })

  it('', () => {
    const WrappedComponent = () => <div />
    const EnhancedComponent = withXAPI(WrappedComponent, {
      componentFilePath: 'path/to/component',
      componentType: 'component',
    })

    render(<EnhancedComponent id="id" />)

    expect(EnhancedComponent).toBeDefined()
    expect(EnhancedComponent.displayName).toBe('withXAPI(Component)')
  })
})
