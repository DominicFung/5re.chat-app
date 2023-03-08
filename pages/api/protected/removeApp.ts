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
  const b = JSON.parse(req.body) as { appId: string }

  console.log(token)
  if (!token || token == "undefined") { throw createHttpError.Unauthorized() }

  console.log(JSON.stringify(b, null, 2))
  if (!b || !b.appId) { throw createHttpError.BadRequest() }

  const user = await Iron.unseal(token, backendSecret.seal, Iron.defaults) as _User
  if (!user || !user.userId) { throw createHttpError.Unauthorized() }
  console.log(user)

  let appOwner = false
  for (const a of user.apps) {
    if (a?.appId === b.appId) { appOwner = true; break }
  }

  if (!appOwner) { throw createHttpError.Unauthorized() }
  Amplify.configure(awsConfig)

  const del = { masterSecret: backendSecret.secret, appId: b.appId }
  const d = await API.graphql(graphqlOperation(m.removeApp, del)) as GraphQLResult<{ removeApp: _User}>
  if (!d.data!.removeApp) { throw new createHttpError.InternalServerError("!d.data!.removeApp not found.") }

  const u = {
    cookie: await Iron.seal(d.data!.removeApp, backendSecret.seal, Iron.defaults),
    ...d.data!.removeApp
  } as _UserCookie
  console.log(JSON.stringify(u, null, 2))
  
  res.json(u)
}

export default apiHandler({
  DELETE: handler
})