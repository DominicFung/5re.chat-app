
import type { NextApiHandler } from 'next'
import { apiHandler } from '../../../utils/api'
import createHttpError from 'http-errors'

import { API, graphqlOperation } from 'aws-amplify'
import { GraphQLResult } from "@aws-amplify/api"
import * as m from '@/src/graphql/mutations'

import backendSecret from '@/backend.secret.json'
import { User, _User } from '@/src/API'

const getUser: NextApiHandler<_User> = async (req, res) => {
  const b = JSON.parse(req.body) as { userId: string }
  console.log(b)
}

export default apiHandler({ 
  GET: getUser
})



