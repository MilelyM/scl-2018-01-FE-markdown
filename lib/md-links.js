const path = require('path');
const fs = require('fs'); 



function parametroRuta(a){
const completRuta = path.resolve(a);
//return completRuta
  //console.log(path.resolve(a))

	fs.readFile(completRuta, 'utf-8', (err,data) => {
	if(err) throw err;
  console.log(data)
  })
  console.log(completRuta); 
}



module.exports = {
  parametroRuta
}


