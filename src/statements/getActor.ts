import { Actor } from '@xapi/xapi'

/**
 * The type definition of ActorProps.
 * Used to define the structure of the props for the getActor function.
 */
export type ActorProps = {
  userID: string
}

/**
 * The getActor function.
 * Creates the actor part of an xAPI statement.
 *
 * @param userID - The ID of the current user.
 * @returns A new instance of the actor part of an xAPI statement.
 */
export const getActor = ({ userID }: ActorProps): Actor => {
  return {
    account: {
      homePage: window.location.origin,
      name: userID,
    },
  }
}
