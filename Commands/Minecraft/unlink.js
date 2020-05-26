var conf = []

class unlink{
	constructor(){
		this.owner = true
	}

	async execute (message, arg){
		if(conf[message.author.id]){
			if(arg[1]){
				databases.SQL.query("SELECT name FROM playerdata WHERE discord_id=?", [message.author.id], async function (err, result, fields) {
					if(err)throw err
					if(arg[1].toLowerCase() == result[0].name.toLowerCase()){
						databases.SQL.query("UPDATE playerdata SET discord_id = null WHERE name=?", [result[0].name])
						let embed = new CustomEmbed([message.author.username, "unlink"])
						.setType("sync", "Synchronisation")
						.setDescription("Vous avez été délié de cette charmante bouille :")
						.setThumbnail(`https://cravatar.eu/helmavatar/${result[0].name}`)
						message.channel.send(embed)
						return
					}else message.channel.send("Le pseudo fourni est invalide !")
				})
			}else message.channel.send("Veuillez faire `.unlink <votre pseudo>` pour confirmer votre choix")
		}else{
			message.channel.send("Veuillez confirmer votre action en faisant `.unlink <votre pseudo>` dans les prochaines 15 secondes ! :smile:")
			conf[message.author.id] = true
			setTimeout(function(){delete conf[message.author.id]}, 15000)
		}
	}
}

module.exports.commands = { unlink }