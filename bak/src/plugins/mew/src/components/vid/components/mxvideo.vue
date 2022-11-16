<template>
    <video fill @contextmenu.prevent controlsList="nodownload"
           @loadstart="initialize"
           @loadedmetadata="v.duration = $el.duration;$parent.$emit('load',$el.duration);autoplay()"
           @timeupdate="updateTime();$parent.$emit('playing',v.time)"
           @ended="initialize();$parent.$emit('end')"
           @waiting="v.loading = true;$parent.$emit('wait')"
           @canplay="v.loading = false"
           :autoplay="v.autoplay"
           :volume="v.volume"
           :poster="v.poster"
           :loop="v.loop"
           type="video/mp4"
    >
        <err/>
    </video>
</template>
<script>
import err from './err'
export default {
    name: "mew-vid-mxvideo",
    components:{ err },
    inject: ['v'],
    emits: ['load'],
    mounted(){
        this.v.el = this.$el
    },
    watch:{
        'v.playing': function(val){
            this.$parent.$emit(val ? 'play' : 'pause')
        }
    },
    methods:{
        initialize(){
            this.$el.playbackRate = 1
            this.v.time = 0
            this.v.rate = '1.0'
            if(!this.v.loop)
                this.v.playing = false
        },
        updateTime(){
            this.v.time = this.$el.currentTime
        },
        autoplay(){
            if(this.v.autoplay){
                this.v.volume = 0
                this.v.playing = true
            }
        }
    }
}
</script>

