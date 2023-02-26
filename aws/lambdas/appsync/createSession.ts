import { AppSyncResolverEvent } from 'aws-lambda'
import { DynamoDBClient, PutItemCommand, QueryCommand } from '@aws-sdk/client-dynamodb'
import { unmarshall, marshall } from '@aws-sdk/util-dynamodb'

import { v4 as uuidv4 } from 'uuid'
import { Convo, _App, _Convo, _User } from '../../../src/API'

import Iron from '@hapi/iron'
import { _Session } from '../types'

const APP_TABLE_NAME = process.env.APP_TABLE_NAME || ''
const CONVO_TABLE_NAME = process.env.CONVO_TABLE_NAME || ''
const SESSION_TABLE_NAME = process.env.SESSION_TABLE_NAME || ''

const KEYSTARTER = "5rc_"

export const handler = async (event: AppSyncResolverEvent<{apiKey: string}, null>) => {
  console.log(event)
  const b = event.arguments
  if (!b) { console.error(`event.argument is empty`); return }
  if (!b.apiKey) { console.error(`apiKey is empty`); return }
  if (!b.apiKey.startsWith(KEYSTARTER)) { console.error(`apiKey doesn't start with ${KEYSTARTER}: ${b.apiKey}`); return }


  /** Check if APIKEY is valid */
  const apiKey = b.apiKey.replace(KEYSTARTER, "")

  const dynamo = new DynamoDBClient({})
  const res0 = await dynamo.send(
    new QueryCommand({
      TableName: APP_TABLE_NAME,
      IndexName: "apiKey",
      KeyConditionExpression: "apiKey = :key",
      ExpressionAttributeValues: { ":key": { S: apiKey } }
    })
  )

  if (!res0 || !res0.Count || res0.Count! <= 0 || !res0.Items) { 
    console.error(`could not find apiKey: ${apiKey}`); return }
  
  const app = unmarshall(res0.Items[0]!) as _App

  /** Create Convo on behalf of user */
  const now = new Date(Date.now())
  const messageToken = `5cmt_${uuidv4().replace(/-/g, "")}`

  const convo = {
    __typename: "_Convo",
    appId: app.appId,
    convoId: uuidv4(),

    discordGuildId: app.discordGuildId,
    apiKeyUsed: b.apiKey,
    
    sessionStartTime: now.toISOString(),
    messageToken, messages: [],
    discordChannelId: ""
  } as _Convo
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
  console.log(` user.unseal ${app.unseal}`)
  const sessionToken = await Iron.seal(convo, app.unseal, Iron.defaults)

  /** Create Session Cache on Dynamo */
  let today = new Date()
  today.setHours(today.getHours() + app.sessionTimeout)
  const session = {
    sessionToken: sessionToken,
    unseal: app.unseal, // .replace(/^Fe26.2\*\*/g, "")
    ttl: today.getTime() / 1000
  } as _Session

  const res2 = await dynamo.send(
    new PutItemCommand({
      TableName: SESSION_TABLE_NAME,
      Item: marshall(session)
    })
  )
  console.log(res2)

  return { sessionToken, messageToken } as Convo
}