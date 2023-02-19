import { AppSyncResolverEvent } from 'aws-lambda'
import { DynamoDBClient, PutItemCommand, QueryCommand } from '@aws-sdk/client-dynamodb'
import { unmarshall, marshall } from '@aws-sdk/util-dynamodb'

import { v4 as uuidv4 } from 'uuid'
import { Convo, _User } from '../../src/API'

import Iron from '@hapi/iron'

const USER_TABLE_NAME = process.env.USER_TABLE_NAME || ''
const CONVO_TABLE_NAME = process.env.CONVO_TABLE_NAME || ''

const KEYSTARTER = "5rc_"

export const handler = async (event: AppSyncResolverEvent<{apiKey: string}, null>) => {
  console.log(event)
  const b = event.arguments
  if (!b) { console.error(`event.argument is empty`); return }
  if (!b.apiKey) { console.error(`apiKey is empty.`); return }
  if (!b.apiKey.startsWith(KEYSTARTER)) { console.error(`apiKey doesn't start with ${KEYSTARTER}: ${b.apiKey}`); return }

  const apiKey = b.apiKey.replace(KEYSTARTER, "")

  const dynamo = new DynamoDBClient({})
  const res0 = await dynamo.send(
    new QueryCommand({
      TableName: USER_TABLE_NAME,
      IndexName: "apiKey",
      KeyConditionExpression: "apiKey = :key",
      ExpressionAttributeValues: { ":key": { S: apiKey } }
    })
  )

  if (!res0 || !res0.Count || res0.Count! <= 0 || !res0.Items) { 
    console.error(`could not find apiKey: ${apiKey}`); return }
  
  const user = unmarshall(res0.Items[0]!) as _User

  /** Create Convo on behalf of user */
  const now = new Date(Date.now())
  const messageToken = `5cmt_${uuidv4().replace(/-/g, "")}`
  const convo = {
    userId: user.userId,
    convoId: uuidv4(),
    apiKeyUsed: user.apiKey,
    sessionStartTime: now.toISOString(),

    messageToken, messages: []
  }
  console.log(`new convo: ${JSON.stringify(convo, null, 2)}`)

  const res1 = await dynamo.send(
    new PutItemCommand({
      TableName: CONVO_TABLE_NAME,
      Item: marshall(convo)
    })
  )
  console.log(res1)

  /** Encrypt */
  console.log(" === Encrypting Convo === ")
  console.log(` user.unseal ${user.unseal}`)
  const sessionToken = await Iron.seal(convo, user.unseal, Iron.defaults)
  
  return { sessionToken, messageToken } as Convo
}