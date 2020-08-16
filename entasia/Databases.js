
const pass = require('entasia/pass')
const a = require('sqlite3').verbose()
const SQLite = new a.Database("Data/database.db")

const SQL = require('mysql').createConnection({
	host: pass.sql.host,
	port: pass.sql.port,
	user: pass.sql.user,
	password: pass.sql.pass,
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