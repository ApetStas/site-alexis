var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    browserSync = require('browser-sync'),
    imagemin    = require('gulp-imagemin'),
    autoprefixer= require('gulp-autoprefixer'),
    cleanCSS    = require('gulp-clean-css'),
    concat      = require('gulp-concat');

gulp.task('sass', function(){
    return gulp.src(['project/sass/main.scss'])
    .pipe(sass({outputStyle:"expanded"}).on('error',sass.logError))
    .pipe(gulp.dest('project/css'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('js',function(){
    return gulp.src([
        'project/libs/jquery/dist/jquery.min.js',
        'project/libs/jquery/dist/jquery.slim.js',
        'project/libs/mmenu/dist/jquery.mmenu.all.js',
        'project/libs/owl.carousel/dist/owl.carousel.min.js',
        'project/js/common.js'
    ])
    .pipe(concat('scripts.min.js'))
    .pipe(gulp.dest('project/js'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'project'
		},
		notify: false,
	});
});

gulp.task('watch',['sass', 'js', 'browser-sync'], function(){
    gulp.watch(['project/sass/**/*.scss'],['sass']);
    gulp.watch(['project/js/common.js'],['js']);
    gulp.watch('project/*.html', browserSync.reload);
});

gulp.task('minimg', () =>{
    return gulp.src('project/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
});
gulp.task('prefix-clean', () =>
    gulp.src('project/css/main.css')
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css'))
);


gulp.task('default',['watch']);
