import BaseXAPI from '@xapi/xapi'
import { Versions } from '@xapi/xapi/dist/types/constants'

/**
 * The type definition of XAPIRepositories.
 * Used to define the structure of the repositories object in the XAPIConfig type.
 */
export type XAPIRepositories =
  | {
      component: string
      page: string
      verb: string
    }
  | string

/**
 * The type definition of XAPIConfig.
 * Used to define the structure of the configuration object for the XAPI instance.
 */
export type XAPIConfig = {
  currentLanguage?: string
  onError?: (error: string) => void
  projectURL: string
  projectVersion: string
  repositories: XAPIRepositories
  userID?: string
}

/**
 * The type definition of XAPI.
 * Extends the XAPIConfig type to include an instance of BaseXAPI.
 */
export type XAPI = XAPIConfig & { xAPI: BaseXAPI }

/**
 * The setupXAPI function.
 * Creates a new instance of XAPI with the given configuration.
 *
 * @param xAPI - The xAPI configuration object.
 * @param props - Additional properties to be passed to the XAPI instance.
 * @returns A new instance of XAPI with the given configuration.
 */
export const setupXAPI = ({
  xAPI,
  ...props
}: XAPIConfig & {
  xAPI: {
    auth: { username: string; password: string } | string
    endpoint: string
    version: Versions
  }
}): XAPI => ({
  ...props,
  xAPI: new BaseXAPI({
    auth:
      typeof xAPI.auth === 'string'
        ? xAPI.auth
        : BaseXAPI.toBasicAuth(xAPI.auth.username, xAPI.auth.password),
    endpoint: xAPI.endpoint,
    version: xAPI.version,
    adapter: 'fetch',
  }),
})
