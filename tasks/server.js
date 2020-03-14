// Importar recursos do 'gulp'
const gulp = require('gulp')
const sync = require('browser-sync').create()

gulp.task('serve', () => {
  sync.init({
    server: {
      baseDir: './'
    }
  })

  gulp.watch('src/**/*.js').on('change', () => gulp.start('app.js'))
  gulp.watch('src/**/*.css').on('change', () => gulp.start('app.css'))
  gulp.watch('src/**/*.html').on('change', () => gulp.start('app.html'))
  gulp.watch('src/assets/**/*.*').on('change', () => gulp.start('app.assets'))
  gulp.watch('src/**/*').on('change', sync.reload)
})
