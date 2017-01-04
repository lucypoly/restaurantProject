const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const livereload = require('gulp-livereload');
const browserSync = require('browser-sync').create();
const browserify = require('gulp-browserify');
const imagemin = require('gulp-imagemin');
const imageResize = require('gulp-image-resize');

gulp.task('img', () =>
    gulp.src('app/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('app/dist/img'))
    );


gulp.task('sass', function () {
    return gulp.src('app/sass/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('app/dist/css'))
        .pipe(browserSync.stream());
});


gulp.task('js', function () {
    return gulp.src('app/js/**/*.js')
        .pipe(browserify())
        .pipe(gulp.dest('app/dist/js'));
});

gulp.task('application-watch', ['js'], function (done) {
    browserSync.reload();
    done();
});


gulp.task('serve', ['sass', 'js'], function () {
    browserSync.init({
        server: 'app'
    });

    gulp.watch(['app/sass/main.scss'], ['sass']);
    gulp.watch('app/src/**/*.js', ['application-watch']);
    gulp.watch(['app/*.html']).on('change', browserSync.reload);

});

gulp.task('default', ['serve', 'img'], function () {
    console.log('gulp is watching...')
});
