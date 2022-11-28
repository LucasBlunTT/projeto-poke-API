const { src } = require('gulp');
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

// Compilando o sass, adicionado autoprefixed e dando refresh na pagina
function compilaSass() {
    return gulp.src('scss/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false,
        }))
        .pipe(gulp.dest('css/'))
        .pipe(browserSync.stream());
}

// Tarefa do sass
gulp.task('sass', compilaSass);

// concatenando os plugins CSS em um arquivo plugin.css
function pluginsCSS() {
    return gulp.src('css/lib/*.css')
        .pipe(concat('plugins.css'))
        .pipe(gulp.dest('css/'))
        .pipe(browserSync.stream())
}

gulp.task('plugincss', pluginsCSS);

// Compilando os arquivos .js, e concatenando em um só chamado all .js
function gulpJs() {
    return gulp.src('js/scripts/*.js')
        .pipe(concat('all.js'))
        .pipe(babel({
            presets: ['@babel/env'] // Babel adicionado para converter o JS-ES 6 para versões antigas, assim garantindo funcionabilidade em navegadores antigos.
        }))
        .pipe(uglify()) // assim como SCSS fica minificado com o processamento, o uglify faz com que o JS fique minificado para produção
        .pipe(gulp.dest('js/'))
        .pipe(browserSync.stream());
}

// concatenando os plugins JAVASCRIPT em um arquivo plugin.js, para não usar as libs com declaração no HTML
function pluginsJs() {
    return gulp
        .src(['./js/lib/aos.min.js', './js/lib/swiper.min.js'])
        .pipe(concat('plugins.js'))
        .pipe(gulp.dest('js/'))
        .pipe(browserSync.stream());
}

gulp.task('pluginjs', pluginsJs);

// Tarefa do gulpjs
gulp.task('alljs', gulpJs)

// Funcao do browserSync
function browser() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    })
}

// Tarefa do browserSync
gulp.task('browser-sync', browser);

// Funcao do watch para alteracoes no SCSS e HTML
function watch() {
    gulp.watch('scss/*.scss', compilaSass);
    gulp.watch('css/lib/*.css', pluginsCSS);
    gulp.watch('*.html').on('change', browserSync.reload);
    gulp.watch('js/scripts/*.js', gulpJs);
    gulp.watch('js/lib/*.js', pluginsJs);
}

// Tarefa Watch
gulp.task('watch', watch)

// Tarefa default que executa o watch e o browserSync
gulp.task('default', gulp.parallel('watch', 'browser-sync', 'sass', 'plugincss', 'alljs', 'pluginjs'));