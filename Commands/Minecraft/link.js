class link{
	constructor(){
		this.alias = ["sync"]
		this.owner = true
	}
	async execute (message, arg){
		databases.SQL.query("SELECT name FROM global WHERE discord_id=?", [message.author.id], function (err, result, fields) {
			if(err)throw err
			if(result[0]){
				let embed = new CustomEmbed([message.author.username, "sync"]).setHeader("sync", "Synchronisation")
				embed.setDescription("Tu est **"+result[0].name+"** !")
				embed.setThumbnail(`https://cravatar.eu/helmavatar/${result[0].name}`)
				message.channel.send(embed)
		
			}else{
				if(arg[1]){
					if(!new RegExp("^[a-zA-Z0-9]{6}$").test(arg[1])){
						return message.channel.send("Ce code n'est pas valide !")
					}
					databases.SQL.query("SELECT name FROM global WHERE discord_id=?", ["-"+arg[1]], function (err, result2, fields) {
						if(err)throw err
						if(result2[0]){
							if(!result2[0].name)return
							let embed = new CustomEmbed([message.author.username, "sync"]).setHeader("sync", "Synchronisation")
							embed.setThumbnail(`https://cravatar.eu/helmavatar/${result2[0].name}`)
							embed.setDescription("Vous êtes maintenant lié **"+result2[0].name+"** !")
							message.channel.send(embed)
							message.member.setNickname(result2[0].name).catch(no)
							databases.SQL.query("UPDATE playerdata SET discord_id=? WHERE name=?", [message.author.id, result2[0].name])
						}else{
							message.channel.send("Ce code n'est pas valide !")
						}
					})
				}else message.channel.send("Veuillez entrer un code de synchronisation en argument ! Vous pouvez l'obtenir en faisant /botsync sur Minecraft.")
			}
		})
	}
}

module.exports.commands = { link }