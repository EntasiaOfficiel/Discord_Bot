
class editmsg{
	constructor(){
		this.executable = ["text"]
		this.role = config.roles.staff
		this.alias = ["msgedit"]
	}
	async execute (message, arg){
		delmsg(message)
		if(arg[2]){
			if(arg[1].length != 18==true||arg[1]>1 == false)return message.channel.send("Mesage invalide !")
			var final
			await message.channel.fetchMessage(arg[1])
			.catch(no)
			.then(a =>{
				if(a) final = a
			})
			if(!final){
				for(var [k, v] of message.guild.channels){
					if(v.type != "text")continue
					await v.fetchMessage(arg[1])
					.catch(no)
					.then(a =>{
						if(a)final = a
					})
					if(final)break
				}
			}
			if(final){
				if(final.author.id != bot.user.id)message.channel.send("Ce message n'a pas été envoyé par le bot !")
				final.edit(message.content.substring(arg[0].length + arg[1].length + 3))
			}else message.channel.send("Message non trouvé !")
		}else{
			message.channel.send("Syntaxe invalide !")
		}
	}
}


module.exports.commands = { editmsg }