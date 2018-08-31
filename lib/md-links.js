const path = require('path');
const fs = require('fs');
const Marked = require('marked');
const fetch = require('node-fetch');
const colors = require('colors');

function mdlinks(ruta, options) {
  return new Promise((resolve, reject) =>{
    const comprobarExtension = compruebaExtension(ruta);
    if (comprobarExtension) {
      const rutaAbsoluta = parametroRuta(ruta);
      extraerLinea(rutaAbsoluta)
        .then((links) => {
          if (options.validate) {
            verificarlinks(links).then((datos) => {
              resolve(datos);
            });
          } else {
            resolve(links);
          }
          // console.log(links)
        })
        .catch((error) => {
          console.error('Error promesa > ' + error);
        });
    } else {
      reject('No es un archivo valido');
    }
  });
}


// funcion para convertir ruta en absoluta 
function parametroRuta(mostrar) {
  const completRuta = path.resolve(mostrar);
  // console.log(path.resolve(mostrar));
  // compruebaExtension(completRuta);
  // console.log(completRuta);
  return completRuta;
}

// valida que es un archivo .md
function compruebaExtension(mostrar) {
  const extPermitidas = '.md';
  // recupero la extensión de este nombre de archivo
  const extension = (mostrar.substring(mostrar.lastIndexOf('.'))).toLowerCase();
  // compruebo si la extensión está entre las permitidas
  // console.log(extension)
  if (extPermitidas === extension) {
    // console.log('Es un archivo markdown');
    // leerArch(mostrar);
    // console.log(extension)
    return true;
  }
  console.log('Comprueba la extensión de los archivos a subir. \nSólo se pueden subir archivos con extensiones:' + extPermitidas);
}

// lee el archivo
function leerArch2(path) {
  // console.log(path);
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (error, file) => {
      if (error) {
        reject(error);
      } else {
        resolve(file);
      };
    });
  });
}

function extraerLinea(rutaAbsoluta) {
  return new Promise((resolve, reject)=>{
    leerArch2(rutaAbsoluta).then(file =>{
      // console.log(file);

      let divlineaElArch = file.split('\n');
      // entrega un arreglo
      let recorreDiVlinea = divlineaElArch.map(element =>{
        // console.log(recorredivaline);
        const numeroLinea = (divlineaElArch.lastIndexOf(element) + 1);
        return markdownLinkExtractor(rutaAbsoluta, element, numeroLinea);
      });
      recorreDIVlinea = recorreDiVlinea.filter(element=> element.length !== 0);
      // console.log(recorreDiVlinea);
      //  reduce para eliminar los cero
      recorreDiVlinea = recorreDiVlinea.reduce((elementoA, elementoB)=> elementoA.concat(elementoB));
      resolve(recorreDiVlinea);
    });
  });
}

// function leerArch(mostrar) {

//   fs.readFile(mostrar, 'utf-8', (err, data) => {
//     if (err) throw err;
//     // cb(data);
//     markdownLinkExtractor(data);
//      console.log(data);
//   });
// }

// npm install --save marked
// Función para extraer los links 
// Recibe texto en markdown y retorna sus links en un arreglo
function markdownLinkExtractor(file, markdown, numeroLinea) {
  const links = [];

  const renderer = new Marked.Renderer();

  // Taken from https://github.com/markedjs/marked/issues/1279
  const linkWithImageSizeSupport = /^!?\[((?:\[[^\[\]]*\]|\\[\[\]]?|`[^`]*`|[^\[\]\\])*?)\]\(\s*(<(?:\\[<>]?|[^\s<>\\])*>|(?:\\[()]?|\([^\s\x00-\x1f()\\]*\)|[^\s\x00-\x1f()\\])*?(?:\s+=(?:[\w%]+)?x(?:[\w%]+)?)?)(?:\s+("(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)))?\s*\)/;

  Marked.InlineLexer.rules.normal.link = linkWithImageSizeSupport;
  Marked.InlineLexer.rules.gfm.link = linkWithImageSizeSupport;
  Marked.InlineLexer.rules.breaks.link = linkWithImageSizeSupport;

  renderer.link = function(href, title, text) {
    links.push({
      href: href,
      text: text,
      title: title,
      line: numeroLinea,
      file: file,
    });
  };
  renderer.image = function(href, title, text) {
    // Remove image size at the end, e.g. ' =20%x50'
    href = href.replace(/ =\d*%?x\d*%?$/, '');
    links.push({
      href: href,
      text: text,
      title: title,
      line: numeroLinea,
      file: file,
    });
  };
  Marked(markdown, {renderer: renderer});
  // console.log(links);
  return links;
};

// // // para verificar estatus de links
function verificarlinks(links) {
  return new Promise((resolve, reject)=>{
    let arr = [];

    for (let i = 0; i < links.length; i++) {
      var elementLinks = links[i].href;
      // console.log(elementLinks);

      // crear un arreglo vacio nombre del arreglo .push en el push coloca el fetch completo y sera un arreglo de promesas
      arr.push(fetch(elementLinks).then((response) =>{
        links[i].status = response.status;
        links[i].statusText = response.statusText;
        // console.log((data.url).cyan);
        // console.log(data.status);
        // console.log(data.statusText);
        // arreglo de pomesas le hago promes.all y ( arreglo de las promesas)
        //console.log(links[i]);
        return links[i];
      })
        .catch(error =>{
          console.error(('Error:' + error.status + 'fail no se encontro pagina').red);
          return links[i];
        }));
    }
    Promise.all(arr).then((datos)=>{
      //console.log(datos);
      if (datos) {
        resolve(datos);
      }
      reject('No existen links');
    });
  });
}


module.exports = {
  mdlinks,
  parametroRuta,
  compruebaExtension,
  leerArch2,
  markdownLinkExtractor,
  verificarlinks,

};
// tecnica del callback o la promesa recibes una funcion leer archivo
// leerArch(ruta, (datos)=>{

   
// EJEMPLO DE Callback
// function saludar(nombre) {
//   alert('Hola ' + nombre);
// }
  
// function procesarEntradaUsuario(callback) {
//   var nombre = prompt('Por favor ingresa tu nombre.');
//   callback(nombre);
// }
  
// procesarEntradaUsuario(saludar);