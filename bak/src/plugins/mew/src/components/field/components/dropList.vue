<template>
    <div class="mew-field-dropList" v-show="field.selecting.target === field">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: "mew-field-dropList",
    inject: [ 'field' ]
}
</script>

<style lang="scss">
div.mew-field-dropList{
    // 继承边框
    --bt:inherit;--br:inherit;--bb:inherit;--bl:inherit;--bs:inherit;--adjust-border:inherit;--ac:inherit;
    --bdrd:inherit;--c:inherit;

    // 传递边距
    --pl:inherit;--xpl:inherit;--pr:inherit;--xpr:inherit;
    padding: var(--paddingTop) 0 0 0;

    box-shadow: var(--boxShadow);

    position: absolute;
    top: calc(var(--bt) * -0.5px);
    left: calc(var(--bl) * -0.5px);
    width: calc(100% + calc(var(--bl) * 0.5px) + calc(var(--br) * 0.5px));
    color: inherit; // bg 模式下需要
    background-color: inherit;
    backdrop-filter: blur(40px) brightness(1.2);
    border-radius: min(calc(var(--paddingTop) / 2), var(--bdrd));
    &>*{
        --pl:inherit;--xpl:inherit;--pr:inherit;--xpr:inherit;
        --bdrd:inherit;
        color: inherit; // bg 模式下需要
        position: relative;
        padding: .7em calc( var(--pr) * 1px + var(--xpr) * 1px ) .7em calc( var(--pl) * 1px + var(--xpl) * 1px );
        cursor: pointer;
        overflow: hidden;border-radius: 0;
        width: 100%;
        &:first-child{
            padding-top: 1.2em;
            &::before{
                height: calc(100% - 0.6em);
            }
        }
        &:last-child{
            border-bottom-left-radius: min(calc(var(--paddingTop) / 2), var(--bdrd));
            border-bottom-right-radius: min(calc(var(--paddingTop) / 2), var(--bdrd));
        }
        &::before{
            position: absolute;content: '';left: 0;bottom: 0;width: 100%;height: 100%;z-index: -1;
        }
        &:hover{
            &::before{
                background-color: var(--hoverColor);
            }
        }
    }
}
</style>