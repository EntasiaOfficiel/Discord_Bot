
const a = require('sqlite3').verbose()
const SQLite = new a.Database("Data/database.db")

const SQL = require('mysql').createConnection({
	host: "localhost",
	port: "34614",
	user: "discord",
	password: "TCH5pJr6U&iB302lM^yb%aClii*Js*6u34uj@l4Ajxc6^GW#xR5#uhhKjpV86aysBi%rkbaDzphUSQLCm7&ELeWdQQFhzE*fZmz",
	database: "playerdata"
})

SQL.fastSelect = (requ, params)=>{
	return new Promise((resolve, reject)=>{
		SQL.query(requ, params, (err, rows)=>{
			if(err)reject(err)
			else resolve(rows)
		})
	})
}

SQL.connect(async(err)=>{
    if(err)throw err
	logger("Connexion à la base SQL reussie !")
})


module.exports = { SQL, SQLite }