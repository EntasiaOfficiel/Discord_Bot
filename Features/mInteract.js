
const noDeleteMSG = require("entasia/GlobalAPI").internal.noDeleteMSG

bot.on("messageDelete", async function(message){
	if(!message.guild||message.system||!message.content||message.author.bot)return
	if(message.channel.id==config.channels.bureau_admin.id)return

	if(noDeleteMSG.includes(message.id)){
		return noDeleteMSG.splice(noDeleteMSG.indexOf(message.id), 1)
	}

	let embed = new CustomEmbed("Logs").setType("Log", "Message supprimé")
	embed.addField("De : ", message.author.toString()+"  ( "+message.author.tag+" )")
	embed.addField("Salon : ", message.channel)
	embed.addField("Lien : ", message.url)
	let d = message.createdAt.toISOString().replace(/T/, ' ').replace(/\..+/, '')
	embed.addField("Moment d'envoi : ", d)

	const entry = (await message.guild.fetchAuditLogs({type: "MESSAGE_DELETE"})).entries.first()
	if(entry.extra.channel)if(entry.extra.channel.id === message.channel.id
		&& (entry.target.id === message.author.id)
		&& (entry.createdTimestamp > (Date.now() - 5000))
		&& (entry.extra.count >= 1)) embed.addField("Supprimé par : ", entry.executor.tag)

	if(message.content.length>1024)embed.addField("Message : ", message.content.substr(0 ,1021)+"...")
	else embed.addField("Message : ", message.content)
	log(embed)
	
})
bot.on("messageUpdate", function(message, newMessage){
	if(!message.guild||message.system||!message.content||!newMessage.content||message.author.bot)return
	if(message.channel.id==config.channels.bureau_admin.id)return

	if(message.content.toLowerCase() == newMessage.content.toLowerCase())return
		
	let embed = new CustomEmbed("Logs").setType("Log", "Message édité")
	embed.addField("De : ", message.author.toString()+"  ( "+message.author.tag+" )")
	embed.addField("Salon : ", message.channel)
	embed.addField("Lien : ", message.url)
	let d = message.createdAt.toISOString().replace(/T/, ' ').replace(/\..+/, '')
	embed.addField("Moment d'envoi : ", d)
	if(message.content.length>1024)embed.addField("Ancien message : ", message.content.substr(0 ,1021)+"...")
	else embed.addField("Ancien message : ", message.content)
	if(newMessage.content.length>1024)embed.addField("Nouveau message : ", newMessage.content.substr(0 ,1021)+"...")
	else embed.addField("Nouveau message : ", newMessage.content)
	
	log(embed)
})

function log(embed){

	embed.setTimestamp()
	config.channels.logs_messages.send(embed)
}