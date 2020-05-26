const { Client } = require('discord.js')

config = require('entasia/config')
bot = new Client({ disableMentions: "all" })
bot.login(require("entasia/token"))
.catch((err)=>{throw err});
	
if(config.dev){
	socket = {}
	socket.listen = ()=>{}
}else socket = require('entasia/Socket')
functions = require('entasia/GlobalAPI').functions
databases = require('entasia/Databases')
CustomEmbed = require('entasia/CustomEmbed')

vars = {}
vars.onlines = {}
vars.totalonlines = []

logger("Démarrage du bot..")

bot.on("ready", async function(){
	logger("Bot connecté !")
	logger("Nom : "+bot.user.tag)
	logger("Activation des fonctionnalités..")

	config.entasia = bot.guilds.cache.get(config.entasia)
	config.owner = bot.users.cache.get(config.owner)
	
	for(let [k, v] of bot.guilds.cache){
		if(k!=config.entasia.id){
			logger("Discord "+v.name+" quitté")
			v.leave()
		}
	}

	for(let i in config.channels){
		config.channels[i] = config.entasia.channels.cache.get(config.channels[i])
		if(!config.channels[i])logger("Erreur lors de la récupération de "+i+" !")
	}
	for(let i in config.roles){
		config.roles[i] = config.entasia.roles.cache.get(config.roles[i])
		if(!config.roles[i])logger("Erreur lors de la récupération de "+i+" !")
	}
	for(let i in config.emojis){
		config.emojis[i] = config.entasia.emojis.cache.get(config.emojis[i])
		if(!config.emojis[i])logger("Erreur lors de la récupération de "+i+" !")
	}

	for(let i in config.roles_reacts){
		config.roles_reacts[i] = config.entasia.roles.cache.get(config.roles_reacts[i])
		if(!config.roles_reacts[i])logger("Erreur lors de la récupération de "+i+" !")
	}
	require('./Commands/Commands')
	require('./Features')
	logger("Fini !")

})