const { loadedCmds } = require('../Commands.js').variables
class help{
	constructor(){
		this.alias = ["aide"]
	}
    execute (message, arg){
		let embed = new CustomEmbed([message.author.username, "help"]).setHeader("Fiche d'aide des commandes")
		if (!arg[1]){
			embed.setDescription("Voici la liste de mes Commandes :\n \n Faites .help <commande> pour en savoir plus sur une commande !")
			
			let cmdtypes = []
			let cmdtypesn = []

			for(let i in loadedCmds){
				if(typeof loadedCmds[i] == "string")continue
				let inst = loadedCmds[i]

				if(!cmdtypes[inst.type]){
					cmdtypes[inst.type] = ""
					cmdtypesn[inst.type] = 0
				}
				
				cmdtypes[inst.type] += config.prefix+i+", "
				cmdtypesn[inst.type]++
			}
			for(let i in cmdtypes){
				cmdtypes[i] = cmdtypes[i].substring(0, (cmdtypes[i].length - 2))
				embed.addField(i, cmdtypes[i]+" (**"+cmdtypesn[i]+"**)")
			}
		}else{
			let cmdname = arg[1].toLowerCase()
			if(loadedCmds[cmdname]){
				let cmd = loadedCmds[cmdname]
				if(typeof cmd == "string") cmd = loadedCmds[cmd]
				embed.addField("Commande : ", "**"+cmdname+"**")
				embed.addField("Description", config.descriptions[cmdname]||"Aucune")
				embed.addField("Type", cmd.type, true)

				let exec
				if(cmd.executable == "text") exec = "Dans les salons texte"
				else if(cmd.executable == "dm") exec = "Dans les salons privés"
				else exec = "De partout"
				embed.addField("Executable", exec, true)

				embed.addField("Permission", cmd.perm||"Aucune", true)
				if(cmd.alias){
					let aliases = ""
					for(let i of cmd.alias)aliases += i+", "
					embed.addField("Aliases", aliases.substr(0, aliases.length-2), true)
				}
			}else{
				embed.setDescription("La commande "+arg[1]+" n'existe pas !")
			}
		}
		message.channel.send(embed)
	}
}

module.exports.commands = { help }