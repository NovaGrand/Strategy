<template>
    <div class="mew-flex" flex jc>
        <div ref="container" class="mew-flex-container" :class="{ visible: visible }" flex wrap >
            <slot></slot>
        </div>
    </div>
</template>

<script>

export default {
    name: "flex",
    mounted(){
        this.ob = new ResizeObserver(entries => {
            this.init()
        })
        this.ob.observe(this.$el)
    },
    beforeUnmount(){
        this.ob.disconnect()
    },
    data(){
        return {
            ob:null,
            visible: false
        }
    },
    methods:{
        init(){
            let items = this.$refs.container.children
            if( items.length === 0)
                return
            let x, y, z, s
            x = this.$el.offsetWidth
            y = items[0].offsetWidth
            z = items.length
            s = y * z
            for(let i=0;i<z;i++)
                if(items[i].offsetWidth !== y){
                    let str = 'Child elements within a Flex component have inconsistent sizes !'
                    console.log("%cMEW : %s","font-family:Arial;color: black; background: #b20000; font-size: 13px;padding: 1px 7px;border-radius:2px",str)
                    return
                }
            // 处理单行的情况
            if(x > s){
                this.$refs.container.style.width = s + 'px'
            }
            else{
                z = parseInt(x / y)
                this.$refs.container.style.width = y * z + 'px'
            }
            this.visible = true
        }
    }
}
</script>

<style lang="scss">
div.mew-flex{
    div.mew-flex-container{
        visibility: hidden;
        &.visible{
            visibility: visible;
        }
        img{
            object-fit: cover;
            vertical-align: top;
        }
    }

}
</style>