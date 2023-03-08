import { NextApiHandler } from "next"

import { Amplify, API, graphqlOperation } from 'aws-amplify'
import { GraphQLResult } from "@aws-amplify/api"
import * as m from '@/src/graphql/mutations'

import { _App, _User } from '@/src/API'
import backendSecret from '@/backend.secret.json'
import awsConfig from '@/src/aws-exports'
import createHttpError from 'http-errors'
import { apiHandler } from '@/utils/api'

import Iron from '@hapi/iron'
import { _UserCookie } from "@/types"

const handler: NextApiHandler<_UserCookie> = async (req, res) => {
  const token = req.cookies.token
  const b = JSON.parse(req.body) as { appName: string }

  console.log(token)
  if (!token || token == "undefined") { throw createHttpError.Unauthorized() }

  console.log(JSON.stringify(b, null, 2))
  if (!b || !b.appName) { throw createHttpError.BadRequest() }

  const user = await Iron.unseal(token, backendSecret.seal, Iron.defaults) as _User
  if (!user || !user.userId) { throw createHttpError.Unauthorized() }

  Amplify.configure(awsConfig)

  const create = { masterSecret: backendSecret.secret, userId: user.userId, appName: b.appName }
  const d = await API.graphql(graphqlOperation(m.addApp, create)) as GraphQLResult<{ addApp: _User}>
  if (!d.data!.addApp) { throw new createHttpError.InternalServerError("!d.data!.addApp not found.") }
  
  const u = {
    cookie: await Iron.seal(d.data!.addApp, backendSecret.seal, Iron.defaults),
    ...d.data!.addApp
  } as _UserCookie
  console.log(JSON.stringify(u, null, 2))

  res.json(u)
}

export default apiHandler({
  POST: handler
})