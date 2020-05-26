const databases = require('entasia/Databases')
var mute_cache = []

// databases.SQLite.all("DELETE FROM mutes; DELETE FROM mute_roles;")	
databases.SQLite.all("SELECT * from mutes", (err, rows)=>{
	if(err)throw err
	for(let i of rows){
		mute_cache[i.on_id] = {}

		mute_cache[i.on_id].on = config.entasia.members.cache.get(i.on_id)||i.on_id
		mute_cache[i.on_id].by = config.entasia.members.cache.get(i.by_id)||i.by_id
		
		mute_cache[i.on_id].on_name = i.on_name
		mute_cache[i.on_id].time = i.time
		mute_cache[i.on_id].when = i.when
		mute_cache[i.on_id].reason = i.reason
		mute_cache[i.on_id].roles = []

		databases.SQLite.all(`SELECT * from mute_roles WHERE id='${i.on_id}'`, (err, rows)=>{
			if(err)throw err
			for(let j of rows){
				mute_cache[i.on_id].roles.push(j.role)
			}
		})
	}


	setInterval(()=>{
		for(let i in mute_cache){
			let muted = mute_cache[i]
			if(muted.time!=-1&&muted.when+muted.time<Date.now()/1000){
				unmute(muted.on)
			}
		}
	}, 5000)
})

async function mute(member, by, time, reason){
	let muted
	if(mute_cache[member.id]){
		muted = mute_cache[member.id]
	}else{
		muted = {}
		mute_cache[member.id] = muted
		muted.on = member
		muted.on_name = member.user.tag
		muted.by = by
		muted.by_name = by.user.tag
		muted.when = Math.round(Date.now()/1000)

		muted.roles = []
		for(let [k, v] of member.roles.cache){
			if(v.name == "@everyone"||k == config.roles.mute.id)continue
			databases.SQLite.run(`INSERT OR REPLACE INTO mute_roles VALUES ('${muted.on.id}', '${k}')`)
			muted.roles.push(k)
		}
	}
	member.roles.set([config.roles.mute])
	muted.reason = reason
	muted.time = time

	databases.SQLite.run(`INSERT OR REPLACE INTO mutes VALUES ('${muted.on.id}', '${muted.on_name}', '${muted.by.id}', ${muted.time}, '${muted.reason}', '${muted.when}')`)
}

function unmute(member){

	let id
	if(member.id)id = member.id
	else id=member
	muted = mute_cache[id]

	if(member.id){
		if(muted.roles[0]=='')member.roles.set([config.roles.default])
		else member.roles.set(muted.roles)
	}
	databases.SQLite.run(`DELETE FROM mutes WHERE on_id='${id}'`)
	databases.SQLite.run(`DELETE FROM mute_roles WHERE id='${id}'`)
	delete mute_cache[id]
}


module.exports.functions = { mute, unmute }
module.exports.variables = { mute_cache }