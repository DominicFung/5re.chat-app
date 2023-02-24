import { AppSyncResolverEvent } from 'aws-lambda'
import { GetSecretValueCommand, SecretsManagerClient } from '@aws-sdk/client-secrets-manager'
import { AttributeValue, DynamoDBClient, GetItemCommand, UpdateItemCommand } from '@aws-sdk/client-dynamodb'
import { sleep } from '../util'

import { _App } from '../../../src/API'
import { unmarshall } from '@aws-sdk/util-dynamodb'

const APP_TABLE_NAME = process.env.APP_TABLE_NAME || ''

export const handler = async (event: AppSyncResolverEvent<{
  masterSecret: string, appId: string, 
  discordGuildId?: string, appName?: string, active?: boolean, sessionTimeout?: number
}, null>) => {
  console.log(event)
  const b = event.arguments
  if (!b) { console.error(`event.argument is empty`); return }

  const smc = new SecretsManagerClient({})
  const command = new GetSecretValueCommand({
    SecretId: "firechat/bsecret"
  })
  const rawsecret = (await smc.send(command)).SecretString
  if (!rawsecret) { console.error(`raw secret is empty.`); return }
  const secret = JSON.parse(rawsecret) as { secret: string }

  if (b.masterSecret !== secret.secret) { 
    console.error(`the following secret was supplied: ${b.masterSecret}`); return }

  if (!b.appId) { console.error(`b.appId is empty`); return }

  const dynamo = new DynamoDBClient({})

  let exString = ""
  let exAttribute = {} as {[k:string]: AttributeValue }

  let o = "appName"
  if (b.appName) {
    exString = `set ${o} = :${o}`
    exAttribute[`:${o}`] = { S: b[o as "appName"]! }
  }

  o = "discordGuildId"
  if (b.discordGuildId) {
    if (exString === "") exString = `set ${o} = :${o}`
    else exString = `${exString}, ${o} = :${o}`
    exAttribute[`:${o}`] = { S: b[o as "discordGuildId"]! }
  }

  o = "active"
  if (b.discordGuildId) {
    if (exString === "") exString = `set ${o} = :${o}`
    else exString = `${exString}, ${o} = :${o}`
    exAttribute[`:${o}`] = { BOOL: b[o as "active"]! }
  }

  o = "sessionTimeout"
  if (b.discordGuildId) {
    if (exString === "") exString = `set ${o} = :${o}`
    else exString = `${exString}, ${o} = :${o}`
    exAttribute[`:${o}`] = { N: b[o as "sessionTimeout"]!.toString() }
  }

  console.log(exString)
  console.log(JSON.stringify(exAttribute))

  const res1 = await dynamo.send(
    new UpdateItemCommand({
      TableName: APP_TABLE_NAME,
      Key: { appId: { S: b.appId } },
      UpdateExpression: exString,
      ExpressionAttributeValues: exAttribute
    })
  )
  console.log(res1)

  await sleep(500)

  const res2 = await dynamo.send(
    new GetItemCommand({
      TableName: APP_TABLE_NAME,
      Key: { appId: { S: b.appId } }
    })
  )

  if (!res2.Item) { console.error(); return }
  return unmarshall(res2.Item) as _App
}