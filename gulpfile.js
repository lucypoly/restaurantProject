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
const handlebars = require('gulp-compile-handlebars');
const fs = require('fs');
const rename = require("gulp-rename");


// HANDLEBARS

// make data and partials available in project
// compile handlebars templates - place in dist as .html files

gulp.task('handlebars', function () {
    var data = JSON.parse(fs.readFileSync('app/data/data.json'));
    // var templateData = {}, // data to pass into templates - using ./data/data.json above
    options = {
        ignorePartials: true, // ignores any unknown partials. Useful if you only want to handle part of the file
        // partials : {}, // Javascript object that will fill in partials using strings
        batch: ['app/partials'] // Javascript array of filepaths to use as partials
        // helpers : {
        //     capitals : function(str){
        //         return str.toUpperCase();
        //     }
        // } // javascript functions to stand in for helpers used in the handlebars files
    };
    return gulp.src('app/templates/**/*.hbs')
        .pipe(handlebars(data, options)) // using ./data/data.json file
        .pipe(rename(function (path) {
            path.extname = '.html';
        }))
        .pipe(gulp.dest('app/dist'))
        .pipe(livereload())
});

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
    return gulp.src('app/js/*.js')
        .pipe(browserify())
        .pipe(gulp.dest('app/dist/js'));
});

gulp.task('application-watch', ['js'], function (done) {
    browserSync.reload();
    done();
});


gulp.task('serve', ['sass', 'js', ], function () {
    browserSync.init({
        server: 'app'
    });

    gulp.watch(['app/sass/main.scss'], ['sass']);
    gulp.watch('app/js/*.js', ['application-watch']);
    gulp.watch(['app/*.html']).on('change', browserSync.reload);
    gulp.watch(['app/templates/**'], ['handlebars']);
    gulp.watch(['app/partials/*.hbs'], ['handlebars']);
    gulp.watch(['app/data/data.json'], ['handlebars']);

});

gulp.task('default', ['serve', 'img', 'handlebars'], function () {
    console.log('gulp is watching...')
});
