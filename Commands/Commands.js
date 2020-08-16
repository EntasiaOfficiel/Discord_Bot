const { Hastebin } = require('entasia/GlobalAPI').functions
const { prefix } = require('entasia/config')
const fs = require('fs')
var loadedCmds = new Object()
let dirsearch = ["Basique", "Economie", "Moderation", "Jeux", "Liaison", "Autres"]
fs.readdir("./Commands/", (err, dirs) => {
	if(err)throw err
	for(let dir of dirs){
		if(fs.lstatSync("./Commands/"+dir).isDirectory()&&!dir.startsWith("-")){
			fs.readdir("./Commands/"+dir+"/", (err, files) => {
				if(err)throw err
				for(let file of files){

					if(file.startsWith("-"))continue
					var commands = require("./"+dir+"/"+file.slice(0, -3)).commands
					for(let k in commands){
						let inst = new commands[k]()
						inst.type = dir
						loadedCmds[k] = inst

						if(inst.alias){
							for(let i of inst.alias)loadedCmds[i] = inst
						}
					}

				}
			})
		}
	}
})

bot.on('message', async message => {
	if(message.author.bot||message.content.length == 1||message.system)return

	// TRAITEMENT DE BASE

	if(!message.content.startsWith(prefix))return

	let args = []
	for(let arg of message.content.substring(prefix.length).split(" ")){ // espaces en trop
		if(arg != "")args.push(arg)
	}

	let command = args[0].toLowerCase()
	let cmd
	if(typeof loadedCmds[command] == "object")cmd = loadedCmds[command]
	else if(typeof loadedCmds[command] == "string")cmd = loadedCmds[loadedCmds[command]]
	else return

	// OPTIONS DE LA COMMANDE

	if(cmd.executable&&cmd.executable.indexOf(message.channel.type) == -1)return

	if(cmd.owner&&config.owner.id != message.author.id)return message.channel.send("Cette commande est réservée au propriétaire du bot !")
	
	if(cmd.perm||cmd.role){
		if(!(message.member&&message.member.hasPermission("ADMINISTRATOR"))){
			if(cmd.perm){
				if(!message.member.hasPermission(cmd.perm)){
					return message.channel.send(
					new CustomEmbed([message.author.username, command])
					.setType("perm", "Permissions insuffisantes")
					.setDescription("Tu n'as pas la permission ! :cry: ("+cmd.perm+")"))
				}
			}
			if(cmd.role){
				if(!message.member.roles.cache.has(cmd.role.id)){
					return message.channel.send(
					new CustomEmbed([message.author.username, command])
					.setType("perm", "Permissions insuffisantes")
					.setDescription("Tu n'as pas le rôle requis ! :cry: ("+cmd.role.name+")"))
				}
			}
		}
	}
	try{
		await cmd.execute(message, args)
	}catch(error){
		logger("Une erreur est survenue !")
		console.log(error)
		message.channel.send(new CustomEmbed([message.author.username, command]).setType("error", "Erreur !")
		.setDescription("Une erreur est survenue dans cette commande ! L'erreur à été envoyée aux Développeurs pour la régler au plus vite :gear:"))
		let embed = new CustomEmbed("Logs").setType("error", "Erreur survenue dans une commande !")
		embed.addField("Par : ", message.author.tag)
		embed.addField("Commande : ", args[0])
		embed.addField("Message total : ", message.content)
		embed.addField("Type de l'erreur : ", error.name)
		if(error.message)embed.addField("Description de l'erreur : ", error.message)
		functions.logInfo("Erreur dans la commande "+command+" , executée par "+message.author.tag+" !")
	}
})

module.exports.variables = { loadedCmds }