// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler } from 'next'
import { apiHandler } from '@/utils/api'
import createHttpError from 'http-errors'

import { Amplify, API, graphqlOperation } from 'aws-amplify'
import { GraphQLResult } from "@aws-amplify/api"
import * as m from '@/src/graphql/mutations'

import frontendSecret from '@/frontend.secret.json'
import backendSecret from '@/backend.secret.json'
import { _User } from '@/src/API'
import awsConfig from '@/src/aws-exports'

import Iron from '@hapi/iron'
import { GithubUser, _UserCookie } from '@/types'

const _ENV = process.env.NODE_ENV as 'development' | 'production'

const authorize: NextApiHandler<_User> = async (req, res) => {
  const b = JSON.parse(req.body)

  console.log(JSON.stringify(b))
  console.log(`code: ${b.code}`)

  const r = {
    client_id: frontendSecret.github[_ENV].clientId,
    client_secret: backendSecret.github[_ENV].clientSecret,
    code: b.code,
  }
  console.log(JSON.stringify(r))

  const paramsString = await (await fetch(`https://github.com/login/oauth/access_token`, {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(r),
  })).text()

  console.log(paramsString)

  const params = new URLSearchParams(paramsString)
  if (!params) { throw new createHttpError.Unauthorized("Unauthorized") }
  
  const accessToken = params.get("access_token")
  console.log(`access token: ${accessToken}`)

  if (!accessToken) { throw new createHttpError.Unauthorized("Unauthorized") }
  const github = await (await fetch(`https://api.github.com/user`, {
    headers: {
      Authorization: `token ${accessToken}`,
    },
  })).json() as GithubUser

  console.log(github)
  if (!github) { throw new createHttpError.NotFound("Github user not found.") }
  console.log(`User from Github ${JSON.stringify(github, null, 2)}`)

  if (!github.html_url || !github.name) { throw new createHttpError.NotFound("Github user not found.") }
  Amplify.configure(awsConfig)

  // Create User
  const d = await API.graphql(graphqlOperation(m.createUser, {
    masterSecret: backendSecret.secret,
    username: github.name,
    avatarUrl: github.avatar_url,
    githubId: github.html_url.split("https://github.com/")[1]
  })) as GraphQLResult<{ createUser: _User}>

  const user = { ...d.data!.createUser, cookie: "" } as _UserCookie
  console.log(user)
  if (!d.data!.createUser) { throw new createHttpError.InternalServerError("d.data!.createUser not found.") }
  user.cookie = await Iron.seal(d.data!.createUser, backendSecret.seal, Iron.defaults)

  res.json(user)
}

export default apiHandler({
  POST: authorize
})
