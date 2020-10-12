const { mute_cache } = require('entasia/ModAPI').variables
var modAlert = []

function SecCheck(u){
	if(!modAlert[u.id]) modAlert[u.id] = 1
	else modAlert[u.id]++
	if(modAlert[u.id] > 8){
		delete modAlert[u.id]
		config.entasia.channels.bureau_staff.send("@everyone Attention : "+u.tag+" a essayé de spamkick les membres du serveur", {disableMentions: false})
		return config.entasia.members.get(u.id).setRoles([config.roles.muterole])
	}
	let cach = modAlert[u.id]
	setTimeout(()=>{
		if(cach == modAlert[u.id]) delete modAlert[u.id]
	}, 70000)
}

let stleave = []

bot.on("guildMemberAdd", function(member){
	updatem()
	if(stleave.includes(member.user.id)){
		config.channels.bureau_staff.send(member.user.tag+" a rejoint le Discord !!!")
	}else{
		if(mute_cache[member.id]){
			let embed = new CustomEmbed("Logs")
			.setType("log", "Action d'un joueur muté")
			.setType("log", "Action d'un joueur muté")
			.addField("Type : ", "Discord rejoint")
			.addField("Joueur : ", member.user.tag+" ("+member.id+")")
			functions.logInfo(embed)
			member.roles.set([config.roles.mute])
			config.channels.mute.send("rebonjour "+member.toString()+" ! Tu ne pensais pas t'en tirer comme ça, pas vrai ? ^^")
		}else{
			config.channels.accueil.send(member.toString()+" a rejoint le Discord d'Entasia ! 😄")
			member.roles.set([config.roles.default])
		}
	}
})


bot.on("guildMemberRemove", function(member){
	updatem()
	if(member.roles.cache.has(config.roles.staff)){
		config.channels.bureau_staff.send(member.user.tag+" a quitté le Discord !!!")
		stleave.push(member.user.id)
	}else{
		setTimeout(async()=>{
	
			let data = (await member.guild.fetchAuditLogs({limit: 2})).entries.array()
			let entry
			for(let entry of data){
				if(entry.action == "MEMBER_KICK"){
					let embed = new CustomEmbed("Logs")
					.setType("log", "Exclusion du discord")
					if(Date.now() - member.joinedTimestamp > 103680000) SecCheck(entry.executor)
					embed.addField("Par :", `${entry.executor.tag} (ID : ${entry.executor.id} )`)
					embed.addField("Sanctionné :", `${member.user.tag} (ID : ${member.user.id} )`)
					embed.addField("Raison :", entry.reason||"Non définie")
					functions.logInfo(embed)
					
					let b = "! Pas malin de chercher les modos..."
					if(entry.reason) b = "pour **" + entry.reason+"**"
					return config.channels.accueil.send(`**${member.displayName}** à été kick par ${entry.executor} ${b}`)
				}else if(entry.action == "MEMBER_BAN_ADD"){
					let embed = new CustomEmbed("Logs")
					.setType("log", "Bannissement du discord")
					if(Date.now() - member.joinedTimestamp > 103680000) SecCheck(entry.executor)
					embed.addField("Par :", `${entry.executor.tag} (ID : ${entry.executor.id} )`)
					embed.addField("Sanctionné :", `${member.user.tag} (ID : ${member.user.id} )`)
					embed.addField("Raison :", entry.reason||"Non définie")
					functions.logInfo(embed)
					
					let b = "! KA-BOOM !"
					if(entry.reason) b = "pour **" + entry.reason+"**"
					return config.channels.accueil.send(`**${member.displayName}** a été banni par ${entry.executor} ${b}`)
				}
			}
			
			if(mute_cache[member.id]){
				let embed = new CustomEmbed("Logs")
				.setType("log", "Action d'un joueur muté")
				.addField("Type : ", "Discord quitté")
				.addField("Joueur : ", member.user.tag+" ("+member.id+")")
				functions.logInfo(embed)
			}else config.channels.accueil.send(member.displayName+" a quitté le Discord d'Entasia ! Pourquoi ):")
			return
		}, 500)
	}
})

function updatem(){
	config.channels.compteur_discord.setName("Membres Discord :  "+config.entasia.members.cache.size)
}

updatem()
