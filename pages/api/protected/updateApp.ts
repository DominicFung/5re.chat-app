import type { NextApiHandler } from 'next'

import { Amplify, API, graphqlOperation } from 'aws-amplify'
import { GraphQLResult } from "@aws-amplify/api"
import * as m from '@/src/graphql/mutations'

import { _App, _User } from '@/src/API'
import backendSecret from '@/backend.secret.json'
import awsConfig from '@/src/aws-exports'
import createHttpError from 'http-errors'
import { apiHandler } from '@/utils/api'

import Iron from '@hapi/iron'

const handler: NextApiHandler<_App> = async (req, res) => {
  const token = req.cookies.token
  const b = JSON.parse(req.body) as { appId: string, 
    discordGuildId?: string, appName?: string, active?: boolean, sessionTimeout?: number }
  
  console.log(token)
  if (!token || token == "undefined") { throw createHttpError.Unauthorized() }

  console.log(JSON.stringify(b, null, 2))
  if (!b || !b.appId) { throw createHttpError.BadRequest() }

  const user = await Iron.unseal(token, backendSecret.seal, Iron.defaults) as _User
  if (!user || !user.userId || !user.apps) { throw createHttpError.Unauthorized() }
  console.log(user)

  let appOwner = false
  for (const a of user.apps) {
    if (a?.appId === b.appId) { appOwner = true; break }
  }

  if (!appOwner) { throw createHttpError.Unauthorized() }
  Amplify.configure(awsConfig)

  let cc = 0
  let update = { masterSecret: backendSecret.secret, appId: b.appId } as any
  if (b.discordGuildId) { update.discordGuildId = b.discordGuildId; cc++ }
  if (b.appName) { update.appName = b.appName; cc++ }
  if (b.active || b.active === false) { update.active = b.active; cc++ }
  if (b.sessionTimeout) { update.sessionTimeout = b.sessionTimeout; cc++ }

  if (cc === 0) { console.error("no change requested."); throw new createHttpError.BadRequest() }

  // Update App
  const d = await API.graphql(graphqlOperation(m.updateApp, update)) as GraphQLResult<{ updateApp: _App}>
  if (!d.data!.updateApp) { throw new createHttpError.InternalServerError("!d.data!.updateApp not found.") }
  
  res.json(d.data!.updateApp)
}

export default apiHandler({
  POST: handler
})