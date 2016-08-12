const gulp = require('gulp'),
  sass = require('gulp-ruby-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  cleanCSS = require('gulp-clean-css'),
  rename = require("gulp-rename"),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify')

gulp.task('process-styles', () => {
  // turns sass from src into css in dest
  return sass('src/styles/main.scss', {style: 'expanded'})
    .on('error', sass.logError)
    // does prefixing for specifed browser compatability
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('dest/styles/'))
    // copies the piped file and renames it to dest
    .pipe(rename({suffix: '.min'}))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dest/styles/'))
})

gulp.task('process-scripts', () => {
  return gulp.src('src/scripts/*.js')
    // creates new file, main.js, at dest with content of all .js files in scripts directory
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dest/scripts'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dest/scripts'))
})

gulp.tast('watch', () => {
  gulp.watch('src/scripts/*.js', ['process-scripts'])
})

gulp.task('default', () => {
  console.log("hello!")
})
