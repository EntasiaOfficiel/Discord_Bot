const request = require('request')
const config = require('../config')

function Hastebin(text){
	return new Promise(async resolve => {
		await request.post(url='https://hasteb.in/documents', {form:text}, function(error,response,body){
			try{
				if (!error&&response.statusCode==200) {
					resolve("https://hasteb.in/"+JSON.parse(body).key)
				}
			}catch(e){
				resolve("Aucun lien disponible")
			}
		})
	})
}


var n = ["seconde","minute","heure","jour","semaine","mois", "année"]
var d = [60, 60, 24, 7, 4, 12]

function timeToSeconds(time){
	time = time.toLowerCase()
	var a = time.split(/[a-z]/).filter(n => n != "")
	var b = time.split(/[0-9]/).filter(n => n != "")
	var c = 0
	for(i in a){
		switch(b[i]){
			case "mo":
				c+=a[i]*3600*24*28
				break
			case "w":
				c+=a[i]*3600*24*7
				break
			case "d":
				c+=a[i]*86400
				break
			case "h":
				c+=a[i]*3600
				break
			case"m":case"mi":case"min":
				c+=a[i]*60
				break
			case "s":case"sec":
				c+=Number(a[i])
				break
			default:
				c=0
		}
		if(c==0)break
	}
	return c
}

function secondsToTime(a){
	var t = [Math.round(a)]
	var f = ''
	if(a>0){

		for(var i = 0; i<n.length; i++){
			if(i!=6){
				t[i+1] = Math.floor(t[i] / d[i])
				t[i] = t[i] % d[i]
			}
			if(t[i] !=0){
				if(t[i] != 1&&i != 5) f = t[i]+" "+n[i] +'s'+ f
				else f = t[i]+" "+n[i] + f
				f= ", " + f
			}
		}
		let g = f.substr(2);
		let h = g.lastIndexOf(",")
		if(h==-1)return f.substr(2)
		return g.slice(0,h) + " et" + g.slice(h+1)
	}else return "XXX"
}

logInfo = (text)=>{
	if(typeof text == "object")text.setTimestamp()
	config.channels.logs.send(text)
}

no = ()=>{}
error = (e)=>{
	throw e
}


function tconvert(x){
	if(x.toString().length==1)return "0"+x
	else return x
}
function gettime(d){
	return `[${tconvert(d.getHours())}:${tconvert(d.getMinutes())}:${tconvert(d.getSeconds())}]`
}
logger = (msg)=>{
	console.log(gettime(new Date())+" "+msg)
}

const noDeleteMSG = []

delmsg = (msg, time=0)=>{
	noDeleteMSG.push(msg.id)
	msg.delete({timeout:time}).catch(no)
}

module.exports.functions = { timeToSeconds, secondsToTime, Hastebin, logInfo, no, logger, delmsg }
module.exports.internal = { noDeleteMSG }