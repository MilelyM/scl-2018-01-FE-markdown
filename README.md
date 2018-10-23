# Markdown buscador links
Es una Herramienta  que lee y analiza archivos
en formato `Markdown` usando [Node.js](https://nodejs.org/), para verificar los links que contengan, que muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

![Markdown](https://user-images.githubusercontent.com/39282714/47372707-ac71bc80-d6c0-11e8-9103-abc622dd1039.jpeg)

## Desarrollado para 
[Laboratoria](http://laboratoria.la)


npm i md-links-search-md
https://www.npmjs.com/package/md-links-search-md

 ## ¿Que es Markdown?

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...), y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

## ¿Que es Node.js?

[Node.js](https://nodejs.org/es/) es un entorno de ejecución para JavaScript
construido con el [motor de JavaScript V8 de Chrome](https://developers.google.com/v8/).
Esto nos va a permitir ejecutar JavaScript en el entorno del sistema operativo,
ya sea tu máquina o un servidor, lo cual nos abre las puertas para poder interactuar con
el sistema operativo, sistema de archivos, redes, etc...


## INSTALACIÓN
```sh
Módulo instalable via :`npm install -g https://github.com/MilelyM/scl-2018-01-FE-markdown` 
```
o
- [link del módulo publicado en npm](https://www.npmjs.com/package/md-links-search-md) 

### USO

- Documentación de la Librería (Features, link de Demo, test, etc...).
- Ejemplos (_snippets_) de uso.

Y todo lo relevante para que cualquier developer que quiera usar tu librería pueda hacerlo sin inconvenientes

### VERSIÓN
- Versión.0.0.2.

### CLI (Línea de comando)

El ejecutable la aplicación se presenta de la siguiente
manera a través de la terminal:

`md-links <path-to-file> [options]`

Por ejemplo:

```sh
$ md-links ./some/example.md
./some/example.md:10 http://algo.com/2/3/ Link a algo
./some/example.md:15 https://otra-cosa.net/algun-doc.html algún doc
./some/example.md:40 http://google.com/ Google
```


##### `--validate`

Si pasamos la opción `--validate`, el módulo hace una petición HTTP para
verificar si el link funciona o no. Si el link resulta en una redirección a una
URL que responde ok, entonces consideraremos el link como ok.

Por ejemplo:

```sh
$ md-links ./some/example.md --validate
./some/example.md:10 http://algo.com/2/3/ ok 200 Link a algo
./some/example.md:15 https://otra-cosa.net/algun-doc.html fail 404 algún doc
./some/example.md:40 http://google.com/ ok 301 Google
```



