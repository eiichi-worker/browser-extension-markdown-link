const gulp = require('gulp');
const replace = require('gulp-replace');
const zip = require('gulp-zip');
const del = require('del');
const rs = require('run-sequence');
const pkg = require('./package.json');

/**
 * distディレクトリを圧縮する
 */
gulp.task('packaging', (callback) => {
  return rs('clean', 'copy_dist', 'manifest_version_replace', 'zip', callback)
});

/**
 * distディレクトリを圧縮する
 */
gulp.task('zip', () => {
  return gulp.src(`./dist/${pkg.version}/**/*`, {
      base: `./dist/${pkg.version}`
    })
    .pipe(zip(`${pkg.version}.zip`))
    .pipe(gulp.dest('dist'));
});

/**
 * distディレクトリにバージョン切ってコピーする
 */
gulp.task('copy_dist', () => {
  return gulp.src('./src/**/*')
    .pipe(gulp.dest(`./dist/${pkg.version}`));
});

/**
 * manifest.jsonのバージョンをpackage.jsonに合わせる
 */
gulp.task('manifest_version_replace', () => {
  return gulp.src('./src/manifest.json')
    .pipe(replace('{{VERSION}}', pkg.version))
    .pipe(gulp.dest(`./dist/${pkg.version}`));
});

gulp.task('clean', (callback) => {
  const distDir = `./dist/${pkg.version}`
  const zipPath = `./dist/${pkg.version}.zip`
  return del([distDir, zipPath], callback)
});