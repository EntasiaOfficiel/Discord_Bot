const net = require('net')
let socketC
let listeners = []
let firstsocket = false

function connect(){
	socketC = net.createConnection({ port: 23461, host: 'localhost' })
	
	socketC.on('error', e => {
		if(e.message == "read ECONNRESET"){
			logger("déconnecté du socket !")
		}else if(e.message.startsWith("Server kicked us")){
			logger("Le socket nous a kické !")
		}else if(e.message.startsWith("connect ECONNREFUSED")){
			logger("Connexion au socket refusée !")
		}else throw e
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
		socketC.write("log EBH\n")
		firstsocket=true
	})

	socketC.on('data', function (data) {
		let m = data.toString()
		if(m.charCodeAt(m.length-2) == 13)m = m.substring(0, m.length-2)
		else if(m.charCodeAt(m.length-1) == 10) m=m.substring(0, m.length-1)
		for(let i of m.split("\n")){
			// logger("Paquet recu : "+i)
			socketC.emit('line', i)
		}
	
	})

	socketC.on('line', function (m) {
		let args = m.split(" ")
		for(l of listeners){
			if(args[0]==l.key)l.handler(args.splice(1).join(' '))
		}
	})
}

connect()

function sendData(a){
	socketC.write(a+"\n")
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