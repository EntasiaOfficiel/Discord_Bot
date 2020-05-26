class vanish{
	constructor(){
		this.role = config.roles.staff
		this.owner = true
	}
	async execute (message){
        databases.SQL.query("SELECT name FROM global from global.vanishs where name=?", ["-"+arg[1]], function (err, result) {

        })
	}
}

module.exports.commands = { vanish }