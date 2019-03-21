let gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');
let htmlmin = require('gulp-htmlmin');
let babel = require('gulp-babel');
let uglify = require('gulp-uglify-es').default;
let sourcemaps = require('gulp-sourcemaps');

gulp.task('minify-css', () => {
    return gulp
        .src('./src/css/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('scripts', function () {
    return gulp
        .src(['node_modules/babel-polyfill/dist/polyfill.js', 'src/js/*.js'])
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(babel({presets: ['es2015']}))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('dist/js'))
});

gulp.task('pages', function () {
    return gulp
        .src(['./src/html/*.html'])
        .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
        .pipe(gulp.dest('./dist/html'));
});
