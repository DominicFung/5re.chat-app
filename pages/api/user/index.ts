import type { NextApiHandler } from 'next'
import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb'
import { unmarshall } from '@aws-sdk/util-dynamodb'

import Iron from '@hapi/iron'
import { apiHandler } from '@/utils/api'
import createHttpError from 'http-errors'

import backendSecret from '@/backend.secret.json'
import cdk from '@/cdk-outputs.json'
import { _App, _User } from '@/src/API'
import { _UserCookie } from '@/types'
import { _FlatUser } from '@/aws/lambdas/types'

const PROJECT = "fireChat"

const authorize: NextApiHandler<_UserCookie|{message: string}> = async (req, res) => {
  const token = req.cookies.token
  if (!token || token == "undefined") { res.json({message: "No Cookie Found"}); return }
  console.log(`token: ${token}`)
  console.log(!token)

  const ouser = await Iron.unseal(token, backendSecret.seal, Iron.defaults) as _User
  if (!ouser.userId || !ouser.githubId || !ouser.avatarUrl ) { throw new createHttpError.BadRequest("Forged Cookie Detected.") }

  /** Update User; change to IAM role after development? */
  const dynamo = new DynamoDBClient({
    credentials: {
      accessKeyId: cdk[`${PROJECT}-IamStack`][`${PROJECT}AccessKeyId`], 
      secretAccessKey: cdk[`${PROJECT}-IamStack`][`${PROJECT}SecretKey`]
    },
    region: 'us-east-1'
  })

  const res0 = await dynamo.send(
    new GetItemCommand({
      TableName: cdk[`${PROJECT}-DynamoStack`][`${PROJECT}UserTableName`],
      Key: { userId: { S: ouser.userId } }
    })
  )

  if (!res0.Item) { throw createHttpError.NotFound("User not found.") }
  const fuser = unmarshall(res0.Item) as _FlatUser
  console.log(fuser)
  
  const nuser = { ...fuser, apps:[] } as _User
  for (const i of fuser.apps) {
    const res1 = await dynamo.send(
      new GetItemCommand({
        TableName: cdk[`${PROJECT}-DynamoStack`][`${PROJECT}UserAppsTableName`],
        Key: { appId: { S: i } }
      })
    )
    if (!res1.Item) { continue }
    nuser.apps.push(unmarshall(res1.Item) as _App)
  }
  
  const user = {
    ...nuser, cookie: ""
  } as _UserCookie

  user.cookie = await Iron.seal(ouser, backendSecret.seal, Iron.defaults)
  res.json(user)
}

export default apiHandler({
  GET: authorize
})