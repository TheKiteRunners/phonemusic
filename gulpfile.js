/*
* @Author: Charles Roger
* @Date:   2017-05-11 21:42:43
* @Last Modified by:   Charles Roger
* @Last Modified time: 2017-05-15 22:00:32
*/

var gulp = require('gulp');
var connect = require('gulp-connect');
var less = require('gulp-less');


//转换html文件
gulp.task('html', function(){
    gulp.src('./src/index.html')
        .pipe(connect.reload())
        .pipe(gulp.dest('./dist'));//写入命令
});

//转换less文件
gulp.task('css',function(){
    gulp.src('./src/css/*.less')
        .pipe(less())
        .pipe(connect.reload())
        .pipe(gulp.dest('./dist/css'));
})

//转换js文件
gulp.task('js', function(){
    gulp.src('./src/js/*.js')
        .pipe(connect.reload())
        .pipe(gulp.dest('./dist/js'));
})

//监听文件
gulp.task('watch', function(){
    gulp.watch('./src/index.html', ['html']);
    gulp.watch('./src/css/*.less', ['css']);
    gulp.watch('./src/js/*.js', ['js']);
})

//开服务器
gulp.task('server', function(){
    connect.server({
        port: 8080,
        livereload: true
    });
})

gulp.task('default', ['html', 'css', 'js','watch', 'server']);
