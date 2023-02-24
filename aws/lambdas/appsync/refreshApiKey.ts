import { AppSyncResolverEvent } from 'aws-lambda'
import { GetSecretValueCommand, SecretsManagerClient } from '@aws-sdk/client-secrets-manager'
import { DynamoDBClient, GetItemCommand, UpdateItemCommand } from '@aws-sdk/client-dynamodb'
import { unmarshall } from '@aws-sdk/util-dynamodb'

import { v4 as uuidv4 } from 'uuid'
import { _App } from '../../../src/API'

const APP_TABLE_NAME = process.env.APP_TABLE_NAME || ''

export const handler = async (event: AppSyncResolverEvent<{
  masterSecret: string, appId: string
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

  const res0 = await dynamo.send(
    new GetItemCommand({
      TableName: APP_TABLE_NAME,
      Key: { appId: { S: b.appId } }
    })
  )
  if (!res0.Item) { console.error(); return }
  const app = unmarshall(res0.Item) as _App
  app.apiKey = uuidv4().replace(/-/g, "")

  const res2 = await dynamo.send(
    new UpdateItemCommand({
      TableName: APP_TABLE_NAME, 
      Key: { appId: { S: b.appId } },
      UpdateExpression: "set apiKey = :apiKey",
      ExpressionAttributeValues: { ":apiKey": { S: app.apiKey } } 
    })
  )
  console.log(res2)

  return app
}