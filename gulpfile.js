const gulp = require('gulp'),
      browsersync = require('browser-sync').create(),
      rename = require('gulp-rename'),
      plumber = require('gulp-plumber'),
      sass = require('gulp-sass'),
      csso = require('gulp-csso'),
      sourcemaps = require('gulp-sourcemaps'),
      postcss = require('gulp-postcss'),
      autoprefixer = require('autoprefixer'),
      uglify = require('gulp-uglify');

function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: './src'
    },

    port: 3000
  });

  done();
}

function browserSyncReload(done) {
  browsersync.reload();

  done();
}

function html() {
  return gulp
    .src('./src/**/*.html')
    .pipe(browsersync.stream());
}

function css() {
  return gulp
    .src('./src/scss/style.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename('style.min.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('src/css/'))
    .pipe(browsersync.stream());
}

function scripts() {
  return gulp
    .src('src/js/script.js')
    .pipe( uglify() )
    .pipe( rename('script.min.js') )
    .pipe( gulp.dest('src/js') );
}

function watchFiles() {
  gulp.watch('src/**/*.html', html);
  gulp.watch('src/scss/**/*', css);
  gulp.watch('src/js/**/*', scripts);
}

const watch = gulp.parallel(watchFiles, browserSync);

exports.css = css;
exports.watch = watch;
exports.default = watch;
