<template>
    <button class="mew-btn" :class="{ vanilla: vanilla, disabled: disabled, foo: n === 1, bar: n === 2 }" @click="click">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: "mew-btn",
    emits: ['click'],
    props:{
        disabled:{
            type:Boolean,
            default: false
        },
        vanilla:{
            type:Boolean,
            default: false
        }
    },
    data(){
        return {
            n: 0
        }
    },
    methods:{
        click(){
            this.$emit('click')
            this.n = this.n === 1 ? 2 : 1
        }
    }
}
</script>

<style lang="scss" scoped>
@import 'scss/btn.scss';
</style>