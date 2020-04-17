/// <binding AfterBuild='default' Clean='clean' />
/*
This file is the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');
var del = require('del');

var paths = {
    scripts: ['scripts/**/*.js', 'scripts/**/*.ts', 'scripts/**/*.map'],
};
// Jak wyknamy clean na projkecie/solucji, tutaj mamy podpięta akcję do
// wyczyszczenia skomilowanych plików JSowych w wwwwroot/scripts.
gulp.task('clean', function () {
    return del(['wwwroot/scripts/**/*']);
});
// Definiuje build: pobierz z katalogu scripts (zdef. w obiekcie paths),
// skompilowane źródła zapisz w katalogu wwwroot/scripts.
gulp.task('default', function () {
    gulp.src(paths.scripts).pipe(gulp.dest('wwwroot/scripts'));
});