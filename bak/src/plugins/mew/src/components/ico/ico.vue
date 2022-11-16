<template>
    <i class="mew" :class="[name, tink, still]"></i>
</template>

<script>
export default {
    name: "mew-icon",
    data(){
        return {
            tink:''
        }
    },
    props:{
        dense:{
            type: Boolean,
            default: false
        }
    },
    watch:{
        name(){
            this.tink = this.tink === 'foo' ? 'bar' : 'foo'
        }
    },
    computed:{
        name(){
            return this.$slots.default ? 'mew-icon-' + this.$slots.default()[0].children : ''
        },
        still(){
            return this.dense ? 'dense' : ''
        }
    }
}
</script>
<style scoped lang="scss">
i.mew:not(.dense){
    @keyframes foo {
        0%{transform: scale(1.05)}
        10%{transform: scale(1.1)}
        100%{transform: scale(1)}
    }
    @keyframes bar {
        0%{transform: scale(1.05)}
        10%{transform: scale(1.1)}
        100%{transform: scale(1)}
    }
    &.foo{
        animation: foo .6s cubic-bezier(0.84, -1.13, 0.16, 3);
    }
    &.bar{
        animation: bar .6s cubic-bezier(0.84, -1.13, 0.16, 3);
    }
}
</style>