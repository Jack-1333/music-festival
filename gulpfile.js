// function task(done) {
//     console.log('Hello World')
//     done()
// }

// exports.task = task; //ejecuta la funcion
const { src, dest, watch, parallel } = require('gulp') //va sacar la funcion src de gulp
//const sass = require('sass') //usa la libreria sass
const sass = require('gulp-sass')(require('sass')) //usa la libreria gulp-sass para requerir la libreria de sass
const plumber = require('gulp-plumber')
const imagemin = require('gulp-imagemin') //importando la libreria gulp-imagemin
const cache = require('gulp-cache') //importando la libreria gulp-cache
const webp = require('gulp-webp')
const avif = require('gulp-avif')
//creando la funcion css
function css(done) {
    // src('src/scss/app.scss')//identificando el archivo sass
    src('src/scss/**/*.scss')//Ejecuta todos los archivos scss
    .pipe(plumber())//Si tiene problemas no se detiene
    .pipe(sass()) //se esta compilando
    .pipe(dest('build/css')) //Alamacenando el disco duro

    done(); //callback que aviza a gulp que ya termino
}
//creando la funcion imagemin para comprimir imagen
function images(done) {
    const options = {
        optimizationLevel: 3 //(objeto en js)la option va comprimir hasta 3 veces la imagen
    }
    src('src/img/**/*.{jpg, png}')//Ejecuta todos los archivos img
    .pipe( cache( imagemin(options) ) ) //va comprimir utilizando options y se va guardar en cache
    .pipe( dest('build/img') ) // va guardar en la carpeta build/img
    
    done();  //funcion que finaliza las acciones
}
function versionWebp(done) {
    const options = {
        quality: 50 //(objeto en js)la option va comprimir hasta 50 de calidad la imagen
    }
    src('src/img/**/*.{jpg, png}')//Ejecuta todos los archivos img
    .pipe( webp(options) ) //va comprimir utilizando options
    .pipe( dest('build/img') ) // va guardar en la carpeta build/img
    
    done();  //funcion que finaliza las acciones
}
function versionAvif(done) {
    const options = {
        quality: 50 //(objeto en js)la option va comprimir hasta 50 de calidad la imagen
    }
    src('src/img/**/*.{jpg, png}')//Ejecuta todos los archivos img
    .pipe( avif(options) ) //va comprimir utilizando options
    .pipe( dest('build/img') ) // va guardar en la carpeta build/img
    
    done();  //funcion que finaliza las acciones
}
//creando la funcion dev: desarrolador
function dev(done) {
    //  css(); //ejecute la funcio css
    //  done(); //tambien indicar la finalizacion
    watch('src/scss/**/*.scss', css);//Ejeccuta la funcion watch cuando hay algun cambio en la carpeta scss
    done();
}

exports.css = css;//ejecuntando la funcion css para que gulp pueda ejecutal el comando
exports.images = images;//ejecuntando la funcion images
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
//exports.dev = dev;ejecuntando la funcion dev
exports.dev = parallel(images, versionWebp, versionAvif, dev);//ejecuntando la funcion dev e images en paralelo