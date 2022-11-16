<template>
    <div class="Learn_1" fill jc pt-xl grey darken bg>
        <div column ac>
            <h3 ref="h3" my-md lg>Babylon.js Learn 1</h3>
            <canvas ref="canvas" bv grey bg width="1200" height="600"></canvas>
        </div>

    </div>
</template>
<script setup>
import Stage from './Stage'
const canvas = ref()
onMounted(()=>{
    let s = new Stage(canvas.value)
})

</script>

<style scoped>

</style>