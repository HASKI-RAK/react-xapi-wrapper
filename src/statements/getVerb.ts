import { Verb } from '@xapi/xapi'

/**
 * The type definition of VerbProps.
 * Used to define the structure of the props for the getVerb function.
 */
export type VerbProps = {
  verbName: string
  repository: string
}

/**
 * The getVerb function.
 * Creates the verb part of an xAPI statement.
 *
 * @param verbName - The name of the verb.
 * @param repository - The URL to the verb repository.
 * @returns A new instance of the verb part of an xAPI statement.
 */
export const getVerb = ({ verbName, repository }: VerbProps): Verb => {
  return {
    id: repository.concat(verbName),
    display: {
      en: verbName,
    },
  }
}
