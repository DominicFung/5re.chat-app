import { APIGatewayEvent } from 'aws-lambda'
import nacl from 'tweetnacl'

import { Amplify, API, graphqlOperation } from 'aws-amplify'
import { GraphQLResult } from "@aws-amplify/api"
import * as m from '../../../src/graphql/mutations'

import awsConfig from '../../../src/aws-exports'
import { Message } from '../../../src/API'

const DISCORD_PUBLICKEY = process.env.DISCORD_PUBLICKEY || ''
const MASTERKEY = process.env.MASTERKEY || ''

export const handler = async (event: APIGatewayEvent) => {
  console.log(event)

  // Discord Requirment 1. = Checking Signature
  const signature = event.headers['x-signature-ed25519']!
  const timestamp = event.headers['x-signature-timestamp']!
  const strBody = event.body!

  console.log(DISCORD_PUBLICKEY)
  console.log(signature)
  console.log(timestamp)
  console.log(strBody)

  const isVerified = nacl.sign.detached.verify(
    Buffer.from(timestamp + strBody),
    Buffer.from(signature, 'hex'),
    Buffer.from(DISCORD_PUBLICKEY, 'hex')
  );

  if (!isVerified) {
    return {
      statusCode: 401,
      body: JSON.stringify('invalid request signature'),
    };
  }

  // Discord Requirment 2. = Replying to ping
  const body = JSON.parse(strBody)
  if (body.type == 1) {
    return { statusCode: 200, body: JSON.stringify({ "type": 1 }) }
  }

  if (body.data.name == 'r') {
    console.log("we are in /r")
    console.log(JSON.stringify(awsConfig))
    console.log(`channelId: ${body.channel_id}`)
    console.log(`message: ${body.data.options[0].value}`)

    Amplify.configure(awsConfig)
    const d = await API.graphql(graphqlOperation(m.addOwnerMessage, {
      masterSecret: MASTERKEY,
      discordChannelId: body.channel_id,
      message: body.data.options[0].value
    })) as GraphQLResult<{ addOwnerMessage: Message}>

    console.log(JSON.stringify(d, null, 2))

    return { statusCode: 200, body: JSON.stringify({
      "type": 4, "data": { "content": `Sent "${body.data.options[0].value}"` 
    }}) }
  }

  return { statusCode: 404 }
}