import { AppSyncResolverEvent } from 'aws-lambda'
import { DynamoDBClient, GetItemCommand, UpdateItemCommand } from '@aws-sdk/client-dynamodb'
import { unmarshall } from '@aws-sdk/util-dynamodb'

import { v4 as uuidv4 } from 'uuid'
import { _App, _Convo } from '../../../src/API'
import Iron from '@hapi/iron'

import { 
  ChannelType,
  Client as Discord, GatewayIntentBits, 
  Guild, TextChannel 
} from 'discord.js'
import { _Session } from '../types'


const CONVO_TABLE_NAME = process.env.CONVO_TABLE_NAME || ''
const SESSION_TABLE_NAME = process.env.SESSION_TABLE_NAME || ''

const DISCORD_TOKEN = process.env.DISCORD_TOKEN || ''

export const handler = async (event: AppSyncResolverEvent<{
  sessionToken: string, message: string
}, null>) => {
  console.log(event)
  const b = event.arguments
  if (!b) { console.error(`event.argument is empty`); return }
  if (!b.sessionToken) { console.error(`sessionToken is empty`); return }

  const dynamo = new DynamoDBClient({})
  const res0 = await dynamo.send(
    new GetItemCommand({
      TableName: SESSION_TABLE_NAME,
      Key: { sessionToken: { S: b.sessionToken } }
    })
  )
  console.log(res0)

  if (!res0 || !res0.Item) { console.error("sessionToken doesn't exist, may have timed out"); return }

  const session = unmarshall(res0.Item!) as _Session
  const convo = await Iron.unseal(b.sessionToken, session.unseal, Iron.defaults) as _Convo

  console.log(" === DISCORD TIME === ")
  console.log(DISCORD_TOKEN)

  const discord = new Discord({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  })
  discord.login(DISCORD_TOKEN)

  await new Promise<void>((resolve, reject) => {
    discord.once("error", reject)
    discord.once("ready", () => {
      discord.off("error", reject)
      resolve()
    })
  })

  console.log(`Discord Ready? ${discord.isReady()}`)
  let discordChannelId = convo.discordChannelId
  if (discordChannelId) {
    console.log(`No ChannelId found in _Convo ... creating`)

    const guild = discord.guilds.cache.get(convo.discordGuildId) as Guild

    /**
     * RANDOMLY GENERATED NAME?
     */
    const name = `Guest ${uuidv4()}`

    const channel = await guild.channels.create({name, type: ChannelType.GuildText })
    console.log(channel)

    discordChannelId = channel.id
    if (!discordChannelId) { console.error('discord channel id is empty'); return }

    const res1 = await dynamo.send(
      new UpdateItemCommand({
        TableName: CONVO_TABLE_NAME,
        Key: { convoId: { S: convo.convoId } },
        UpdateExpression: "set discordChannelId = :discordChannelId",
        ExpressionAttributeValues: { ":discordChannelId": { S: discordChannelId } }
      })
    )
    console.log(res1)
  }

  console.log(" === WRITE TO DISCORD === ")

  const channel = discord.channels.cache.get(discordChannelId) as TextChannel
  console.log(channel)
  if (!channel) { console.error(`channelId: ${discordChannelId} could not be found.`) }

  console.log(`channelId: ${channel.id}, type: ${channel.type}`)
  const r = await channel.send(b.message)
  console.log(r)
  console.log(" ==== WRITE COMPLETE ==== ")

  // write to db?
}