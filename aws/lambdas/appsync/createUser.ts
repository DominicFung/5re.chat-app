import { AppSyncResolverEvent } from 'aws-lambda'
import { GetSecretValueCommand, SecretsManagerClient } from '@aws-sdk/client-secrets-manager'
import { DynamoDBClient, GetItemCommand, PutItemCommand, QueryCommand, UpdateItemCommand } from '@aws-sdk/client-dynamodb'
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'

import { v4 as uuidv4 } from 'uuid'
import { _User, _App } from '../../../src/API'
import { _FlatUser } from '../types'

const USER_TABLE_NAME = process.env.USER_TABLE_NAME || ''
const APP_TABLE_NAME = process.env.APP_TABLE_NAME || ''

export const handler = async (event: AppSyncResolverEvent<{
  masterSecret: string, username: string, avatarUrl: string, githubId: string
}, null>) => {
  console.log(event)
  const b = event.arguments
  if (!b) { console.error(`event.arguments is empty`); return }

  const smc = new SecretsManagerClient({})
  const command = new GetSecretValueCommand({
    SecretId: "firechat/bsecret"
  })
  const rawsecret = (await smc.send(command)).SecretString
  if (!rawsecret) { console.error(`raw secret is empty.`); return }
  const secret = JSON.parse(rawsecret) as { secret: string }

  if (b.masterSecret !== secret.secret) { 
    console.error(`the following secret was supplied: ${b.masterSecret}`); return }
  
  if (!b.avatarUrl) { console.error(`b.avatarUrl is empty`); return }
  if (!b.username) { console.error(`b.username is empty`); return }
  if (!b.githubId) { console.error(`b.githubId is empty`); return }

  const dynamo = new DynamoDBClient({})

  /** Check githubId, to see if user already exists */
  const res0 = await dynamo.send(
    new QueryCommand({
      TableName: USER_TABLE_NAME,
      IndexName: "githubId",
      KeyConditionExpression: "githubId = :key",
      ExpressionAttributeValues: { ":key": { S: b.githubId } }
    })
  )

  if (!res0) { console.error(`dynamo did not return a res0 for githubId`); return }
  if (res0.Count! > 0 && res0.Items) {
    console.log(" === USER ALREADY EXIST === ")
    const flatuser = unmarshall(res0.Items[0]) as _FlatUser

    let exString = ""
    let exAttribute = {} as {[k:string]: { S: string } }

    console.log("Updating User ... ")
    for (const o of Object.keys(flatuser)) {
      if (o === "userId" || o === "apps") continue
      else if (o === 'githubId' || o === 'username' || o === 'avatarUrl') {
        if (exString === "") exString = `set ${o} = :${o}`
        else exString = `${exString}, ${o} = :${o}`
        exAttribute[`:${o}`] = { S: flatuser[o] }
      }
    }

    console.log(exString)
    console.log(JSON.stringify(exAttribute))

    const res1 = await dynamo.send(
      new UpdateItemCommand({
        TableName: USER_TABLE_NAME,
        Key: { userId: { S: flatuser.userId } },
        UpdateExpression: exString,
        ExpressionAttributeValues: exAttribute
      })
    )
    console.log(res1)
    console.log(flatuser)

    /** Hytrade user */
    const user = { ...flatuser, apps: [] as _App[] }
    for (const appId of flatuser.apps) {
      console.log(`looking for appId: ${appId}`)
      const res2 = await dynamo.send(
        new GetItemCommand({
          TableName: APP_TABLE_NAME,
          Key: { appId: { S: appId } }
        })
      )

      console.log(res2)
      if (res2.Item) user.apps.push(unmarshall(res2.Item!) as _App)
    }

    console.log(JSON.stringify(user))
    return user
  } else {    
    /** 
     * NOTE! api keys should always start with: "5rc_" 
     * But we don't store with that, because dynamo partition will not be effective.
     */
    const userId = uuidv4()
    const app = {
      appId: uuidv4(),
      userId: userId,
      appName: "default",
      apiKey: uuidv4().replace(/-/g, ""),
      unseal: uuidv4().replace(/-/g, ""),
      discordGuildId: "",
      sessionTimeout: 48,
      active: false
    } as _App

    console.log(app)

    const flatUser = {
      userId: userId,
      githubId: b.githubId,
      username: b.username,
      avatarUrl: b.avatarUrl,
      apps: [ app.appId ]
    } as _FlatUser

    const res1 = await dynamo.send(
      new PutItemCommand({
        TableName: USER_TABLE_NAME,
        Item: marshall(flatUser)
      })
    )
    console.log(res1)

    const res2 = await dynamo.send(
      new PutItemCommand({
        TableName: APP_TABLE_NAME,
        Item: marshall(app)
      })
    )
    console.log(res2)

    const user = {
      ...flatUser,
      apps:[app]
    } as _User

    console.log(`new app: ${JSON.stringify(app, null, 2)}`)
    console.log(`new user: ${JSON.stringify(user, null, 2)}`)

    return user
  }
}

/**
{
  arguments: {
    ...
  },
  identity: null,
  source: null,
  request: {
    headers: {
      'x-forwarded-for': '192.0.169.110, 15.158.17.78',
      'cloudfront-is-tablet-viewer': 'false',
      'cloudfront-viewer-country': 'CA',
      'x-amzn-requestid': '001834d3-4e85-4740-a122-9200f96aecc2',
      via: '1.1 fa19153a28b66c7bbfaddbf2e4a92f90.cloudfront.net (CloudFront)',
      'x-api-key': 'da2-ifbyeocwk5cibolzyrqu7kopse',
      'cloudfront-forwarded-proto': 'https',
      'content-type': 'application/json; charset=UTF-8',
      'x-amzn-trace-id': 'Root=1-63f0e746-011970b15ff4b5b87f1c2a35',
      'x-amz-cf-id': 'ALHxABEZu0qLZ3b8oyrXiN63ua-gZ8QYHxYLRxkfvSvSEwALyYOx6w==',
      'content-length': '532',
      'x-amz-user-agent': 'aws-amplify/5.0.14 js',
      'x-forwarded-proto': 'https',
      host: 'im4tja2sxnbfnbt2bofoki336a.appsync-api.us-east-1.amazonaws.com',
      'user-agent': 'axios/0.26.0',
      'cloudfront-is-desktop-viewer': 'true',
      accept: 'application/json, text/plain,',
      'cloudfront-is-mobile-viewer': 'false',
      'x-forwarded-port': '443',
      'cloudfront-is-smarttv-viewer': 'false',
      'cloudfront-viewer-asn': '5645'
    },
    domainName: null
  },
  prev: null,
  info: {
    selectionSetList: [ 'userId', 'apiKey', 'username', 'avatarUrl', 'discordGuildId' ],
    selectionSetGraphQL: '{\n  userId\n  apiKey\n  username\n  avatarUrl\n  discordGuildId\n}',
    fieldName: 'createUser',
    parentTypeName: 'Mutation',
    variables: {
      ...
    }
  },
  stash: {}
}
 */