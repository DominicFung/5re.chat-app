import { AppSyncResolverEvent } from 'aws-lambda'

export const handler = async (event: AppSyncResolverEvent<{
  masterSecret: string, discordChannelId: string, message: string
}, null>) => {
  console.log(event)


}