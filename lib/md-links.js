const path = require('path');
const fs = require('fs'); 



// funcion para convertir ruta en absoluta y leer un archivo
function parametroRuta(a){
const completRuta = path.resolve(a);
  //console.log(path.resolve(a))
  comprueba_extension(completRuta)
return completRuta
 // console.log(completRuta); 
}

//lee el archivo
function leerArch(a){
	fs.readFile(a, 'utf-8', (err,data) => {
    if(err) throw err;
   // console.log(data)
    })
}
// valida que es un archivo .md
function comprueba_extension(a) { 
  extPermitidas = ".md"; 
  //recupero la extensión de este nombre de archivo 
  extension = (a.substring(a.lastIndexOf("."))).toLowerCase(); 
  //alert (extension); 
  //compruebo si la extensión está entre las permitidas 
   
  if (extPermitidas === extension) { 
    console.log('es md')
    leerArch(a)
    return true; 
  }else{
  console.log("Comprueba la extensión de los archivos a subir. \nSólo se pueden subir archivos con extensiones: " + extPermitidas);
  
  }
}

// // para verificar estatus de links
// const fetch = require('node-fetch');
// fetch('http//wwgogle.com/').then((response) =>{
// console.log(response)
// })


module.exports = {
  parametroRuta
}


