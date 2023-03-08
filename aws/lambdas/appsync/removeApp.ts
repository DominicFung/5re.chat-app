import { AppSyncResolverEvent } from 'aws-lambda'
import { GetSecretValueCommand, SecretsManagerClient } from '@aws-sdk/client-secrets-manager'
import { DeleteItemCommand, DynamoDBClient, GetItemCommand, UpdateItemCommand } from '@aws-sdk/client-dynamodb'
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'
import { _App, _User } from '../../../src/API'
import { _FlatUser } from '../types'

const USER_TABLE_NAME = process.env.USER_TABLE_NAME || ''
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
  if (!res0.Item) { console.error(`app: ${b.appId} not found`); return }
  const app = unmarshall(res0.Item) as _App

  if (!app.userId) { console.error(`missing userId in app def`); return }
  const res1 = await dynamo.send(
    new GetItemCommand({
      TableName: USER_TABLE_NAME,
      Key: { userId: { S: app.userId } }
    })
  )
  if (!res1.Item) { console.error(`user: ${app.userId} not found`); return }
  const flatUser = unmarshall(res1.Item) as _FlatUser

  flatUser.apps = flatUser.apps.filter(item => item !== b.appId)
  if (flatUser.apps.length === 0) { console.error("Each user must have at least 1 app"); return }
  
  console.log(JSON.stringify(flatUser))
  const u = marshall(flatUser)
  console.log(JSON.stringify(u))

  const res2 = await dynamo.send(
    new UpdateItemCommand({
      TableName: USER_TABLE_NAME, 
      Key: { userId: { S: app.userId } },
      UpdateExpression: "set apps = :apps",
      ExpressionAttributeValues: { ":apps": u.apps } 
    })
  )
  console.log(res2)

  const res3 = await dynamo.send(
    new DeleteItemCommand({
      TableName: APP_TABLE_NAME,
      Key: { appId: { S: b.appId } }
    })
  )
  console.log(res3)

  const user = {
    ...flatUser, apps: []
  } as _User

  for (const i of flatUser.apps) {
    const res4 = await dynamo.send(
      new GetItemCommand({
        TableName: APP_TABLE_NAME,
        Key: { appId: { S: i } }
      })
    )
    console.log(res4)
    if (!res4.Item) { console.warn(`Unable to find app: ${i}. There may be a missmatch`); continue }    
    const a = unmarshall(res4.Item!) as _App
    user.apps.push(a)
  }

  console.log(user)
  return user
}