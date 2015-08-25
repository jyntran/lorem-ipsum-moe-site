var gulp        = require('gulp'),
    watch       = require('gulp-watch'),
    inject      = require('gulp-inject'),
    debug       = require('gulp-debug'),
    bowerFiles  = require('main-bower-files'),
    sass        = require('gulp-sass'),
    webserver   = require('gulp-webserver'),
    opn         = require('opn');

/////

var server = {
  host: 'moe.jyntran.ca',
  port: '8001'
}

var current = './';

var app = 'app/';
var dist = 'build/';
var test = 'test/';

var indexFile = app + 'index.html';
var specFile = test + 'spec.html';

var sourcePaths = {
  bower: bowerFiles(),
  views: app + 'partials/**/*.html',
  angular: [
    app + '**/*.module.js', 
    app + '**/*.controller.js',
    app + '**/*.service.js',
    app + '**/*.factory.js',
    app + '**/*.directive.js',
    app + '**/*.filter.js'
  ],
  styles: app + './css/**/*.scss',
  specs: test + '**/*.spec.js'
};

var destPaths = {
  bower: dist + 'bower',
  angular: dist + 'angular',
  styles: dist + 'css'
};

/////

gulp.task('bower', function(){
  return gulp.src(sourcePaths.bower)
    .pipe(gulp.dest(destPaths.bower));
})

gulp.task('watch-views', function(){
  return gulp.src(sourcePaths.views)
      .pipe(watch(sourcePaths.views));
});

gulp.task('angular', function(){
  return gulp.src(sourcePaths.angular)
    .pipe(gulp.dest(destPaths.angular));
})
gulp.task('watch-angular', function(){
  return gulp.src(sourcePaths.angular)
    .pipe(watch(sourcePaths.angular));
});

gulp.task('watch-styles', function(){
  return gulp.src(sourcePaths.styles)
      .pipe(watch(sourcePaths.styles))
      .pipe(sass())
      .pipe(gulp.dest(destPaths.styles));
});

gulp.task('watch-specs', function(){
  return gulp.src(sourcePaths.specs)
    .pipe(watch(sourcePaths.specs));
});

gulp.task('specs', function(){
  gulp.src(specFile)
      .pipe(inject(
        gulp.src(sourcePaths.bower,
          {read: false}),
          {name: 'bower'}))
      .pipe(inject(
        gulp.src(sourcePaths.angular,
          {read: false}),
          {name: 'angular'}))
      .pipe(inject(
        gulp.src(sourcePaths.specs,
          {read: false}),
          {name: 'specs'}))
      .pipe(gulp.dest(current));
});

gulp.task('index', ['bower', 'angular'], function(){
  gulp.src(indexFile)
      .pipe(inject(
        gulp.src([destPaths.bower + '/angular.js', destPaths.bower + '/**/*.js'],
          {read: false}),
          {ignorePath: dist, name: 'bower'}))
      .pipe(inject(
        gulp.src(destPaths.angular + '/**/*.js',
          {read: false}),
          {ignorePath: dist, name: 'angular'}))
      .pipe(inject(
        gulp.src(destPaths.styles)))
      .pipe(gulp.dest(dist));
});

gulp.task('webserver', ['build'], function() {
  gulp.src(dist)
    .pipe(webserver({
      host:             server.host,
      port:             server.port,
      livereload:       true,
      directoryListing: false
    }));
});

gulp.task('openbrowser', ['build'], function() {
  opn( 'http://' + server.host + ':' + server.port );
});

gulp.task('test', ['specs']);

gulp.task('build', ['bower', 'angular', 'index']);
gulp.task('watch', ['watch-angular', 'watch-views', 'watch-styles', 'watch-specs']);
gulp.task('default', ['build', 'webserver', 'watch', 'openbrowser']);