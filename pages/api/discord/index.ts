import type { NextApiHandler } from 'next'
import { apiHandler } from '@/utils/api'
import createHttpError from 'http-errors'

const _ENV = process.env.NODE_ENV as 'development' | 'production'

// https://oozio.medium.com/serverless-discord-bot-55f95f26f743
const bot: NextApiHandler = async (req, res) => {
  console.log(JSON.stringify(req))
  console.log(JSON.stringify(req.body, null, 2))
}

export default apiHandler({
  POST: bot
})