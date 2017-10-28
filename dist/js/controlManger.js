/*
* @Author: Charles Roger
* @Date:   2017-05-15 23:03:13
* @Last Modified by:   Charles Roger
* @Last Modified time: 2017-05-16 09:21:18
*/

//管理index
(function($, root){
    var ControlManager = function(length){
        this.index = 0;
        this.length = length;
    }

    ControlManager.prototype = {
        prev:function(){
            return this.getIndex(-1);
        },
        next:function(){
            return this.getIndex(1);
        },
        getIndex:function(val){
            var index = this.index;
            var len = this.length;
            var curIndex = (index+len+val) % len;
            this.index= curIndex;
            return curIndex;
        },
        constructor: ControlManager
    }

    root.ControlManager = ControlManager;

}(window.Zepto, window.player||(window.player = {})))