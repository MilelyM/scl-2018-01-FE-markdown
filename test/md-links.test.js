const mdlinks = require('../lib/md-links');
// npm run test

test('deberia verificar el archivo .md', () => {
  expect(mdlinks.compruebaExtension('/home/laboratoria/Escritorio/proyectos/scl-2018-01-FE-markdown/README.md')).toBe(true);
});

test('deberia ser ruta absoluta', () => {
  expect(mdlinks.parametroRuta('README.md')).toBe('/home/laboratoria/Escritorio/proyectos/scl-2018-01-FE-markdown/README.md');
});
test('deberia obtener una respuesta', () => {
  expect.assertions(1);
  return expect(mdlinks.leerArch2('/home/laboratoria/Escritorio/proyectos/scl-2018-01-FE-markdown/README.md')).resolves.toBeTruthy();
});

test('deberia obtener una respuesta ', () => {
  expect.assertions(1);
  return expect(mdlinks.extraerLinea('/home/laboratoria/Escritorio/proyectos/scl-2018-01-FE-markdown/README.md')).resolves.toBeTruthy();
});  


test('deberia obtener una respuestar ', () => {
  expect.assertions(1);
  return expect(mdlinks.verificarlinks('https://developers.google.com/v8/')).resolves.toBeTruthy();
}); 
test('deberia obtener una respuesta ', () => {
  expect.assertions(1);
  return expect(mdlinks.mdlinks('/home/laboratoria/Escritorio/proyectos/scl-2018-01-FE-markdown/README.md', '--validate')).resolves.toBeTruthy();
});

