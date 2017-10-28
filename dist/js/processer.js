/*
* @Author: Charles Roger
* @Date:   2017-05-16 22:31:38
* @Last Modified by:   Charles Roger
* @Last Modified time: 2017-05-17 11:20:34
*/

(function($, root){

    var $scope = $(document.body);
    var startTime;
    var frameID;
    var audio;
    //转换时间
    function formatTime(time){
        var minute = Math.floor(time/60);
        var second = Math.floor(time - minute*60);
        if(minute < 10) {
            minute = '0' + minute;
        }
        if(second < 10){
            second = '0' + second;
        }
        return minute + ':' + second;
    }

    //渲染歌曲总时间
    function render(duration){
        var allTime = formatTime(duration);
        $scope.find('.all-time').text(allTime);
        $scope.find('.current-time').text('00:00');
        $scope.find('.pro-top').css('transform', 'translateX(-100%)');
    }

    //渲染当前时间和进度条
    function update(percentage) {
        $scope.find('.current-time').text(formatTime(audio.currentTime));
        $scope.find('.pro-top').css('transform', 'translateX(-'+(100-Math.floor(percentage*100))+'%)');
        // console.log(percentage);
        // console.log(100-Math.floor(percentage*100));

    }


    //开始进度渲染
    function start(index){

            audio = index;
            cancelAnimationFrame(frameID);
            //进度条渲染
            function frame(){
                var percentage = audio.currentTime / audio.duration;
                //console.log(typeof(percentage));
                if(percentage < 1) {
                    update(percentage);
                    frameID = requestAnimationFrame(frame);
                }else {
                    cancelAnimationFrame(frameID);
                }
                if(audioManger.getAudio().ended){
                    console.log('11');
                    $scope.find('.next-btn').trigger('click');
                }
            }
        frame();
    }

    function format(index){
        audio = index;
    }

    function stop(){
        cancelAnimationFrame(frameID);
    }

    root.processer = {
        render:render,
        start:start,
        stop:stop,
        update:update,
        format: format
    }

}(window.Zepto , window.player||(window.player={})))