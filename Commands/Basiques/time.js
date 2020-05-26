const { secondsToTime } = require('entasia/GlobalAPI').functions

class time{
	constructor(){
		this.executable = ["text"]
	}
    execute (message, arg){
		let target
		if(arg[1]){
			if (message.mentions.users.size > 0)target = message.mentions.members.first()
			else target = message.guild.members.get(arg[1])
			if(!target)return message.channel.send("Cet utilisateur n'existe pas !")
		}else target = message.member
		message.channel.send(ta.user.username+" est la depuis "+secondsToTime(ta.joinedTimestamp/1000))
    }
}

module.exports.commands = { time }

