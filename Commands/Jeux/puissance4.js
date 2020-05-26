puis4_data = new Object()

class puissance4Game{
	constructor(opponent1, opponent2, channel, pmax=3){
		this.pmax = pmax
		this.opponent1 = opponent1
		this.opponent2 = opponent2
		this.turn = opponent1
		this.grille = []
		for (var i = 0; i<7; i++) this.grille[i] = []
		this.embed = new CustomEmbed()
		for (let i=0; i<3; i++){
			let a = ''
			for (let i2=0; i2<7; i2++){
				a += ':black_circle:　'
			}
			this.embed.addField(a, a)
		}
		
		this.embed.setFooter('Au tour de : '+this.turn.username)
		this.embed.setDescription(":red_circle:  "+this.opponent1.username+"\n:large_blue_circle:  "+this.opponent2.username
		+"\n　\n:one:　:two:　:three:　:four:　:five:　:six:　:seven:")
		this.init(channel)
	}
	async init(channel){
		this.message = await channel.send(this.embed)
		const collector = this.message
			.createReactionCollector((reaction, user) => {
				if(!user.bot){
					reaction.remove(user)
					if(user.id == this.turn.id){
						let a = reaction.emoji.identifier.substring(0, 1)
						if(a >= 1&&a <= 7) if(this.userPlay(a-1)) collector.stop()
					}
				}
			})
		for (var i=1; i<8; i++) await this.message.react(i+'⃣')

	}
	
	stopGame(){
		this.message.clearReactions()
		delete puis4_data[this.opponent1.id]
		delete puis4_data[this.opponent2.id]
	}
	win(){
		let winner
		if(this.turn.id==this.opponent1.id)winner = this.opponent2
		else winner = this.opponent1
		this.embed.setFooter(winner.username+" à gagné !")
		this.embed.setThumbnail(winner.avatarURL)
		this.embed.setAuthor(winner.username, undefined, winner.avatarURL)
		this.message.edit(this.embed)
		this.stopGame()
	}
	userPlay(em_x){
		let em_y
		for (var i=0; i<=5; i++){
			if (this.grille[em_x][i] == undefined){
				em_y = i
				break
			}
			
		}
		if(em_y == undefined)return
		let em;
		if (this.turn.id == this.opponent1.id){
			this.turn = this.opponent2;
			em=":red_circle:"
		}else{
			this.turn = this.opponent1;
			em=":large_blue_circle:"
		}
		this.embed.setFooter('Au tour de : '+this.turn.username)
		
		this.grille[em_x][em_y] = em
		let line = 2-Math.floor(em_y/2)

		// <EDITION DE L'EMBED>
		let cline = ''
		for (let i=0; i<7; i++){
			cline += (this.grille[i][em_y]||":black_circle:")+"　"
		}
		
		if(em_y%2==0) this.embed.fields[line] = { name: this.embed.fields[line].name, value: cline, inline: true}
		else this.embed.fields[line] = { name: cline, value: this.embed.fields[line].value, inline: true}
		// </EDITION DE L'EMBED>
		
		let pair = 0
		// <BOUCLE X SIMPLE>
		for(let i=0;i<7;i++){
			if(this.grille[i][em_y]==em){
				pair += 1
				if(pair>this.pmax)break
			}else pair = 0
		}
		// </BOUCLE X SIMPLE>
		if(pair>this.pmax)return this.win()
		pair = 0
		// <BOUCLE Y SIMPLE>
		for(let i=0;i<7;i++){
			if(this.grille[em_x][i]==em){
				pair += 1
				if(pair>this.pmax)break
			}else pair = 0
		}
		// </BOUCLE Y SIMPLE>
		if(pair>this.pmax)return this.win()
		pair = 0
		// <BOUCLE DIAGONALE X Y NORMALE>
		let fakex=em_x
		let fakey=em_y
		for(let i=0;i<10;i++){
			if(fakex > 6||this.grille[fakex][fakey] != em)break
			fakex+=1
			fakey+=1
			pair+=1
		}
		fakex=em_x
		fakey=em_y
		for(let i=0;i<10;i++){
			fakex-=1
			fakey-=1
			if(fakex < 0||this.grille[fakex][fakey] != em)break
			pair+=1
		}
		// </BOUCLE DIAGONALE X Y NORMALE>
		if(pair>this.pmax)return this.win()
		pair = 0
		// </BOUCLE DIAGONALE X Y INVERSE>
		fakex=em_x
		fakey=em_y
		for(let i=0;i<10;i++){
			if(fakex < 0||this.grille[fakex][fakey] != em)break
			fakex-=1
			fakey+=1
			pair+=1
		}
		fakex=em_x
		fakey=em_y
		for(let i=0;i<10;i++){
			fakex+=1
			fakey-=1
			if(fakex > 6||this.grille[fakex][fakey] != em)break
			pair+=1
		}
		// <BOUCLE DIAGONALE X Y INVERSE>
		if(pair>this.pmax)return this.win()
		this.message.edit(this.embed)
	}
}
class puissance4{
	constructor(){
		this.executable = ["text"]
		this.alias = ["p4", "p5", "puissance5"]
	}
	execute (message, arg){
		if(!arg[1])return message.channel.send("Tu dois choisir un joueur !")
		if(arg[1] == "stop"){
			if(puis4_data[message.author.id]){
				var a = puis4_data[message.author.id].opponent1
				var b = puis4_data[message.author.id].opponent2
				message.channel.send("Tu as arrété ta partie !")
				puis4_data[message.author.id].embed.setDescription("Partie de puissance4 terminée")
				puis4_data[message.author.id].message.edit(puis4_data[message.author.id].embed)
				puis4_data[message.author.id].stopGame()
			}else message.channel.send("Tu n'est pas en partie !")
		}else{

			let adversaire
			if (message.mentions.users.size == 0) adversaire = bot.users.get(arg[1])
			else adversaire = message.mentions.users.first()
			if (adversaire == undefined) return message.channel.send("Ce joueur n'existe pas !")
			else if (message.author == adversaire) return message.channel.send("Mais... pas un duel contre toi même , boulet ?")
			else if (puis4_data[message.author.id]) return message.channel.send("Tu est déjà en partie !")
			else if (puis4_data[adversaire.id]) return message.channel.send(adversaire.username+" est déjà en partie !")
			else if (adversaire.bot) return message.channel.send("Non.. arrête s'il te plait , tu peux pas glitcher..")
			
			message.channel.send("Adversaire choisi : " + adversaire.username)
			let p = 3
			if(arg[0] == "p5"||arg[0]=="puissance5")p = 4
			puis4_data[message.author.id] = new puissance4Game(message.author, adversaire, message.channel, p)
			puis4_data[adversaire.id] = puis4_data[message.author.id]
		}
	}
}


module.exports.commands = { puissance4 }