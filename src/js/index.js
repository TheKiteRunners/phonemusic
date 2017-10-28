/*
* @Author: Charles Roger
* @Date:   2017-05-14 21:51:41
* @Last Modified by:   Charles Roger
* @Last Modified time: 2017-05-17 11:19:01
*/
var $ = window.Zepto;
var $scope = $(document.body);
var root = window.player;
var dataUrl = '/mock/data.json';
var render = root.render;
var processer = root.processer;
var audioManger = new root.AudioManger();
var controlManager;
var songList;


//绑定touch事件
function bindTouch(){
    $slidePoint = $scope.find('.slide-point');
    var offset = $scope.find('.pro-wrapper').offset();
    var left = offset.left;
    var width = offset.width;
    $slidePoint.on('touchstart', function(){
        processer.stop();
    }).on('touchmove', function(e){
        var x = e.changedTouches[0].clientX;
        //console.log(x);
        var percentage = (x - left)/width;
        if(percentage <= 0){
            percentage = 0;
        }else if(percentage >= 1){
            percentage = 1;
        }
        processer.update(percentage);
    }).on('touchend', function(e){
        var x = e.changedTouches[0].clientX;
        var percentage = (x - left)/width;
        if(percentage <= 0){
            percentage = 0;
        }else if(percentage >= 1){
            percentage = 1;
        }

        var nowTime = audioManger.getAudio().duration * percentage;
        audioManger.getAudio().currentTime = nowTime;
        audioManger.play();
        processer.start(audioManger.getAudio());
        $scope.find('.play-btn').addClass('playing');
    })
}


$scope.on('play:change', function(event, index) {
    var curData = songList[index];
    render(curData);
    audioManger.setAudioSource(curData.audio);
    processer.render(curData.duration);
    //audioManger.bindEvent();
})


$scope.on('click', '.prev-btn', function(){
    //render(songList[]);
    $scope.trigger('play:change', controlManager.prev());
    audioManger.play();
        processer.start(audioManger.getAudio());
        $scope.find('.play-btn').addClass('playing');
})


$scope.on('click', '.next-btn', function(){
    //render(songList[controlManager.next()]);
    $scope.trigger('play:change', controlManager.next());
    audioManger.play();
        processer.start(audioManger.getAudio());
        $scope.find('.play-btn').addClass('playing');
})

//点击播放按钮
$scope.on('click', '.play-btn', function(){
    if(audioManger.status === 'play'){
        audioManger.pause();
        processer.stop();
    }else{
        audioManger.play();
        processer.start(audioManger.getAudio());
    }

    $(this).toggleClass('playing');
    //如果有playing这个属性就给去除, 没有加上
})


function successCallback(data) {
    songList = data;
    bindTouch();
    controlManager = new root.ControlManager(data.length);
    //audioManger.bindEvent();
    //render(data[0]);
    $scope.trigger('play:change', 0);
}

function getData(url, callback) {
    $.ajax({
        url: url,
        type: 'GET',
        success: callback,
        error: function(){
            console.log('error');
        }
    })
}

getData(dataUrl, successCallback);


window.onload = function(){
    processer.format(audioManger.getAudio());
}