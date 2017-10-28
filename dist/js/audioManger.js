/*
* @Author: Charles Roger
* @Date:   2017-05-16 09:12:23
* @Last Modified by:   Charles Roger
* @Last Modified time: 2017-05-17 11:07:54
*/

//播放音乐模块
(function($, root){
    var $scope = $(document.body);
    var AudioManger = function(){
        this.audio = new Audio();
        this.status == 'pause';
    }

    AudioManger.prototype = {
        bindEvent:function(){
            $(this.audio).on('ended', function(){
                console.log('11');
                $scope.find('.next-btn').trigger('click');
            })
        },

        play:function(){
            this.audio.play();
            this.status = 'play';
        },

        pause:function(){
            this.audio.pause();
            this.status = 'pause';
        },
        //设置音频地址
        setAudioSource:function(src){
            this.audio.src = src;
            this.audio.load();
        },
        getAudio: function(){
            return this.audio;
        }

    }

    root.AudioManger = AudioManger;

}(window.Zepto, window.player||(window.player={})))