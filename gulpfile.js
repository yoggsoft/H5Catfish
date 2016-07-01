// Declaring Gulp
'use strict';
var gulp = require('gulp'),
pump = require('pump'),
uglify = require('gulp-uglify'),
watch = require('gulp-watch');

var path={
    script:
    {
      src:'src',
      dest:'build'
    }
  };

// Tasks
gulp.task('uglify',function(cb){
  pump([
        gulp.src(path.script.src+"/*.js"),
        uglify(),
        gulp.dest(path.script.des+"build/")
    ],cb);
});
gulp.task('watch',function(){
  gulp.watch(path.script.src,['uglify']);
});

gulp.task('default',['uglify']);
