#! /usr/bin/env node
// para que leea  el bin y me permita usar el md-link por consolas
// 'use strict'; es como un eslintr pero para ejecucion
// sudo npm install -g
// console.log(process.argv);para capturar el argumento que pasan en la terminal al lado de md.liks

// const colors = require('colors');

const mdlinks = require('./lib/md-links');

const [,, ...args] = process.argv;
mdlinks.parametroRuta(args[0]);



/* mdLinks(rutaAbsot)
  .then(links => {
    // => [{ href, text, file }]
  })
  .catch(console.error);

mdLinks(rutaAbsot, { validate: true })
  .then(links => {
    // => [{ href, text, file, status, ok }]
  })
  .catch(console.error);
// isabsolut
// cwd indica la carpeta donde esta parada en la terminal y entrega la ruta absoluta
// buffer , readfile*/
