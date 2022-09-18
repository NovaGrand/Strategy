<template>
    <div class="mew-fit" :class="{ contain: contain }"><slot></slot></div>
</template>

<script>
export default {
    name: "mew-fit",
    mounted(){
        this.init()
    },
    updated(){
        this.init()
    },
    props:{
        contain:{
            type: Boolean,
            default: false
        }
    },
    methods:{
        init(){
            let items = this.$el.children
            if(items.length === 0){
                let str = 'No element was fund in <fit> component !'
                console.log("%cMEW : %s","font-family:Arial;color: black; background: #b20000; font-size: 13px;padding: 1px 7px;border-radius:2px",str)
                return
            }
            if(items.length > 1){
                let str = 'More than one elements were fund in <fit> component, this component can only hold one element.'
                console.log("%cMEW : %s","font-family:Arial;color: black; background: #b20000; font-size: 13px;padding: 1px 7px;border-radius:2px",str)
                return
            }
            items[0].classList.add('mew-fit-item')
        },
    }

}
</script>

<style lang="scss">
div.mew-fit{
     overflow: hidden;display: block;
    .mew-fit-item{
        background-size: cover!important;
        object-fit: cover;
        width:100%;
        height: 100%;
    }
    &.contain{
        .mew-fit-item{
            object-fit: contain;
        }
    }
}
</style>