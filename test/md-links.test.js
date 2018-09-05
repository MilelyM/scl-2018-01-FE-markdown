const mdlinks = require('../lib/md-links');
// npm run test

// test('deberia ser un link', () => {
//   expect(verificarlinks('links')).toBe('https://github.com/stevekane/promise-it-wont-hurt');
//  });
test('deberia verificar el archivo .md', () => {
  expect(mdlinks.compruebaExtension('/home/laboratoria/Escritorio/proyectos/scl-2018-01-FE-markdown/README.md')).toBe(true);
});

test('the data is peanut butter', () => {
  expect(mdlinks.parametroRuta('README.md')).toBe('/home/laboratoria/Escritorio/proyectos/scl-2018-01-FE-markdown/README.md');
});