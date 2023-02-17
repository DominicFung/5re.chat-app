// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler } from 'next'
import { apiHandler } from '../../utils/api'

import secret from '../../secret.json'
import createHttpError from 'http-errors'

type Data = {
  user: any
}

const authorize: NextApiHandler<Data> = async (req, res) => {
  const b = JSON.parse(req.body)

  console.log(JSON.stringify(b))
  console.log(`code: ${b.code}`)

  // const data = new FormData();
  // data.append("client_id", secret.github.clientId)
  // data.append("client_secret", secret.github.clientSecret)
  // data.append("code", b.code)
  // data.append("redirect_uri", secret.github.redirectUri)

  const r = {
    client_id: secret.github.clientId,
    client_secret: secret.github.clientSecret,
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

  const user = await (await fetch(`https://api.github.com/user`, {
    headers: {
      Authorization: `token ${accessToken}`,
    },
  })).json()

  console.log(user)
  res.json(user)
}

export default apiHandler({
  POST: authorize
})
