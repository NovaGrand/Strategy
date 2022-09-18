<template>
    <div class="mew-vid-info" v-html="v.info" :style="style"></div>
</template>

<script>
export default {
    name: "mew-vid-info",
    inject:['v'],
    props:['x','y'],
    computed:{
        style(){
            return 'left: ' + this.x + 'px;top:' + this.y + 'px'
        }
    }
}
</script>

<style lang="scss">
div.mew-vid-info{
    position: absolute;color: #5bdeff;z-index: 10;
    max-width: 200px;
    background-color: rgba(0,0,0,.6);
    padding: 10px 20px;
    backdrop-filter: blur(6px);
    border-radius: 3px;
    font-size: 12px;
    outline: none;
}
</style>