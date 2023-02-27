import { AppSyncResolverEvent } from 'aws-lambda'
import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb'
import { unmarshall } from '@aws-sdk/util-dynamodb'
import { Message, _App, _Convo } from '../../../src/API'

import md5 from 'md5'

const MASTERKEY = process.env.MASTERKEY || ''
const CONVO_TABLE_NAME = process.env.CONVO_TABLE_NAME || ''

export const handler = async (event: AppSyncResolverEvent<{
  masterSecret: string, discordChannelId: string, message: string
}, null>) => {
  console.log(event)

  console.log(event)
  const b = event.arguments
  if (!b) { console.error(`event.arguments is empty`); return }

  if (b.masterSecret !== MASTERKEY) { 
    console.error(`the following secret was supplied: ${b.masterSecret}`); return }

  if (!b.discordChannelId) { console.error(`b.discordChannelId is empty`); return }
  if (!b.message) { console.error(`b.message is empty`); return }

  const dynamo = new DynamoDBClient({})

  const res0 = await dynamo.send(
    new QueryCommand({
      TableName: CONVO_TABLE_NAME,
      IndexName: 'discordChannelId',
      KeyConditionExpression: "discordChannelId = :key",
      ExpressionAttributeValues: { ":key": { S: b.discordChannelId } }
    })
  )
  console.log(res0)

  if (!res0) { console.error(`dynamo did not return a res0 for discordChannelId`); return }
  if (!res0.Items || res0.Items.length !== 1) {
    console.error(`discordChannelId does not exist || more than 1 convo as uses the same discord channel: ${res0.Items?.length}`); return
  }

  const convo = unmarshall(res0.Items[0]) as _Convo
  console.log(JSON.stringify(convo))

  const message = {
    hash: md5(convo.convoId),
    message: b.message
  } as Message
  console.log(JSON.stringify(message))

  return message
}