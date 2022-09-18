<script setup>
import { ref, reactive } from 'vue'

defineProps({
  msg: String
})

const state = reactive({
    num: 666
})
</script>

<template>
  <div class="home" red bg>
        <div>{{ state.num }}</div>
      <div blue bg>123</div>
<!--      <vid autoplay></vid>-->
  </div>
</template>

<style scoped lang="scss">
div.home{
    //background-color: red;
}
</style>
