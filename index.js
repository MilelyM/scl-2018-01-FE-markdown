#! /usr/bin/env node 
// para que leea  el bin y me permita usar el md-link por consolas
//'use strict'; es como un eslintr pero para ejecucion
// sudo npm install -g
// console.log(process.argv);para capturar el argumento que pasan en la terminal al lado de md.liks

//var calculator = require('./lib/md-links');
const colors = require('colors');

var mdlinks = require('./lib/md-links');

const [,, ...args] = process.argv
mdlinks.parametroRuta(args[0])


//console.log(`Add ${a} + ${b} ${calculator.add(args[0])}`.yellow);

//const colors = require('colors');



/*var a = 3;
var b = 5;

console.log(`Minus ${a} + ${b} = ${calculator.minus(a,b)}`.red);
console.log(`Multiply ${a} + ${b} = ${calculator.multiply(a,b)}`.blue);
console.log(`Divide ${a} + ${b} = ${calculator.divide(a,b)}`.grey);
console.log('hola'.zebra)
console.log(`Hola ${args}`.bgCyan)
*/
// isabsolut
//cwd indica la carpeta donde esta parada en la terminal y entrega la ruta absoluta

// buffer , readfile
