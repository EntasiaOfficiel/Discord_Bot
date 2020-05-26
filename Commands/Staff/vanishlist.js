class vanishlist{
	constructor(){
		this.role = config.roles.staff
	}
	async execute (message){
		databases.SQL.query("SELECT name FROM global.vanishs", (err, result)=>{
			if(err)throw err
			if(result[0]){
				let embed = new CustomEmbed([message.author.username, "vanishlist"]).setType("sync", "Vanishs :")
				let a = []
				for(let i of result){
					a.push(i.name)
				}
				embed.setDescription("- "+a.join("\n- "))
				message.channel.send(embed)
			}else message.channel.send("Aucun vanish actuellement !")
		})
	}
}

module.exports.commands = { vanishlist }