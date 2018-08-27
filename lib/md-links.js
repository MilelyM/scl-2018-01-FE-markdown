const path = require('path');
const fs = require('fs');
const Marked = require('marked');
const fetch = require('node-fetch');
const colors = require('colors');

// funcion para convertir ruta en absoluta 
function parametroRuta(mostrar) {
  const completRuta = path.resolve(mostrar);
  console.log(path.resolve(mostrar));
  compruebaExtension(completRuta);
  console.log(completRuta);
  return completRuta;
}

// valida que es un archivo .md
function compruebaExtension(mostrar) {
  const extPermitidas = '.md';
  // recupero la extensión de este nombre de archivo
  const extension = (mostrar.substring(mostrar.lastIndexOf('.'))).toLowerCase();
  // compruebo si la extensión está entre las permitidas

  if (extPermitidas === extension) {
    console.log('es md');
    leerArch(mostrar);
    return true;
  }
  console.log('Comprueba la extensión de los archivos a subir. \nSólo se pueden subir archivos con extensiones:' + extPermitidas);
}

// lee el archivo
function leerArch(mostrar) {
  fs.readFile(mostrar, 'utf-8', (err, data) => {
    if (err) throw err;
    markdownLinkExtractor(data);
  //  console.log(data);
  });
}

// Es necesario que instales marked como dependencia de tu proyecto
// npm install --save marked

// Función necesaria para extraer los links usando marked
// (tomada desde biblioteca del mismo nombre y modificada para el ejercicio)
// Recibe texto en markdown y retorna sus links en un arreglo
function markdownLinkExtractor(markdown) {
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
    });
  };
  renderer.image = function(href, title, text) {
    // Remove image size at the end, e.g. ' =20%x50'
    href = href.replace(/ =\d*%?x\d*%?$/, '');
    links.push({
      href: href,
      text: text,
      title: title,
    });
  };
  Marked(markdown, {renderer: renderer});
  // console.log(links);
  verificarlinks(links);
  return links;
};

// // para verificar estatus de links
function verificarlinks(links) {
  for (let i = 0; i < links.length; i++) {
    var elementLinks = links[i].href;
    // console.log(elementLinks);
    fetch(elementLinks).then((response) =>{
      return response;
    }).then(data => {
      console.log((data.url).cyan);
      console.log(data.status);
      console.log(data.statusText);
 
    }).catch(error =>{
      console.error(('Error:' + error.status).red)
    });
  }
}


module.exports = {
  parametroRuta,
};
