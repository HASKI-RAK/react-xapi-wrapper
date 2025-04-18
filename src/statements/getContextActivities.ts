import { Context, ContextActivity } from '@xapi/xapi'

/**
 * The type definition of ContextActivityProps.
 * Used to define the structure of the props for the getParent and getContextActivities functions.
 */
export type ContextActivityProps = {
  pageName: string
  repository: string
}

/**
 * The getParent function.
 * Creates the parent part of an xAPI statement.
 *
 * @param pageName - The name of the page.
 * @param repository - The URL to the page repository.
 * @returns A new instance of the parent part of an xAPI statement.
 */
export const getParent = ({ pageName, repository }: ContextActivityProps): ContextActivity[] => {
  return [
    {
      id: window.location.href,
      definition: {
        type: `${repository}${pageName}`,
        name: {
          en: pageName,
        },
      },
    },
  ]
}

/**
 * The getGrouping function.
 * Creates the grouping part of an xAPI statement.
 *
 * @param repository - The URL to the page repository.
 * @returns A new instance of the grouping part of an xAPI statement.
 */
export const getGrouping = (repository: ContextActivityProps['repository']): ContextActivity[] => {
  return [
    {
      id: window.location.origin,
      definition: {
        type: `${repository}Home`,
        name: {
          en: 'Home',
        },
      },
    },
  ]
}

/**
 * The getContextActivities function.
 * Creates the contextActivities part of an xAPI statement.
 *
 * @param pageName - The name of the page.
 * @param repository - The URL to the page repository.
 * @returns A new instance of the contextActivities part of an xAPI statement.
 */
export const getContextActivities = ({
  pageName,
  repository,
}: ContextActivityProps): Context['contextActivities'] => {
  if (window.location.pathname === '/') {
    return {
      parent: getGrouping(repository),
    }
  } else {
    return {
      parent: getParent({ pageName, repository }),
      grouping: getGrouping(repository),
    }
  }
}
