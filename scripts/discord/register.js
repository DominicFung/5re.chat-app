const { REST, Routes } = require("discord.js")
const { discord } = require('../../backend.secret.json')

//https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types
let commands = [{
  "name": "r",
  "type": 1,
  "description": "Replies to the customer on your website, via their 5re chat support convo.",
  "options": [{
    "name": "message",
    "description": "The message you want to convey.",
    "required": true,
    "type": 3 // string
  }]
}]

const rest = new REST({ version: '10' }).setToken(discord.token);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`)
		const data = await rest.put(
			Routes.applicationCommands(discord.applicationId),
			{ body: commands }
		)
		console.log(`Successfully reloaded ${data.length} application (/) commands.`)
	} catch (error) {
		console.error(error);
	}
})()