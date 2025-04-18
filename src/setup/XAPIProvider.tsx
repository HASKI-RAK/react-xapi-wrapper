import { ReactNode, createContext } from 'react'
import { XAPI } from './setupXAPI'

/**
 * The XAPIContext context.
 * Used to provide the XAPI instance to the component tree.
 */
export const XAPIContext = createContext<XAPI | null>(null)

/**
 * The type definition of XAPIProviderProps.
 * Used to define the structure of the props for the XAPIProvider component.
 */
export type XAPIProviderProps = {
  children?: ReactNode
  value?: XAPI | null
}

/**
 * The XAPIProvider component.
 * Used to provide the XAPI instance to the all child components.
 *
 * @param children - The child components to be rendered inside the provider.
 * @param value - The XAPI instance to be provided to the child components.
 * @returns A new instance of the XAPI context provider with the given value.
 */
export const XAPIProvider = ({ children, value }: XAPIProviderProps) => (
  <XAPIContext.Provider value={value ?? null}>{children}</XAPIContext.Provider>
)
