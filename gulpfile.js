const gulp = require("gulp");
const replace = require("gulp-replace");
const zip = require("gulp-zip");
const del = require("del");
const pkg = require("./package.json");

/**
 * distディレクトリを圧縮する
 */
gulp.task("zip", () => {
  return gulp
    .src(`./dist/${pkg.version}/**/*`, {
      base: `./dist/${pkg.version}`
    })
    .pipe(zip(`${pkg.version}.zip`))
    .pipe(gulp.dest("dist"));
});

/**
 * distディレクトリにバージョン切ってコピーする
 */
gulp.task("copy_dist", () => {
  return gulp
    .src("./src/**/*")
    .pipe(gulp.dest(`./dist/${pkg.version}`))
    .pipe(gulp.dest(`./dist/latest`));
});

/**
 * manifest.jsonのバージョンをpackage.jsonに合わせる
 */
gulp.task("manifest_version_replace", () => {
  return gulp
    .src("./src/manifest.json")
    .pipe(replace("{{VERSION}}", pkg.version))
    .pipe(gulp.dest(`./dist/${pkg.version}`))
    .pipe(gulp.dest(`./dist/latest`));
});

gulp.task("clean", () => {
  const distDir = `./dist/${pkg.version}`;
  const distDirLatest = `./dist/latest`;
  const zipPath = `./dist/${pkg.version}.zip`;

  return del([distDir, distDirLatest, zipPath]);
});

/**
 * distディレクトリを圧縮する
 */
gulp.task(
  "packaging",
  gulp.series(
    "clean",
    "copy_dist",
    "manifest_version_replace",
    "zip",
    (done) => {
      done();
    }
  )
);
