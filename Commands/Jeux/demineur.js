class demineur{
	constructor(){
	}
	execute (message, arg){
		var size;
		var n_to_em = []
		n_to_em[0] = ":zero:"
		n_to_em[1] = ":one:"
		n_to_em[2] = ":two:"
		n_to_em[3] = ":three:"
		n_to_em[4] = ":four:"
		n_to_em[5] = ":five"
		if (!arg[1])size = 7
		else if (arg[1] <= 13 && arg[1] >= 5 && arg[1] == Math.round(arg[1])) size = arg[1]
		else{
			message.channel.send("Erreur : Choisis un nombre entier entre 5 et 13 !")
			return
		}
		var demin = new Array(size);
		for (var i=0; i<size; i++){
			demin[i] = new Array(size);
			for (var i2=0; i2<size; i2++){
				demin[i][i2] = 0
			}
		}
		var bx;
		var by;
		for (var i=0; i<size; i++){
			bx = Math.floor((Math.random() * size));
			by = Math.floor((Math.random() * size));
			if(demin[bx][by] == -1){
				i--
				continue
			}
			demin[bx][by] = -1
			if (bx < size - 1 && demin[bx+1][by] != -1){
				demin[bx+1][by] += 1;
			}
			if (bx > 0 && demin[bx-1][by] != -1){
				demin[bx-1][by] += 1;
			}
			if (by < size - 1 && demin[bx][by+1] != -1){
				demin[bx][by+1] += 1
			}
			if (by > 0 && demin[bx][by-1] != -1){
				demin[bx][by-1] += 1;
			}
			if (bx < size - 1 && by < size - 1 && demin[bx+1][by+1] != -1){
				demin[bx+1][by+1] += 1
			}
			if (bx > 0 && by > 0 && demin[bx-1][by-1] != -1){
				demin[bx-1][by-1] += 1
			}
			if (bx < size - 1 && by > 0 && demin[bx+1][by-1] != -1){
				demin[bx+1][by-1] += 1
			}
			if (bx > 0 && by < size - 1 && demin[bx-1][by+1] != -1){
				demin[bx-1][by+1] += 1
			}
		}
		var grille = ""
		for (var i=0; i<size; i++){
			for (var i2=0; i2<size; i2++){
				grille += "||"
				if (demin[i][i2] == -1){
					grille += "💣"
				}else{
					grille += n_to_em[demin[i][i2]]
				}
				grille += "||"
			}
			grille += "\n"
		}
		if (grille.length > 1024){
			grille+="\nNombre de bombes : "+size
			message.channel.send(grille)
		}else{
			message.channel.send(new CustomEmbed()
				.setTitle("Démineur " + size + "x" + size)
				.addField(message.author.username, grille)
				.setFooter("Nombre de bombes : "+size))
		}
	// </DEMINEUR>
    }
}


module.exports.commands = { demineur }