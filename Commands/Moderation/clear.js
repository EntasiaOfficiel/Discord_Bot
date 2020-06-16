const MAX = 70

class clear{
	constructor(){
		this.executable = ["text"]
		this.perm = "MANAGE_MESSAGES"
	}
    async execute (message, arg){
        if(arg[1] >= 1&&arg[1] <= MAX){
			if(arg[2]){
				if (message.mentions.members.size > 0)
					var user = message.mentions.members.first()
				else var user = message.guild.members.get(arg[1])
				if(!user)return message.channel.send("Cet utilisateur n'existe pas !")
				var cl = await message.channel.fetchMessages({limit: 100})
				cl = await cl.filter(m => m.author.id === user.id)
				cl = cl.array().splice(0, Math.round(arg[1]))
			}else var cl = Math.round(arg[1])+1
			message.channel.bulkDelete(cl, true)
			.catch(no)
			.then(async (a) => {
				if(typeof a == "object"){
					if(arg[2]){
						var msg = await message.channel.send("Les "+cl.length+" derniers messages de **"+user.user.username+"#"+user.user.discriminator+"** dans <#"+message.channel.id+"> ont été supprimés !")
					}else{
						var msg = await message.channel.send(arg[1]+ " messages sont été supprimés dans <#"+message.channel.id+"> !")
					}
					delmsg(msg, 5000)

				}else{
					message.channel.send(
						new CustomEmbed([message.author.username, "clear"]).setType("error", "Une erreur est survenue !")
					)
				}
			})	
        }else message.channel.send("Mentionnez un nombre entre 1 et "+MAX+" !")
    }
}

module.exports.commands = { clear }
