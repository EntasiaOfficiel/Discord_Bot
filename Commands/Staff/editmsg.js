
class editmsg{
	constructor(){
		this.executable = ["text"]
		this.role = config.roles.staff
		this.alias = ["msgedit"]
	}
	async execute (message, arg){
		delmsg(message)
		if(arg[2]){
			if(arg[1].length != 18||!arg[1]>1)return message.channel.send("Mesage invalide !")

			let final
			await message.channel.messages.fetch(arg[1])
			.catch(no)
			.then(a =>{
				 final = a
			})
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