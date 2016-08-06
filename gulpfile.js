'use strict'

var _ = require('lodash')
var gulp = require('gulp')
var merge = require('gulp-merge-json');
var watch = require('gulp-watch')


gulp.task('build', build)
gulp.task('watch', function() {
  watch(['./sports/**/*.js'], function(file) {
    console.log('File changed:', file.path)
    build()
  })
})

function build() {
  return gulp.src(['./sports/**/*.json'])
    .pipe(merge({
      fileName: 'sports.json',
      jsonSpace: '  ',
      edit: function(parsedJson, file) {
        let sport = file.relative.split('/')[0]
        let defType = file.relative.split('/')[1]
        let module = _.last(parsedJson.key.split('_'))
        let base = {}
        if(defType == 'standings') {
          _.set(base, `${sport}.${defType}`, parsedJson)
        } else {
          _.set(base, `${sport}.${defType}.${module}`, parsedJson)
        }
        return base
      }
    }))
    .pipe(gulp.dest('./dist'))
}
