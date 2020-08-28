const JsSHA = require('jssha')
const crypto = require('crypto')
const secret = require("./pass").socket.secret

function signMsg(msg, hexSalt){
    if(!hexSalt){
        hexSalt = crypto.randomBytes(16).toString('hex')
    }

    let digest = new JsSHA("SHA-256", "TEXT", { encoding: "UTF8" })

    digest.update(secret)
    digest.update(hexSalt)
    digest.update(msg)
    
    let hash = digest.getHash("B64")
    return hash+";"+hexSalt
}

function verifyMsg(msg, signature){
    let list = signature.split(";")
    return signature==signMsg(msg, list[1])
}


// let msg = "log BungeeCord"
// if(verifyMsg(msg, signature)){
//     console.log("vérifié")
// }else console.log("invalidé")


module.exports = {signMsg, verifyMsg }