<template>
    <div class="mew-field-string-label" :class="{ shrink: shrink }">
        <div class="border lft"/>
        <div class="border mid"/>
        <div class="border rgt"/>
        <div class="snapshot" ref="snapshot">{{ field.label }}</div>
        <label :class="{ nudge: nudge, bb: bb }">
            {{ field.label }}
        </label>
    </div>
</template>

<script>
export default {
    name: "mew-field-string-label",
    inject: ['field'],
    mounted(){
        let s = window.getComputedStyle(this.field.$el)
        // 处理 CSS 变量
        let property = {
            '--paddingLeft':'paddingLeft',
            '--border-style':'borderStyle',
            '--borderRadiusLeftTop':'borderTopLeftRadius',
            '--borderRadiusRightTop':'borderTopRightRadius',
            '--borderRadiusRightBottom':'borderBottomRightRadius',
            '--borderRadiusLeftBottom':'borderBottomLeftRadius',
            '--borderTopWidth':'borderTopWidth',
            '--borderRightWidth':'borderRightWidth',
            '--borderBottomWidth':'borderBottomWidth',
            '--borderLeftWidth':'borderLeftWidth',
        }
        for(let k in property)
            this.$el.style.setProperty(k, s[property[k]])

        // 处理缩放大小
        let x = Math.floor((parseInt(s.fontSize) / 5) - 3)
        let n = x < 0 ? 0.75 : 0.75 - x * 0.08
        if( n < 0.4 ) n = 0.4
        this.$el.style.setProperty('--scale',  n)

        // 处理有阴影情况下文字的偏移
        this.nudge = s.borderTopWidth === '0px'
        let attrs = this.field.$.attrs
        for(let k in attrs){
            // 处理只有下边框时的默认左内边距
            if(k.includes('bb')){
                this.bb = true
                // this.$el.style.setProperty('--lftWidth', '0px')
                // this.field.$el.style.setProperty('--pl', '0!important')
            }
        }
        this.$el.style.setProperty('--label-lineHeight',  this.field.$el.offsetHeight + 'px')
        this.snapshotWidth = this.$refs.snapshot.offsetWidth
        this.toggle()
    },
    data(){
        return {
            snapshotWidth:'',
            nudge: false,
            bb: false
        }
    },
    computed:{
        shrink(){
            let s = this.field.focus || this.field.modelValue || this.field.placeholder
            if(s) this.$nextTick(()=>{ this.toggle() })
            return s
        }
    },
    watch:{
        'field.label':function(val){
            this.$nextTick(()=>{
                this.snapshotWidth = this.$refs.snapshot.offsetWidth
                this.toggle()
            })
        }
    },
    methods:{
        toggle(){
            let x = this.snapshotWidth
            let y = 0.88 - (x / 50 - 1) * 0.05
            let n = this.shrink ? y : 1
            this.$el.style.setProperty('--label-width', this.snapshotWidth * n + 'px')
        }
    }
}
</script>

<style scoped lang="scss">
div.mew-field-string-label{
    font-family: 微软雅黑;
    pointer-events: none;
    position: absolute;left:calc(var(--borderLeftWidth) * -1);
    top: calc(var(--borderTopWidth) * -1);
    width: calc(100% + var(--borderLeftWidth) + var(--borderRightWidth));
    height: calc(100% + var(--borderTopWidth) + var(--borderBottomWidth));
    div.border{
        position: absolute;top: 0;
        display: inline-block;
        opacity: .5;
        height: 100%;
        border-style: var(--border-style);
        &.lft{
            left: 0;
            width: calc(var(--paddingLeft) + 2px);
            border-top-left-radius: var(--borderRadiusLeftTop);
            border-bottom-left-radius: var(--borderRadiusLeftBottom);
            border-top-width:var(--borderTopWidth);
            border-left-width:var(--borderLeftWidth);
            border-bottom-width:var(--borderBottomWidth);
            border-right: none;
        }
        &.mid{
            left: calc(var(--paddingLeft) + 2px);
            width: var(--label-width);
            border-bottom-width:var(--borderBottomWidth);
            border-top-width:var(--borderTopWidth);
            border-right: none;
            border-left: none;
        }
        &.rgt{
            right: 0;
            width: calc(100% - calc(var(--paddingLeft) + 2px) - var(--label-width));
            border-top-width:var(--borderTopWidth);
            border-right-width:var(--borderRightWidth);
            border-bottom-width:var(--borderBottomWidth);
            border-top-right-radius: var(--borderRadiusRightTop);
            border-bottom-right-radius: var(--borderRadiusRightBottom);
            border-left: none;
        }
    }
    div.snapshot{
        //letter-spacing: 1.5px;
        visibility: hidden;
        position: absolute;
    }
    label{
        //letter-spacing: 1.5px;
        position: absolute;top:0;left: calc(var(--paddingLeft) + 6px);
        transform: scale(1);
        transform-origin: left top;
        height: 100%;
        line-height: calc(var(--label-lineHeight) - .1em);
        transition: all .1s linear;
        filter: saturate(.6);
        opacity: .7;
    }
    &.shrink{
        div.border.mid{
            border-top-color: transparent;
        }
        label{
            top: -0.2em;
            line-height:0px;
            transform: scale(var(--scale));
            &.nudge{
                top: -0.7em;
            }
        }
    }
}
</style>