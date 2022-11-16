import { defineStore } from 'pinia'

export default defineStore('main',{
    state:()=>{
        return {
            count: 10,
        }
    },
    getters:{
        double:state => {
            return state.count * 2
        }
    },
    actions:{ // 同步异步都可以
        async getCurrent(){
            this.count = await fetch('/abc.com/count')
        }
    }
})
