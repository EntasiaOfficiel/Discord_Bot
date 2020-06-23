
let lastupdate
let updating
const time = 3000

socket.listen("players", (m)=>{
    vars.totalonlines = m.split(" ")
    if(vars.totalonlines[0]==""){
        vars.totalonlines = []
    }
})

socket.listen("onlines", (m)=>{
    let a = m.split(" ")
	vars.onlines[a[0]] = a[1]
})