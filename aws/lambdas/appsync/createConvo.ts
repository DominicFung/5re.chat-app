import { AppSyncResolverEvent } from 'aws-lambda'

export const handler = async (event: AppSyncResolverEvent<{chatId: string}, null>) => {
  console.log(event)
  return { result: "OK" }
}