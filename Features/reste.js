bot.on('message', async (message)=>{
	if(message.content[0]==config.talkchar&&message.content[1] != config.talkchar
	&&message.member&&message.member.hasPermission("MANAGE_MESSAGES")){
		delmsg(message)
		return message.channel.send(message.content.substring(1))
	}
	if(message.mentions.has(bot.user))await message.react(config.emojis.ping)
})

for(let [k, user] of config.entasia.members.cache){
	if(!user.roles.cache.has(config.roles.default)){
		user.roles.add(config.roles.default)
	}
}

// faut pas chercher à comprendre :)
// const CronJob = require('cron').CronJob;
// new CronJob('0 0 * * *', ()=>{
// 	config.channels.general_public.send("Joyeux hier de demain !")
// }, null, true, 'Europe/Paris');
