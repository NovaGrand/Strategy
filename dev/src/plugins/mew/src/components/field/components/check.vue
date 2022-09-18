<template>
    <div class="mew-field-check">
        <div class="mew-check-slot" v-if="slotted"><slot></slot></div>
        <div class="mew-check-mark" v-else :class="{ checked: checked, bg: bg }"><i></i></div>
        <div class="label" v-if="field.label">{{ field.label }}</div>
    </div>
</template>

<script>
export default {
    name: "mew-field-check",
    inject: ['field'],
    created(){
        this.slotted = this.$slots.default()[0].children.length > 0
        this.bg = this.field.$attrs.hasOwnProperty('bg')
    },
    data(){
        return {
            slotted: false,
            bg: false
        }
    },
    computed:{
        checked(){
            return this.field.value === 'mew-default' ? this.field.modelValue : this.field.modelValue === this.field.value
        }
    }
}
</script>
<style lang="scss">
div.mew-field-check{
    --c:inherit;--ac:inherit;--bdrd:inherit;--adjust-border:inherit;
    color: inherit;
    display: flex;align-items: center;justify-content: center;
    cursor: pointer;
    user-select: none;
    height: 100%;
    //line-height: 1;
    div.label{
        color: inherit;
        cursor: pointer;
        //height: 1.1em;
        font-size: 1.2em;
        margin-left: .5em;
        width: 100%;
        display: flex;justify-content: space-between;
    }
    div.mew-check-slot{
        width: 100%;height: 100%;
        display: flex;align-items: center;
    }
    div.mew-check-mark{
        z-index: 99999;
        --c:inherit;--ac:inherit;--bdrd:inherit;--adjust-border:inherit;
        position: relative;
        min-width: 1em;min-height: 1em;
        overflow: hidden;
        display: flex;justify-content: center;align-items: center;
        // 勾选框的边框颜色
        border: .5px solid rgba(var(--c), calc(var(--adjust-border) * var(--ac)));
        border-radius: var(--bdrd);
        &.bg{
            border: .5px solid rgba(255,255,255,calc(0.02 * var(--ac)));
        }
        &::before{
            border-radius: var(--bdrd);
            position: absolute;display: block;content: "";left: calc(-50% - 2px);top: calc(-50% - 2px);
            width:calc(100% + 4px);height:calc(100% + 4px);
            // checked 时的填充色
            border: .5em solid rgba(var(--c), calc(var(--adjust-border) * var(--ac)));
            transition: all 100ms cubic-bezier(.4,.0,.23,1);
        }
        i{
            position: relative;
            width: .32em;height: .6em;
            transform-origin: 50% 50%;
            transform: translateY(-.07em) rotate(45deg);
            &::before{
                content: "";left:0;bottom:0;background-color: var(--markColor,white);
                width: 0;height: .12em;

            }
            &::after{
                content: "";right:0;bottom:0;background-color: var(--markColor,white);
                width: .13em;height: 0;
            }
        }
        &.checked{
            &::before{
                left: 0;top: 0;width:0;height: 0;--adjust-border:0.04;
            }
            i{
                &::before{
                    animation: mew-mark-step-1 125ms 100ms cubic-bezier(.4,.0,.23,1) forwards;
                }
                &::after{
                    animation: mew-mark-step-2 125ms 225ms cubic-bezier(.4,.0,.23,1) forwards;
                }
            }
        }
    }
    @keyframes mew-mark-step-1 {
        0%{width: 0%}
        100%{width: 100%}
    }
    @keyframes mew-mark-step-2 {
        0%{height: 0%}
        100%{height: 100%}
    }
}


</style>
