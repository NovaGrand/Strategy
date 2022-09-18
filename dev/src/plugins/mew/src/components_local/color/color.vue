<template>
    <div class="mew-color" v-if="false"></div>
</template>
<script>
import { color } from '../../../mew'
export default {
    name: "mew-color",
    mounted(){
        let theme = localStorage.getItem('theme')
        if (!theme)
            theme = 'light'
        this.setColor(theme)
    },
    data(){
        return {
            color
        }
    },
    watch:{
        'color.theme': function (val, raw){
            if(raw)
                this.removeAttr(raw)
            this.setColor(val)
            localStorage.setItem('theme', val)
        }
    },
    methods:{
        setColor(name){
            document.body.setAttribute('mew-theme',name)
            color.theme = name
            this.addAttr(name)
        },
        addAttr(name){
            document.body.setAttributeNode(document.createAttribute(name))
        },
        removeAttr(name){
            document.body.removeAttribute(name)
        }
    }
}
</script>
