<template>
    <div class="mew-vid-timeline">
        <progress class="loaded" :value="v.buffered" :max="v.duration"/>
        <progress class="played" :value="v.time" :max="v.duration"/>
        <input v-model="v.time" @input="v.el.currentTime = time" :max="v.duration" min="0" type="range" step="any">
    </div>
</template>

<script>
export default {
    name: "timeline",
    inject: ['v'],
    data(){
        return {
            time: 0
        }
    },
    watch:{
        'v.time':function(val){
            this.time = val
        }
    },
    methods:{

    }
}
</script>

<style lang="scss">
div.mew-vid-timeline{
    position: relative;z-index: 1;
    width: 100%;
    height: 6px;
    border-radius: 2px;
    transition: all .1s linear;
    &:hover{
        input::-webkit-slider-thumb{
            transform: scale(4);
            opacity: 1;
        }
        progress{
            transform: scaleY(1);
        }
    }
    input{
        position: absolute;top: -9px;left: 0;
        width: 100%;height: calc(100% + 18px);
        background-color:transparent;
        -webkit-appearance: none;
        cursor: pointer;
        &::-webkit-slider-runnable-track{
            position: absolute;left: -2px;
            width: calc(100% + 4px);
        }
        &::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 4px;height: 4px;
            border-radius: 10px;
            background-color: #00bbff;
            opacity: 0;
            transition: all .2s;
        }
        &::-moz-range-thumb{

        }
    }
    progress{
        width: 100%;height: 100%;
        position: absolute;top: 0;left: 0;
        transform: scaleY(.4);
        transition: all .1s;
        &::-webkit-progress-bar{
            background-color: rgba(255,255,255,.3);
            border-radius: 2px;
        }
        &.played::-webkit-progress-value{
            background: #2dc7ff;
            border-radius: 2px;
        }
        &.loaded::-webkit-progress-value{
            background: rgba(255,255,255,.2);
        }
    }
}
</style>