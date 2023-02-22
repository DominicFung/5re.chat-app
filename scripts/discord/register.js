const { REST, Routes } = require("discord.js")
const { discord } = require('../../backend.secret.json')

let commands = [{
  "name": "r",
  "type": 1,
  "description": "replies to the customer on your website, via their 5re chat support convo.",
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