var gulp        = require('gulp'),
    watch       = require('gulp-watch'),
    inject      = require('gulp-inject'),
    debug       = require('gulp-debug'),
    sass        = require('gulp-sass'),
    nodemon     = require('gulp-nodemon'),
    wiredep     = require('wiredep').stream;

/////

var current = './';
var client = current + 'src/client/';
var server = current + 'src/server/';

var app = client + 'app/';
var dist = current + 'dist/';
var test = client + 'test/';
var style = client + 'style/';
var bower = current + 'bower_components/';

var indexFile = app + 'index.html';
var specFile = test + 'spec.html';

var sourcePaths = {
  views: app + 'partials/**/*.html',
  angular: [
    app + '**/*.module.js', 
    app + '**/*.controller.js',
    app + '**/*.service.js',
    app + '**/*.factory.js',
    app + '**/*.directive.js',
    app + '**/*.filter.js'
  ],
  styles: [
    style + '**/*.scss'
  ],
  mocks: bower + 'angular-mocks/angular-mocks.js',
  specs: test + '**/*.spec.js'
};

var destPaths = {
  angular: dist + 'angular',
  styles: dist + 'style'
};

/////

gulp.task('angular', function(){
  return gulp.src(sourcePaths.angular)
    .pipe(gulp.dest(destPaths.angular));
})

gulp.task('styles', function(){
  return gulp.src(sourcePaths.styles)
    .pipe(watch(sourcePaths.styles))
    .pipe(sass())
    .pipe(gulp.dest(destPaths.styles));
})

gulp.task('specs', function(){
  return gulp.src(specFile)
      .pipe(wiredep({
        devDependencies: true,
        ignorePath: '../../..',
        exclude: [
          bower + 'angular-mocks/*',
          bower + 'pure/*',
          bower + 'normalize.css/*'
        ]
      }))
      .pipe(inject(
        gulp.src(sourcePaths.mocks,
          {read: false}),
          {name: 'mocks'}))
      .pipe(inject(
        gulp.src(sourcePaths.angular,
          {read: false}),
          {name: 'angular'}))
      .pipe(inject(
        gulp.src(sourcePaths.specs,
          {read: false}),
          {name: 'specs'}))
      .pipe(gulp.dest(dist));
});

gulp.task('index', ['angular', 'styles'], function(){
  return gulp.src(indexFile)
      .pipe(wiredep({
        ignorePath: '../../..'
      }))
      .pipe(inject(
        gulp.src(sourcePaths.angular,
          {read: false}),
          {name: 'angular'}))
      .pipe(inject(
        gulp.src(destPaths.styles + '**/*.css')))
      .pipe(gulp.dest(dist));
});

gulp.task('start', function () {
  nodemon({
    script: server + 'app.js',
    ext: 'js',
    env: { 'NODE_ENV': 'development' }
  })
})

gulp.task('test', ['specs', 'start']);

gulp.task('build', ['index']);
gulp.task('default', ['test', 'build', 'start']);