<template>
    <div class="mew-vid-screen mew-vid-picture" jc v-if="!$global.mobile">
        <i @click="togglePinP" title="Mini player and always front">
            <svg width="35" height="29" viewBox="0 0 35 29" fill="none" >
                <path fill-rule="evenodd" clip-rule="evenodd" d="M35 0H0V29H35V0ZM32 3H3V26H32V3Z"/>
                <path d="M16 13H30V24H16V13Z"/>
            </svg>
        </i>
    </div>
    <div class="mew-vid-screen mew-vid-cinema" jc>
        <i :title="v.cinematic ? 'Default view (V)' : 'Theater mode (V)'" @click="v.cinematic = !v.cinematic">
            <svg width="35" height="29" viewBox="0 0 35 29" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M35 0H0V29H35V0ZM32 3H3V26H32V3Z"/>
                <path d="M7 7H28V22H7V7Z"/>
            </svg>
        </i>
    </div>
    <div class="mew-vid-screen mew-vid-fullscreen" jc>
        <i :title="fullScreened ? 'Exit fullscreen (F)' : 'Enter fullscreen (F)'" @click="toggle">
            <svg v-if="!fullScreened" width="30" height="29" viewBox="0 0 30 29" fill="none">
                <path d="M9.89965 3.5H3.54751L3.5 11H0L0.0474933 0H9.89963L9.89965 3.5Z"/>
                <path d="M26.5475 3.5H19.3717L19.3716 0H29.9999L29.9524 11H26.5L26.5475 3.5Z"/>
                <path d="M26.5475 25.5V19H29.9999L30 29H19.3717L19.3717 25.5H26.5475Z"/>
                <path d="M0.0475038 19L0.0475259 29H9.70961L9.70959 25.5H3.50001L3.50001 19H0.0475038Z"/>
            </svg>
            <svg v-else width="30" height="29" viewBox="0 0 30 29" fill="none">
                <path d="M0.0476086 7.5H6.39974L6.44726 0H9.94726L9.89976 11H0.0476295L0.0476086 7.5Z"/>
                <path d="M22.8241 7.5H30L30 11H19.3717L19.4192 0H22.8716L22.8241 7.5Z"/>
                <path d="M22.8242 22.5V29H19.3718L19.3718 19H30L30.0001 22.5H22.8242Z"/>
                <path d="M9.70971 29L9.70969 19H0.0476074L0.0476303 22.5H6.25721L6.25721 29H9.70971Z"/>
            </svg>
        </i>
    </div>
</template>

<script>
export default {
    name: "mew-vid-screen",
    inject: ['v'],
    mounted(){
        this.prev = this.v.$el.previousSibling
        this.next = this.v.$el.nextSibling
        this.wrap = this.v.$el.parentNode

        let self = this
        document.addEventListener('fullscreenchange',self.checkFullScreen)
    },
    beforeUnmount() {
        let self = this
        document.removeEventListener('fullscreenchange',self.checkFullScreen)
    },
    data(){
        return {
            // 处理影院模式定位 dom
            prev: null,
            next: null,
            wrap: null,
            fullScreened: false
        }
    },
    watch:{
        'v.cinematic':function(val){
            if(val)
                document.getElementById('mew').appendChild(this.v.$el)
            else{
                if(this.prev)
                    this.wrap.insertBefore(this.v.$el, this.prev.nextSibling)
                else if(this.next)
                    this.wrap.insertBefore(this.v.$el, this.next)
                else
                    this.wrap.appendChild(this.v.$el)
            }
            this.$parent.$el.focus()
        }
    },
    methods:{
        togglePinP(){
            if(document.pictureInPictureElement)
                document.exitPictureInPicture()
            else
                this.v.el.requestPictureInPicture()
        },
        toggle(){
            if (!document.fullscreenElement)
                this.v.$el.requestFullscreen().catch(err => {
                    console.log(err)
                })
            else{
                document.exitFullscreen()
            }
        },
        checkFullScreen(){
            // fullscreen 默认自带 Esc 快捷键的，此方法是处理 Esc 退出全屏时的情况,
            // 当使用Esc退出时，更新数据状态
            this.fullScreened = Boolean(document.fullscreenElement)
        },
    }
}
</script>

<style lang="scss">
div.mew-vid-screen{
    width: 40px;
    i{
        cursor: pointer;
        opacity: .82;
        transition: opacity .1s ease, transform .3s cubic-bezier(0.84, -1.13, 0.16, 2);
        height: 18px;
        &:hover{
            opacity: 1;
            transform: scale(1.1);
        }
        path{
            fill: white
        }
    }
}
</style>