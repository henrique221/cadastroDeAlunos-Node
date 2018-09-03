var gulp = require('gulp');

gulp.task('copy', function () {
    gulp.src('./node_modules/bootstrap/dist/*/*')
        .pipe(gulp.dest('./public/assets'));
});