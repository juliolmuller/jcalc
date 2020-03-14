const gulp = require('gulp')
const del = require('del')

gulp.task('clear', () => {
  return del(['./docs/**', '!./docs'])
})
