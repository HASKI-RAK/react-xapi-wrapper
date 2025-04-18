import { Statement } from '@xapi/xapi'
import { XAPIRepositories } from '../setup/setupXAPI'
import { getActor } from './getActor'
import { getContext } from './getContext'
import { getContextActivities } from './getContextActivities'
import { getObject } from './getObject'
import { getVerb } from './getVerb'

/**
 * The type definition of StatementProps.
 * Used to define the structure of the props for the getStatement function.
 */
export type StatementProps = {
  componentFilePath: string
  componentID: string
  componentType: string
  currentLanguage?: string
  pageName: string
  projectURL: string
  projectVersion: string
  repositories: XAPIRepositories
  userID: string
  verbName: string
}

/**
 * The getStatement function.
 * Creates an xAPI statement.
 *
 * @param componentFilePath - The file path of the component.
 * @param componentID - The ID of the component.
 * @param componentType - The type of the component.
 * @param currentLanguage - The language currently set by the user.
 * @param pageName - The name of the page.
 * @param projectURL - The URL of the project on GitHub.
 * @param projectVersion - The current version of the project.
 * @param repositories - The repositories of the project.
 * @param userID - The ID of the current user.
 * @param verbName - The name of the verb.
 * @returns A new instance of an xAPI statement.
 */
export const getStatement = ({
  componentFilePath,
  componentID,
  componentType,
  currentLanguage,
  pageName,
  projectURL,
  projectVersion,
  repositories,
  userID,
  verbName,
}: StatementProps): Statement => {
  return {
    actor: getActor({ userID }),
    verb: getVerb({
      verbName,
      repository: typeof repositories == 'string' ? repositories : repositories.verb,
    }),
    object: getObject({
      componentID,
      componentType,
      repository: typeof repositories == 'string' ? repositories : repositories.component,
    }),
    context: getContext({
      contextActivities: getContextActivities({
        pageName,
        repository: typeof repositories == 'string' ? repositories : repositories.page,
      }),
      currentLanguage,
      componentFilePath,
      projectURL,
      projectVersion,
    }),
    timestamp: new Date().toISOString().replace('Z', '+00:00'),
  }
}
