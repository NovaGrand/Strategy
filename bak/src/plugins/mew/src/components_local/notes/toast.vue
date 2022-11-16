<template>
    <li flex relative class="mew-toast" :class="[ names ]"
        :style="sheet"
        @mouseenter="hold = true"
        @mouseleave="hold = false"
    >
        <i class="mew-toast-icon" :class="['mew-icon-' + icon]" v-if="icon"></i>
        <div class="mew-toast-ctx" flex column>
            <i class="mew-toast-title" v-if="title">
                {{ title }}
            </i>
            <i class="mew-toast-texts">
                {{ text }}
            </i>
        </div>
        <i class="mew-icon-form-close" v-if="close" @click="$emit('remove')"/>
    </li>
</template>

<script>
import props from './mixin/props'
import colors from './colors'
export default {
    name: "mew-toast",
    emits:['remove'],
    mixins:[ props ],
    data(){
        return {
            hold: false,
            timer: null,
            trial: 0,
        }
    },
    mounted(){
        if(!this.stick){
            this.trial = parseInt(this.delay)
            this.timer = setInterval(()=>{
                if(!this.hold){
                    this.trial -= 1
                    if(this.trial <= 0)
                        this.$emit('remove')
                }
            },1000)
        }
    },
    beforeUnmount(){
        clearInterval(this.timer)
    },
    computed:{
        theme(){
            return this.color ? colors[this.color] : false
        },
        sheet(){
            let str = ''
            if(this.theme)
                str += 'color:' + this.theme.fontColor + ';background-color:' + this.theme.backgroundColor + ';'
            if(this.css)
                str += this.css
            return str
        },
        names(){
            let str = ''
            if(this.icon) str += 'pl '
            if(this.close) str += 'pr '
            if(this.title) str += 'title '
            return str + this.class
        }
    },

}
</script>

<style lang="scss">
li.mew-toast{
    color:#0058c4;
    background-color: rgba(220,235,255,.92);
    width: 100%;
    min-height: 52px;
    margin: 10px 0;
    font-size: 15px;
    overflow: hidden;
    border-radius: 8px;
    letter-spacing: .5px;
    padding: 16px 20px 15px 20px;
    box-shadow: 0 1px 1px rgba(0,0,0,.1), 0 0 2px rgba(0,0,0,.1), 0 0 8px rgba(0,0,0,.1);
    &.pl{
        padding-left: 45px;
    }
    &.pr{
        padding-right: 34px;
    }
    &.title{
        i.mew-toast-icon{
            top: 12.8px;
        }
    }
    i.mew-toast-icon{
        position: absolute;
        left: 11px;top: 16.5px;
        font-size: 20px;
        opacity: .7;
    }
    div.mew-toast-ctx{
        width: 100%;
        i.mew-toast-title{
            font-size: 17px;font-weight: bold;
            line-height: 15px;
            padding-bottom: 10px;
            width: 100%;
        }
        i.mew-toast-texts{
            font-size: 15px;
            height: 100%;
            text-align: justify;
            width: 100%;
        }
    }
    i.mew-icon-form-close{
        position: absolute;
        top: 16.5px;right: 9px;
        font-size: 16px;
        transform: scale(1);
        transition: transform .1s ease;
        cursor: pointer;
        &:hover{
            transform: scale(1.3);
        }
    }
}
</style>