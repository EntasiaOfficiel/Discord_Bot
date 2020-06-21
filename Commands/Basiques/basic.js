const { secondsToTime } = require('entasia/GlobalAPI').functions

class uptime{
	constructor(){
	}
    execute(message){
		message.channel.send("Je vous surveille depuis : "+secondsToTime(bot.uptime/1000))
	}
}
class avatar{
	constructor(){
	}
    execute(message, arg){
		let ava
		if(arg[1]){
			if (message.mentions.users.size > 0)ava = message.mentions.members.first()
			else{
				ava = message.guild.members.get(arg[1])
				if(!ava)return message.channel.send("Cet utilisateur n'existe pas !")
			}
		}else ava = message.member
		let url = ava.user.displayAvatarURL({format: "png", dynamic: true, size: 4096})
		if(!url)return message.channel.send("Cet utilisateur n'a pas d'avatar !")
		let t = url.indexOf("?")
		if (t != -1)url = url.substring(0, t)
		url += "?size=1024"
		let embed = new CustomEmbed([message.author.username, "avatar"]).setHeader("Avatar de "+ava.user.username)
		embed.setImage(url)
		message.channel.send(embed)
	}
}

module.exports.commands = { uptime, avatar }