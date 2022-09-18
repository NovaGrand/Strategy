<template>
    <!--主题颜色-->
    <color/>
    <!--蒙版容器-->
    <matte/>
    <!--消息容器-->
    <notes/>
    <field-wrapper></field-wrapper>
</template>

<script>
import matte from "./src/components_local/matte"
import color from './src/components_local/color'
import notes from './src/components_local/notes'
import fieldWrapper from './src/components_local/fieldWrapper'
export default {
    name: "mew-app",
    components:{
        matte, color, notes, fieldWrapper
    },
}
</script>

<style lang="scss">
div#mew{
    position: fixed;top: 0;left: 0;
    div.mew-vid{ // vid 组件剧院模式的容器
        height: 100vh!important;
        width: 100vw!important;
    }
}
</style>