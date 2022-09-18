<template>
    <div class="mew-vid-control" :class="{ visible: visible }" fill column je tabindex="0"
         @keydown.prevent="keydown"
         @mouseenter="$el.focus();actived = true"
    >
        <div class="mew-vid-viewport" @click="v.playing = !v.playing" jc ac
             @dblclick="$.components.screen.methods.toggle.call(this)"
             @mousemove="actived = true"
             @contextmenu.prevent="showInfo"
        >
            <div class="mew-vid-loading" jc ac v-if="v.loading">
                <spinner fill/>
            </div>
        </div>
        <!--这里必须用 v-show，否则播放按钮会有混乱BUG-->
        <div v-show="visible" class="mew-vid-bench" column je @mouseenter="handle('mouseenter')"
             @contextmenu.prevent
             @mouseleave="handle('mouseleave')">
            <!--进度条-->
            <timeline/>
            <div ac col-25 style="position: relative;z-index: 10">
                <!--播放按钮-->
                <playBtn/>
                <!--播放时间-->
                <clock/>
                <div style="flex-grow: 1"/>
                <!--播放速度-->
                <rates/>
                <!--播放设置-->
                <setting/>
                <!--音量-->
                <volume/>
                <!--窗口控制-->
                <screen/>
            </div>
        </div>
        <timeline v-show="!visible" nd-md style="pointer-events: none"/>
        <info ref="info" tabindex="0" v-show="contextmenu.valid" v-if="v.info"
              @blur="contextmenu.valid = false"
              :x="contextmenu.x"
              :y="contextmenu.y"
        />
    </div>
</template>

<script>
import timeline from "./timeline";
import playBtn from './playBtn'
import clock from './clock'
import rates from './rates'
import setting from './setting'
import volume from './volume'
import screen from './screen'
import spinner from '../../../components_local/utils/spinner'
import info from './info'
export default {
    name: "mew-vid-control",
    inject: ['v'],
    components:{
        spinner, timeline, playBtn, clock, rates, setting, volume, screen, info
    },
    mounted(){
        // 必须先 focus 才能使用快捷键
        this.$el.focus()
    },
    beforeUnmount(){
        this.timers.forEach(t => { if(t) clearTimeout(t) })
    },
    data(){
        return {
            stopped: true,  // 播放是否已停止
            actived: false, // 鼠标是否在视口移动
            hovered: false, // 鼠标是否在控制台上
            timers: [ null, null, null ],
            contextmenu:{
                x:0,
                y:0,
                valid: false
            }
        }
    },
    watch:{
        'v.playing': function(val){
            if(this.timers[0])
                clearTimeout(this.timers[0])
            if(!val)
                this.stopped = true
            else{
                this.timers[0] = setTimeout(()=>{
                    this.stopped = false
                    clearTimeout(this.timers[0])
                    this.timers[0] = null
                },2500)
            }
        },
        'actived': function(val){
            if(val)
                this.timers[1] = setTimeout(()=>{
                    this.actived = false
                    clearTimeout(this.timers[1])
                    this.timers[1] = null
                },2500)
        },
        'hovered': function(val){
            if(val && this.timers[2]){
                console.log(1)
                clearTimeout(this.timers[2])
                this.timers[2] = null
            }
        }
    },
    computed:{
        visible(){
            return this.stopped || this.actived || this.hovered
        }
    },
    methods:{
        showInfo(event){
            if(this.v.info){
                this.contextmenu.x = event.offsetX
                this.contextmenu.y = event.offsetY
                this.contextmenu.valid = true
                this.$nextTick(()=>{
                    this.$refs.info.$el.focus()
                })
            }
        },
        keydown(){
            switch(event.code){
                case 'Escape':
                    this.v.cinematic = false
                    break
                case 'ArrowRight':
                    this.v.el.currentTime += 2
                    break
                case 'ArrowLeft':
                    this.v.el.currentTime -= 2
                    break
                case 'Enter':
                case 'Space':
                    this.v.playing = !this.v.playing
                    break
                case 'ArrowUp':
                    this.v.volume = this.v.volume < 0.9 ? Number(this.v.volume) + 0.1 : 1
                    break
                case 'ArrowDown':
                    this.v.volume = this.v.volume > 0.1 ? this.v.volume - 0.1 : 0
                    break
                case 'KeyM':
                    this.$.components.volume.methods.toggle.call(this)
                    break
                case 'KeyF':
                    this.$.components.screen.methods.toggle.call(this)
                    break
                case 'KeyV':
                    this.v.cinematic = !this.v.cinematic
                    break
            }
        },
        handle(name){
            if(name === 'mouseenter'){
                if(this.timers[2]){
                    clearTimeout(this.timers[2])
                    this.timers[2] = null
                }
                this.hovered = true
            }
            else
                this.timers[2] = setTimeout(()=>{
                    this.hovered = false
                    clearTimeout(this.timers[2])
                    this.timers[2] = null
                },1000)
        },
    }
}
</script>
<style lang="scss">
div.mew-vid-control{
    position: absolute;left: 0;top: 0;
    background-size: cover;
    outline: none;
    height: 100%;
    &::before{
        position: absolute;content: '';left: 0;bottom: 0;width: 100%; height: 140px;
        background: linear-gradient(0deg, rgba(0,0,0,0) 20%, rgba(0,0,0,0) 100%);
        transition: background .1s linear;
    }
    &.visible{
        &::before{
            background: linear-gradient(0deg, rgba(0,0,0,.6) 20%, rgba(0,0,0,0) 100%);
        }
    }
    div.mew-vid-viewport{
        position: absolute;top: 0;left: 0;
        width: 100%;
        height: calc(100% - 65px);
        div.mew-vid-loading{
            position: relative;
            width: 120px;height: 120px;
            border-radius: 100px;
            &::before{
                position: absolute;width: 80px;height: 80px;content: '';z-index: -1;
                left: 20px;top: 20px;
                border-radius: 100px;
                box-shadow: 0 0 50px rgba(0,0,0,.4);
                background-color: rgba(0,0,0,.16);
            }
        }
    }
    div.mew-vid-bench{
        width: 100%;
        height: 65px;
        padding: 6px 16px;
    }
}
</style>