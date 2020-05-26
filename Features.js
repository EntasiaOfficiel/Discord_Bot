const fs = require('fs');

fs.readdir("./Features/", (err, files) => {
	if(err)throw err
	files.forEach(file=>{
		if(!file.startsWith("-")){
			require("./Features/"+file.slice(0, -3))
		}
	})
})