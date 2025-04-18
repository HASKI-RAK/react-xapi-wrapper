import { useCallback, useContext, useMemo } from 'react'
import { XAPIContext } from '../setup/XAPIProvider'
import { StatementProps, getStatement } from '../statements/getStatement'

/**
 * The type definition of XAPIVerb.
 * Used to define the name of the verbs used in xAPI statements.
 */
export type XAPIVerb = 'clicked' | 'closed' | 'changed' | 'mouseMoved' | 'keyPressed'

/**
 * The type definition of XAPIComponentProps.
 * Used to define the structure of the components props for the useXAPI hook.
 */
export type XAPIComponentProps = {
  componentType?: string
  componentFilePath?: string
  pageName?: string
}

/**
 * The type definition of XAPIHookParams.
 * Used to define the structure of the parameters for the useXAPI hook.
 */
export type XAPIHookParams = {
  componentID?: string
} & XAPIComponentProps

/**
 * The type definition of XAPIHookReturn.
 * Used to define the structure of the return value for the useXAPI hook.
 */
export type XAPIHookReturn = {
  readonly sendStatement: (verb: XAPIVerb) => void
}

/**
 *
 * The useXAPI hook.
 * Used to create and send xAPI statements.
 *
 * @param componentID - The ID of the component to be used in the statement.
 * @param componentType - The type of the component to be used in the statement.
 * @param componentFilePath - The file path of the component to be used in the statement.
 * @param pageName - The name of the page to be used in the statement.
 * @returns A new instance of the useXAPI hook.
 */
export const useXAPI = (params?: XAPIHookParams): XAPIHookReturn => {
  const { componentID = '', componentType = '', componentFilePath = '', pageName } = params ?? {}

  // Context.
  const xAPIContext = useContext(XAPIContext)

  // Resolve the page name.
  const resolvedPageName = useMemo(
    () => pageName ?? window.location.pathname.split('/').filter(Boolean).pop() ?? '',
    [pageName],
  )

  /**
   * The sendStatement function.
   * Used to create and send xAPI statements.
   *
   * @param verbName - The name of the verb to be used in the statement.
   */
  const sendStatement = useCallback(
    (verbName: XAPIVerb) => {
      // Return if xAPIContext is null or user ID is not set.
      if (!xAPIContext || !xAPIContext.userID) return

      // Retrieve information from the xAPIContext.
      const {
        currentLanguage,
        onError = (error: string) => console.error(error),
        projectURL,
        projectVersion,
        repositories,
        userID,
        xAPI,
      } = xAPIContext

      // Create a statement object.
      const statement: StatementProps = {
        componentFilePath,
        componentID,
        componentType,
        currentLanguage,
        pageName: resolvedPageName,
        projectURL,
        projectVersion,
        repositories,
        userID,
        verbName,
      }

      // Send the statement.
      xAPI.sendStatement({ statement: getStatement(statement) }).catch((error: string) => {
        onError(error)
      })
    },
    [componentFilePath, componentID, componentType, xAPIContext],
  )

  return useMemo(() => ({ sendStatement }), [sendStatement])
}
