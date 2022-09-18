<template>
    <div id="mew-field-wrapper" :class="{ valid: selecting.target }"
         @click.self="unload"
         @mousewheel.self="unload"
    >
        <div ref="shadow" inline-block></div>
    </div>
</template>

<script>
import { selecting } from '../../../mew'
export default {
    name: "mew-field-wrapper",
    created(){
        this.selecting.wrapper = this
    },
    data(){
        return {
            selecting
        }
    },
    methods:{
        unload(){
            this.$el.style.paddingLeft = ''
            this.$el.style.paddingTop = ''
            this.$refs.shadow.style = ''
            this.$refs.shadow.parentNode.replaceChild(this.selecting.target.$el, this.$refs.shadow)
            this.$el.appendChild(this.$refs.shadow)
            if(this.selecting.keepFocus){
                this.selecting.target.$el.getElementsByTagName(this.selecting.target.area ? 'textarea' : 'input')[0].focus()
            }
            this.selecting.target = null
        },
    },
    watch:{
        'selecting.target': function(val){
            if(val){
                let dropList = this.selecting.target.$el.getElementsByClassName('mew-field-dropList')[0]
                // 当没有 ba bb 等边框属性时，变量会失效，需要单独设置 left 和 top
                let s_dl = getComputedStyle(dropList)
                if( s_dl.left === 'auto')
                    dropList.style.setProperty('--bl',0)
                if( s_dl.top === 'auto')
                    dropList.style.setProperty('--bt',0)
                if( s_dl.width === 'auto'){
                    dropList.style.setProperty('--bl',0)
                    dropList.style.setProperty('--br',0)
                }

                let s = getComputedStyle(this.selecting.target.$el)
                let r =  this.selecting.target.$el.getBoundingClientRect()
                let style = 'vertical-align:top;'
                    style += 'width:' + Math.round(r.width) + 'px;height:' + Math.round(r.height) + 'px;position:' + s.position + ';left:' + s.left + ';right:' + s.right + ';transform:' + s.transform
                this.$refs.shadow.style = style

                dropList.style.setProperty('--boxShadow', s.boxShadow)
                this.selecting.target.$el.parentNode.replaceChild(this.$refs.shadow, this.selecting.target.$el)
                this.$el.appendChild(this.selecting.target.$el)
                this.$el.style.paddingLeft = r.x + 'px'
                this.$el.style.paddingTop = r.y + 'px'
                this.selecting.keepFocus = true
                this.$nextTick(()=>{
                    if(val){
                        dropList.style.setProperty('--paddingTop', this.selecting.target.$el.offsetHeight + 'px')
                        // 处理下拉列表选项背景色
                        let arr = s_dl.color.split(',')
                        let clr = arr[0] + ',' + arr[1] + ',' + parseInt(arr[2]) + ', 0.04)'
                        dropList.style.setProperty('--hoverColor', clr)

                    }
                })
            }



        }
    },

}
</script>

<style lang="scss">
div#mew-field-wrapper{
    position: absolute;top: 0;left: 0;
    pointer-events: none;width: 0;height: 0;
    &.valid{
        pointer-events: auto;
        width: 100vw;height: 100vh;
    }
}
</style>