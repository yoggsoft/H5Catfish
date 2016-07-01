// Declaring Gulp
var gulp = require('gulp');
var pump = require('pump');
var uglify = require('gulp-uglify');

// Tasks
gulp.task('uglify',function(cb){
  pump([
        gulp.src('src/*.js'),
        uglify(),
        gulp.dest('build/')
    ],
    cb
  );
});
