<template>
    <div class="mew-field-label" :class="{ shrink: shrink, activated: field.activated, noborder: field.select }">
        <i class="rim_1"></i><i class="rim_2"></i><i class="rim_3"></i>
        <div class="shot">
            {{ field.label }}
        </div>
        <label :class="{ nudgeUp: field.select || nudgeUp }">
            {{ field.label }}
        </label>
    </div>
</template>

<script>
export default {
    name: "mew-field-label",
    inject: ['field'],
    mounted(){
        // console.log(this.field.$attrs.hasOwnProperty('bg'))
        // 处理无边框时的 BUG
        let s1 =getComputedStyle(this.$el)
        if(parseInt(s1.height) === 0)
            this.$el.style = 'height: 100%;width: 100%;left: 0;top: 0;'

        let s0 = getComputedStyle(this.field.$el)
        this.nudgeUp = (s0.boxShadow !== 'none' && s0.borderTopWidth === '0px') || this.field.$attrs.hasOwnProperty('bg')

        // 处理文字缩放大小
        let x = Math.floor((parseInt(s0.fontSize) / 5) - 3)
        let n = x < 0 ? 0.75 : 0.75 - x * 0.08
        if( n < 0.4 ) n = 0.4
        this.$el.style.setProperty('--scale', n)

        // 获取标签原始尺寸
        this.labelWidth = this.$el.getElementsByClassName('shot')[0].offsetWidth
        this.labelHeight = this.field.$el.offsetHeight
    },
    data(){
        return {
            nudgeUp: false,
            labelWidth:'',
            labelHeight:'',
        }
    },
    watch:{
        labelWidth(val){
            this.$el.style.setProperty('--labelWidth', val + 'px')
        },
        labelHeight(val){
            this.$el.style.setProperty('--labelHeight', val + 'px')
        },
        'field.label':function(val){
            this.$nextTick(()=>{
                // 当标签内容改变时，重新获取宽度
                this.labelWidth = this.$el.getElementsByClassName('shot')[0].offsetWidth
            })
        }
    },
    computed:{
        shrink(){
            return this.field.focus || this.field.modelValue || this.field.placeholder
        },
    },
}
</script>

<style lang="scss">
div.mew-field-label{
    --bt:inherit;--br:inherit;--bb:inherit;--bl:inherit;--bs:inherit;--c:inherit;--adjust-border:inherit;--ac:inherit;
    --bdrd:inherit;
    --pl:inherit;--xpl:inherit;
    position: absolute;
    pointer-events: none;
    color: inherit;
    --width:calc(calc( var(--pl) * 1px + var(--xpl) * 1px ) - .15em);
    --gapWidth:var(--labelWidth);
    left: calc(calc(var(--bl) * 0.5px) * -1);
    top: calc(calc(var(--bt) * 0.5px) * -1);
    width: calc(calc(var(--bl) * 0.5px) + 100% + calc(var(--br) * 0.5px));
    height: calc(calc(var(--bt) * 0.5px) + 100% + calc(var(--bb) * 0.5px));
    border: none;
    --paddingLeft:calc( var(--pl) * 1px + var(--xpl) * 1px );
    &.noborder{
        border-color: transparent;
        i{
            display: none;
        }
    }
    i{
        position: absolute;top: 0;height: 100%;
        --bt:inherit;--br:inherit;--bb:inherit;--bl:inherit;--bs:inherit;--c:inherit;--adjust-border:inherit;--ac:inherit;
        --bdrd:inherit;
        &.rim_1{
            left: 0;width: var(--width);
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
            border-right: none;
        }
        &.rim_2{
            left:  var(--width);
            width: var(--gapWidth);
            border-radius: 0;
            border-right: none;
            border-left: none;
        }
        &.rim_3{
            left: calc(var(--width) + var(--gapWidth));
            width: calc(100% - var(--paddingLeft) - var(--gapWidth) + calc(var(--br) * 0.5px));
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            border-left: none;
        }
    }
    div.shot{
        display: inline-block;
        visibility: hidden;
        position: absolute;
    }
    label{
        position: absolute;top:0;left: calc(var(--paddingLeft));
        transform: scale(1);
        transform-origin: left top;
        height: 100%;
        line-height: calc(var(--labelHeight) + .06em);
        filter: saturate(.6);
        opacity: .7;
    }
    &.shrink{
        color: rgba(var(--c), calc(0.04 * var(--ac)));
        --gapWidth:calc(var(--labelWidth) * var(--scale) + .4em);
        i.rim_2{
            border-top: none;
        }
        label{
            top: -0.1em;
            line-height:0px;
            transform: scale(var(--scale));
            &.nudgeUp{
                left: 1px;
                top: -0.6em;
            }
        }
    }
    &.activated{
        label{
            transition: all 100ms linear;
        }
        &.noborder{
            label{
                transition-delay: 100ms;
            }
        }
    }

}
</style>