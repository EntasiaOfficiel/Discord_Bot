var confirm = []

class unlink{
	constructor(){
		this.alias = ["unsync"]
	}

	async execute (message, arg){
		databases.SQL.query("SELECT name FROM playerdata.global WHERE discord_id=?", [message.author.id], async function (err, result, fields) {
			if(err)throw err
			if(result[0]){
				if(confirm.includes(message.author.id)){
					if(arg[1]){
						if(err)throw err
						if(arg[1].toLowerCase() == result[0].name.toLowerCase()){
							databases.SQL.query("UPDATE playerdata.global SET discord_id = null WHERE name=?", [result[0].name])
							let embed = new CustomEmbed([message.author.username, "unlink"])
							.setType("sync", "Synchronisation")
							.setDescription("Vous avez été délié de cette charmante bouille :")
							.setThumbnail(`https://cravatar.eu/helmavatar/${result[0].name}`)
							message.channel.send(embed)
							return
						}else message.channel.send("Le pseudo fourni est invalide !")
					}else message.channel.send("Veuillez faire `.unlink <votre pseudo>` pour confirmer votre choix")
				}else{
					message.channel.send("Veuillez confirmer votre action en faisant `.unlink <votre pseudo>` dans les prochaines 15 secondes ! :smile:")
					confirm.push(message.author.id)
					setTimeout(()=>{
						confirm.splice(confirm.indexOf(message.author.id), 1)
					}, 15000)
				}
			}else message.channel.send("Tu n'es pas lié à un compte Minecraft ! Voir commande .sync")
		})
	}
}

module.exports.commands = { unlink }