import { AppSyncResolverEvent } from 'aws-lambda'
import { GetSecretValueCommand, SecretsManagerClient } from '@aws-sdk/client-secrets-manager'
import { DynamoDBClient, PutItemCommand, QueryCommand } from '@aws-sdk/client-dynamodb'
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'

import { v4 as uuidv4 } from 'uuid'
import { _User } from '../../src/API'

const USER_TABLE_NAME = process.env.USER_TABLE_NAME || ''

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
  
  if (!b.avatarUrl) { console.error(`event.arguments is empty`); return }
  if (!b.username) { console.error(`event.username is empty`); return }
  if (!b.githubId) { console.error(`event.githubId is empty`); return }

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

  if (!res0 || !res0.Count ) { console.error(`dynamo did not return a res0 for githubId`); return }
  if (res0.Count! > 0 && res0.Items) {
    console.log(" === USER ALREADY EXIST === ")

    const user = unmarshall(res0.Items[0]) as _User
    return user
  } else {
    const userId = uuidv4()
    const apiKey = uuidv4().replace(/-/g, "")
    
    /** 
     * NOTE! api keys should always start with: "5c_" 
     * But we don't store with that, because dynamo partition will not be effective.
     */
    const user = { 
      userId, apiKey, username: b.username, 
      avatarUrl: b.avatarUrl, githubId: b.githubId, 
      discordGuildId: "" 
    } as _User
    console.log(`new user: ${JSON.stringify(user, null, 2)}`)

    const res1 = await dynamo.send(
      new PutItemCommand({
        TableName: USER_TABLE_NAME,
        Item: marshall(user)
      })
    )
    console.log(res1)
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