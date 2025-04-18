import { Context, ContextActivity } from '@xapi/xapi'

/**
 * The type definition of ContextProps.
 * Used to define the structure of the props for the getContext function.
 */
export type ContextProps = {
  contextActivities?: {
    parent?: ContextActivity[]
    grouping?: ContextActivity[]
    category?: ContextActivity[]
    her?: ContextActivity[]
  }
  currentLanguage?: string
  componentFilePath: string
  projectURL: string
  projectVersion: string
}

/**
 * The getContext function.
 * Creates the context part of an xAPI statement.
 *
 * @param componentFilePath - The file path of the component.
 * @param contextActivities - The context activities part of the xAPI statement.
 * @param currentLanguage - The language currently set by the user.
 * @param projectURL - The URL of the project on GitHub.
 * @param projectVersion - The current version of the project.
 * @returns A new instance of the context part of an xAPI statement.
 */
export const getContext = ({
  componentFilePath,
  contextActivities,
  currentLanguage = navigator.language,
  projectURL,
  projectVersion,
}: ContextProps): Context => {
  return {
    platform: 'Frontend',
    language: currentLanguage,
    extensions: {
      'https://lrs.learninglocker.net/define/extensions/info': {
        domain: window.location.origin,
        domain_version: projectVersion,
        github: projectURL,
        event_function: `src${componentFilePath}`,
      },
    },
    contextActivities: contextActivities,
  }
}
