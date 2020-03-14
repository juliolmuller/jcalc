const gulp = require('gulp')
const { env } = require('gulp-util')
const sequence = require('run-sequence')

require('./tasks/app')
require('./tasks/clear')
require('./tasks/server')

gulp.task('default', () => {
  if (env.production) {
    sequence('clear', 'app')
  } else {
    sequence('clear', 'app', 'serve')
  }
})
