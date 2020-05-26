class vanish{
	constructor(){
		this.role = config.roles.staff
	}
	async execute (message, arg){
		let activate
		if(arg[1]=="on"){
			activate = true
		}else if(arg[1]=="off"){
			activate = false
		}else return message.channel.send("Met l'option on/off !")
		
		databases.SQL.query("SELECT name FROM playerdata.global WHERE discord_id=?", [message.author.id], (err, result)=>{
			if(err)throw err
			if(result[0]){
				databases.SQL.query("SELECT * FROM global.vanishs WHERE name=?", [result[0].name], (err, result2)=>{
					if(err)throw err
					let isVanish = !!result2[0]
					console.log(result2[0])
					if(activate){
						if(isVanish)message.channel.send("Tu es déja en vanish !")
						else{
							databases.SQL.query("INSERT INTO global.vanishs (name) VALUES (?)", [result[0].name])
							socket.sendData("broadcast vanish 1 "+result[0].name)
							message.channel.send("Vanish : :green_circle: **Activé** !")
						}
					}else{
						if(isVanish){
							databases.SQL.query("DELETE FROM global.vanishs WHERE name=?", [result[0].name])
							socket.sendData("broadcast vanish 0 "+result[0].name)
							message.channel.send("Vanish : :red_circle: **Désactivé** !")
						}else message.channel.send("Tu n'es pas en vanish !")
					}
				})
			}else message.channel.send("Tu n'es pas lié à un compte Minecraft ! Voir commande .sync")
		})
	}
}

module.exports.commands = { vanish }