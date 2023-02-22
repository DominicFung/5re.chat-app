import { APIGatewayEvent } from 'aws-lambda'
import nacl from 'tweetnacl'

const DISCORD_PUBLICKEY = process.env.DISCORD_PUBLICKEY || ''

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
    return {
      statusCode: 200,
      body: JSON.stringify({ "type": 1 }),
    }
  }

  if (body.data.name == 'r') {
    return JSON.stringify({
      "type": 4,
      "data": { "content": "bar" }
    })
  }

  return { statusCode: 404 }
}