import { AppSyncResolverEvent } from 'aws-lambda'
import { GetSecretValueCommand, SecretsManagerClient } from '@aws-sdk/client-secrets-manager'
import { DynamoDBClient, GetItemCommand, PutItemCommand, UpdateItemCommand } from '@aws-sdk/client-dynamodb'
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'

import { v4 as uuidv4 } from 'uuid'
import { _FlatUser } from '../types'
import { _App, _User } from '../../../src/API'

const USER_TABLE_NAME = process.env.USER_TABLE_NAME || ''
const APP_TABLE_NAME = process.env.APP_TABLE_NAME || ''

export const handler = async (event: AppSyncResolverEvent<{
  masterSecret: string, userId: string, addApp?: string
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

  if (!b.userId) { console.error(`b.userId is empty`); return }

  const dynamo = new DynamoDBClient({})
  const res0 = await dynamo.send(
    new GetItemCommand({
      TableName: USER_TABLE_NAME,
      Key: { userId: { S: b.userId } }
    })
  )

  if (!res0.Item) { console.error(`no user with id: ${b.userId}`); return }
  let flatUser = unmarshall(res0.Item!) as _FlatUser
  const apps = flatUser.apps

  const app = {
    appId: uuidv4(),
    userId: b.userId,
    appName: b.addApp || "default",
    apiKey: uuidv4().replace(/-/g, ""),
    unseal: uuidv4().replace(/-/g, ""),
    discordGuildId: "",
    sessionTimeout: 48,
    active: false
  } as _App

  const res1 = await dynamo.send(
    new PutItemCommand({
      TableName: APP_TABLE_NAME,
      Item: marshall(app)
    })
  )
  console.log(res1)
  flatUser.apps.push(app.appId)

  const u = marshall(flatUser)
  console.log(u)
  const res2 = await dynamo.send(
    new UpdateItemCommand({
      TableName: USER_TABLE_NAME, 
      Key: { userId: { S: b.userId } },
      UpdateExpression: "set apps = :apps",
      ExpressionAttributeValues: { ":apps": u.apps } 
    })
  )
  console.log(res2)

  const user = {
    ...flatUser, apps: [app]
  } as _User

  for (const i of apps) {
    const res3 = await dynamo.send(
      new GetItemCommand({
        TableName: APP_TABLE_NAME,
        Key: { appId: { S: i } }
      })
    )
    console.log(res3)
    if (!res3.Item) { console.warn(`Unable to find app: ${i}. There may be a missmatch`); continue }    
    const a = unmarshall(res3.Item!) as _App
    user.apps.push(a)
  }

  console.log(user)
  return user
}