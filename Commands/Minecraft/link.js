let codes = {}

socket.listen("sync", (m)=>{
	console.log("recu")
	let args = m.split(" ")
	codes[args[0]] = args[1]
	setTimeout(()=>{
		delete codes[args[0]]	
	}, 30000)
})

class link{
	constructor(){
		this.alias = ["sync"]
	}
	async execute (message, arg){
		databases.SQL.query("SELECT name FROM global WHERE discord_id=?", [message.author.id], function (err, result, fields) {
			if(err)throw err
			if(result[0]){ // il a un compte
				let embed = new CustomEmbed([message.author.username, "sync"]).setHeader("sync", "Synchronisation")
				embed.setDescription("Tu es **"+result[0].name+"** !")
				embed.setThumbnail(`https://cravatar.eu/helmavatar/${result[0].name}`)
				message.channel.send(embed)
		
			}else{ // pas de compte
				if(arg[1]){
					if(new RegExp("^[a-zA-Z0-9]{6}$").test(arg[1])){
						let name = codes[arg[1]]
						console.log(codes)
						console.log(name)
						if(name==null)return message.channel.send("Ce code n'existe pas !")
						let embed = new CustomEmbed([message.author.username, "sync"]).setHeader("sync", "Synchronisation")
						embed.setThumbnail(`https://cravatar.eu/helmavatar/${name}`)
						embed.setDescription("Vous êtes maintenant lié **"+name+"** !")
						message.channel.send(embed)
						if(!message.member.nickname)message.member.setNickname(name).catch(no)
						databases.SQL.query("UPDATE global SET discord_id=? WHERE name=?", [message.author.id, name])
						socket.sendData("BungeeCord syncok "+name+" "+message.author.id)
						return
					}else message.channel.send("Ce code n'est pas valide !")
					delmsg(message)
				}else message.channel.send("Veuillez entrer un code de synchronisation en argument ! Vous pouvez l'obtenir en faisant /botsync sur Minecraft.")
			}
		})
	}
}

module.exports.commands = { link }