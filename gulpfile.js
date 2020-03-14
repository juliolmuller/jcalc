const gulp = require('gulp');
const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const uglifyJS = require('gulp-uglify');
const del = require('del');

// Definir tarefa 'pages'
gulp.task('pages', () => {
  return gulp
    .src('src/**/*.html')              // Selecionar todos os arquivos HTML
    .pipe(
      htmlmin({                        // Minificar arquivos HTML
        collapseWhitespace: true,      // Remover quebra de linhas e espaços em branco em excesso
        removeComments: true,          // Remover comentários
        minifyCSS: cleanCSS(),         // Minificar tags e atributos 'style'
        minifyJS: uglifyJS()           // Minificar tags e atributos 'script'
      })
    )
    .pipe(gulp.dest('docs'));          // Salvar arquivo gerado na pasta 'docs'
});

// Definir tarefa 'styles'
gulp.task('styles', () => {
  return gulp
    .src('src/**/*.css')               // Selecionar todos os arquivos CSS
    .pipe(cleanCSS())                  // Minificar arquivos CSS
    .pipe(concat('styles.min.css'))    // Concatenar multiplos arquivos em um único
    .pipe(gulp.dest('docs/css'));      // Salvar arquivo gerado na pasta 'docs'
});

// Definir tarefa 'scripts'
gulp.task('scripts', () => {
  return gulp
    .src('src/**/*.js')                // Selecionar todos os arquivos JavaScript
    .pipe(
      babel({                          // Transpilar JavaScript para melhorar compatibilidade para browsers antigos
        presets: ['@babel/env']
      })
    )
    .pipe(uglifyJS())                  // Minificar arquivos JavaScript
    .pipe(concat('scripts.min.js'))    // Concatenar multiplos arquivos em um único
    .pipe(gulp.dest('docs/js'));       // Salvar arquivo gerado na pasta 'docs'
});

// Definir tarefa 'assets'
gulp.task('assets', () => {
  return gulp
    .src('src/assets/**/*.*')          // Selecionar todos os demais tipos de arquivos
    .pipe(gulp.dest('docs/assets'));   // e copiá-los para a pasta 'docs'
});

// Definir tarefa 'clean'
gulp.task('clean', () => {
  return del(['./docs/**', '!./docs']);
});

// Definir tarefa principal
gulp.task('default', gulp.series('clean', gulp.parallel('pages', 'styles', 'scripts', 'assets')));
