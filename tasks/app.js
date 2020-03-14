const gulp = require('gulp')
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const htmlmin = require('gulp-htmlmin')
const uglifyJS = require('gulp-uglify')
const cleanCSS = require('gulp-clean-css')

gulp.task('app.html', () => {
  return gulp
    .src('src/**/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true,
      minifyCSS: cleanCSS(),
      minifyJS: uglifyJS()
    }))
    .pipe(gulp.dest('docs'))
})

gulp.task('app.css', () => {
  return gulp
    .src('src/**/*.css')
    .pipe(cleanCSS())
    .pipe(concat('app.css'))
    .pipe(gulp.dest('docs/styles'))
})

gulp.task('app.js', () => {
  return gulp
    .src('src/**/*.js')
    .pipe(babel({ presets: ['env'] }))
    .pipe(uglifyJS())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('docs/scripts'))
})

gulp.task('app.assets', () => {
  return gulp
    .src('src/assets/**/*.*')
    .pipe(gulp.dest('docs/assets'))
})

gulp.task('app', gulp.parallel('app.html', 'app.css', 'app.js', 'app.assets'))
