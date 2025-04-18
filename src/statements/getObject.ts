import { StatementObject } from '@xapi/xapi'

/**
 * The type definition of ObjectProps.
 * Used to define the structure of the props for the getObject function.
 */
export type ObjectProps = {
  componentID: string
  componentType: string
  repository: string
}

/**
 * The getObject function.
 * Creates the object part of an xAPI statement.
 *
 * @param componentID - The ID of the component.
 * @param componentType - The type of the component.
 * @param repository - The URL to the component repository.
 * @returns A new instance of the object part of an xAPI statement.
 */
export const getObject = ({
  componentID,
  componentType,
  repository,
}: ObjectProps): StatementObject => {
  return {
    id: window.location.href.concat('#' + componentID),
    definition: {
      name: {
        en: componentType,
      },
      type: repository.concat(componentType),
    },
  }
}
