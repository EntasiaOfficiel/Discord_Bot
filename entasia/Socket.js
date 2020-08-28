const net = require('net')
const security = require('./SocketSecurity')
let socketC
let listeners = []
let firstsocket = false

const infos = require("entasia/pass").socket

function connect(){
	socketC = net.createConnection({ host: infos.host, port: infos.port })
	
	socketC.on('error', e => {
		if(e.message == "read ECONNRESET"){
			logger("déconnecté du socket !")
		}else if(e.message.startsWith("Server kicked us")){
			logger("Le socket nous a kické !")
		}else if(e.message.startsWith("connect ECONNREFUSED")){
			logger("Connexion au socket refusée !")
		}else logger(e.stack)
		if(firstsocket){
			logger("Tentative de reconnexion dans 5 secondes ..\n")
			setTimeout(() => {
				logger("Tentative de reconnexion")
				connect()
			}, 5000)
		}else throw new Error("could not connect to socket")
	})

	socketC.on('end', () => {
		socketC.emit('error', new Error("Server kicked us"))
	})

	socketC.on('connect', () => {
		logger("Connecté au socket !")
		sendData("log EBH")
		firstsocket=true
	})

	socketC.on('data', function (data) {
		let m = data.toString()
		if(m.charCodeAt(m.length-2) == 13)m = m.substring(0, m.length-2)
		else if(m.charCodeAt(m.length-1) == 10) m=m.substring(0, m.length-1)
		for(let i of m.split("\n")){
			socketC.emit('line', i)
		}
	
	})

	socketC.on('line', function (msg) {
		let args = msg.split(" ")

		let signature = args.shift()
		if(!security.verifyMsg(args.join(" "), signature)){
			logger("Le packet "+msg+" à une signature invalide !")
			return
		}

		for(l of listeners){
			if(args[0]==l.key)l.handler(args.splice(1).join(' '))
		}
	})
}

connect()

function sendData(str){
	let signature = security.signMsg(str)
	socketC.write(signature+" "+str+"\n")
}

function listen(key, handler){
	let obj = {}
	obj.key = key
	obj.handler = handler
	listeners.push(obj)
}


// setInterval(async function(){
// 	// logger("demande de données")
// 	let d = Date.now()
// 	var a = await sendData("BungeeCord onlineplayers")
// 	// logger("RESULTAT : "+a)
// 	logger(Date.now() - d)
// },500)

module.exports = { socketC, sendData, listen }