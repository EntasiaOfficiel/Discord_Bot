class profile{
	constructor(){
		this.alias = ["profil"]
	}
	async execute (message, arg){
		databases.SQL.query("SELECT name, global_money, creatif_money FROM playerdata WHERE discord_id=?", [message.author.id], (err, result)=>{
			if(err)return err
			if(result[0]){
				let embed = new CustomEmbed([message.author.username, "profile"]).setType("sync", "Votre profil :")
				message.channel.send(embed)
			
			}else message.channel.send("Vous devez vous connecter à votre compte Minecraft pour utiliser cette commande ! Voir commande .sync")
		})
	}
}

module.exports.commands = { profile }