class profile{
	constructor(){
		this.alias = ["profil"]
		this.owner = true
	}
	async execute (message, arg){
		databases.SQL.query("SELECT name, global_money, creatif_money FROM playerdata WHERE discord_id=?", [message.author.id],
		(err, result)=>{
			if(err)return err
			if(result[0]){
				let embed = new CustomEmbed([message.author.username, "profile"]).setType("sync", "Votre profil :")
				message.channel.send(embed)
			
			}else message.channel.send("Vous devez vous connecter à votre compte Minecraft en utilisant .sync pour utiliser cette commande !")
		})
	}
}

module.exports.commands = { profile }