#! /usr/bin/env node
// para que leea  el bin y me permita usar el md-link por consola
// 'use strict'; // es como un eslintr pero para ejecucion
// sudo npm install -g
// console.log(process.argv);para capturar el argumento que pasan en la terminal al lado de md.liks

const mdlinks = require('./lib/md-links').mdlinks;
if (require.main === module) {
  // el primero y el segundo se ignora esta vacio y el tercero se guarda 
  const [,, ...args] = process.argv;
  const options = {};
  // 
  if (args.includes('--validate')) options.validate = true;
  mdlinks(args[0], options).then((links)=>{
  // console.log(links)
    links.forEach(element => {
      if (options.validate) {
        console.log(`${(element.file.cyan)} : ${(element.line)} : ${element.href} : ${element.text} : ${element.status} :${element.statusText.yellow}`);
      } else {
        console.log(`${element.file.magenta} : ${element.line} : ${element.href.cyan} : ${element.text} `);
      }
    });
  }).catch(err =>{
  // console.log(err)
  });
}
module.exports = mdlinks;

// Nota: processcwd indica la carpeta donde esta parada en la terminal y entrega la ruta absoluta
