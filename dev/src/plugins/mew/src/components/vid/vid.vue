<template>
    <div class="mew-vid" relative noselect style="background-color: black!important;">
        <!--视频元素-->
        <mxvideo/>
        <!--控制界面-->
        <control/>
    </div>
</template>

<script>
import mxvideo from './components/mxvideo'
import control from './components/control'
import codec from './mixins/codec'
export default {
    name: "mew-vid",
    components:{
         mxvideo, control
    },
    emits:[ 'load', 'play', 'pause', 'playing', 'wait', 'end' ],
    mixins:[ codec ],
    data(){
        return {
            el: null,     // video 元素
            time: 0,      // 当前进度
            rate: '1.0',  // 播放速度
            loop: true,

            buffered: 0,  // 加载进度
            duration: 0,  // 总时长
            playing: false,
            loading: false,
            volume: .6,

            cinematic: false, // 影院模式
        }
    },
    props:{
        poster:{ // 视频播放开始前的封面，若空，则以视频第一帧为封面
            type: String,
            default: ''
        },
        autoplay:{
            type: Boolean,
            default: false
        },
        rates:{
            type: Array,
            default: [ '0.2', '0.5', '1.0', '1.5', '2.0' ]
        },
        info:{
            // setting 按钮、鼠标右键时的信息
            type: String,
            default: ''
        }
    },
    provide() {
        return {
            v:this
        }
    },
}
</script>
