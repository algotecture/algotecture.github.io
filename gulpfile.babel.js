import del          from 'del'
import gulp         from 'gulp'
import sass         from 'gulp-sass'
import bs           from 'browser-sync'
import babel        from 'gulp-babel';
import cache        from 'gulp-cache'
import concat       from 'gulp-concat'
import uglify       from 'gulp-uglify'
import notify       from 'gulp-notify'
import rename       from 'gulp-rename'
import imagemin     from 'gulp-imagemin'
import cleanCSS     from 'gulp-clean-css'
import autoprefixer from 'gulp-autoprefixer'
import paths        from './config';

const browserSync = bs.create()

// remove dist
gulp.task('clean', () => {
    del([ paths.dist ])
})

// clear all cache
gulp.task('clear-cache', () => {
    cache.clearAll()
})

// reload all things after something is change
gulp.task('browser-sync', () => {
    browserSync.init({
		server: `./${paths.dist}`,
		notify: false
    })
})

// compile all scss to css and copy to the appropriate directory
gulp.task('styles', () => {
    return gulp.src(paths.styles.src, { sourcemaps: true })
      .pipe(sass({ outputStyle: 'expand '}).on("error", notify.onError()))
      .pipe(rename({ basename: 'main', suffix: '.min' }))
      .pipe(autoprefixer(['last 15 versions']))
      .pipe(cleanCSS())
      .pipe(gulp.dest(paths.styles.dist))
      .pipe(browserSync.stream())
})

// concatenate all js files, uglify all of them and copy to the appropriate directory
gulp.task('scripts', () => {
    return gulp.src(paths.scripts.src, { sourcemaps: true })
      .pipe(babel())
      .pipe(uglify())
      .pipe(concat('main.min.js'))
      .pipe(gulp.dest(paths.scripts.dist))
      .pipe(browserSync.stream())
})

// copy all fonts to the appropriate directory
gulp.task('fonts', () => {
    gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.dist))
})

// copy all htmls to the appropriate directory
gulp.task('html', () => {
    return gulp.src(paths.html.src)
        .pipe(gulp.dest(paths.html.dist))
        .pipe(browserSync.stream())
})

// copy all videos to the the appropriate directory
gulp.task('video', () => {
    return gulp.src(paths.videos.src)
        .pipe(gulp.dest(paths.videos.dist))
})

// minify images and copy to the appropriate directory
gulp.task('image-minify', () => {
    return gulp.src(paths.images.src, { sourcemaps: true })
    .pipe(cache(imagemin()))
    .pipe(gulp.dest(paths.images.dist))
})

// watch for changes
gulp.task('watch', ['fonts', 'html', 'styles', 'scripts','image-minify', 'video', 'browser-sync'], () => {
    gulp.watch(paths.scripts.src, ['scripts'])
    gulp.watch(paths.styles.src, ['styles'])
    gulp.watch(paths.html.src, ['html']).on('change', browserSync.reload)
})

// build all project
gulp.task('build', [ 
     'image-minify',
     'video',
     'styles', 
     'scripts', 
     'fonts', 
     'html'
])

//
gulp.task('default', ['watch'])
