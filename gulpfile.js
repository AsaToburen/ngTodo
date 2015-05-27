var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache');
var minifycss = require('gulp-minify-css');

gulp.task('images', function(){
  gulp.src('./public/images/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('./public/dist/images'));
});

gulp.task('styles', function(){
  gulp.src(['./public/css/*.css'])
    .pipe(autoprefixer('last 2 versions'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('./public/dist/styles/'));
});

gulp.task('scripts', function(){
  return gulp.src('./public/scripts/*.js')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(concat('main.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('./public/dist/scripts/'));
});

gulp.task('default', ['images'], function(){
  gulp.watch("./public/css/*.css", ['styles']);
  gulp.watch("./public/scripts/*.js", ['scripts']);
  gulp.watch("*.html");
});