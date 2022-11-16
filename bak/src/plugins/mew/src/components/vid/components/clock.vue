<template>
    <div class="mew-vid-clock" jc>
        <i>{{ time }}</i><i>{{ duration }}</i>
    </div>
</template>

<script>
export default {
    name: "mew-vid-clock",
    inject: ['v'],
    computed:{
        time(){
            return this.parse(this.v.time)
        },
        duration(){
            return this.parse(this.v.duration)
        },
    },
    methods:{
        parse(time){
            let min = parseInt(time / 60)
            if(min < 10) min = '0' + min
            let sec = parseInt(time % 60)
            if(sec < 10) sec = '0' + sec
            return min + ':' + sec
        }
    }
}
</script>

<style lang="scss">
div.mew-vid-clock{
    flex-grow: 0;
    width: 120px;
    height: 20px;line-height: 18px;margin-top: 6px;
    i{
        color: #dddddd;
        font-size: 13px;
        &:last-child{

            margin-left: 18px;
            position: relative;
            &::before{
                position: absolute;left: -12px;top: 0;content: '/';
                font-size: 12px;
                transform: skew(10deg);
            }
        }
    }
}
</style>