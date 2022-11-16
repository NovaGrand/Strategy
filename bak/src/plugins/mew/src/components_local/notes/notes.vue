<template>
    <div class="mew-notify" noselect>
        <TransitionGroup name="tikup" tag="ul">
            <toast v-for="(item, idx) in notes"
                   :close="item.close"
                   :class="item.class"
                   :color="item.color"
                   :title="item.title"
                   :stick="item.stick"
                   :delay="item.delay"
                   :text="item.text"
                   :icon="item.icon"
                   :css="item.style"
                   :key="item.id"
                   @remove="remove(item.id)"
            />
        </TransitionGroup>
    </div>
</template>

<script>
import { notes } from '../../../mew'
import toast from './toast'
export default {
    name: "mew-notes",
    mounted(){
    },
    components:{
        toast
    },
    data(){
        return {
            notes,
        }
    },
    methods:{
        remove(id){
            for(let i=0;i<this.notes.length;i++)
                if(this.notes[i].id === id){
                    this.notes.splice(i,1)
                    break
                }
        }
    }

}
</script>

<style lang="scss">
div.mew-notify{
    position: absolute;top: 0;left: calc(50vw - 180px);
    width: 360px;
    margin:0 auto;
}
</style>