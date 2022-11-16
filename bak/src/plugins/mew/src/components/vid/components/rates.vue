<template>
    <div class="mew-vid-rates">
        <div class="mew-vid-rates-value" xs>
            {{ v.rate }}
        </div>
        <ul v-show="valid" @mouseleave="valid = false" >
            <li v-for="rate in v.rates" :class="{ current: rate === v.rate }" @click="v.rate = rate">{{ rate }}</li>
        </ul>
    </div>
    <!--        <i>-->
    <!--            <svg width="48" height="25" viewBox="0 0 48 25" fill="none">-->
    <!--                <path fill-rule="evenodd" clip-rule="evenodd" d="M0 5C0 2.23858 2.23858 0 5 0V1C2.5 1 1 3 1 5L0 5ZM0 7.5V11.5H1V7.5H0ZM0 14V17.5H1V14H0ZM0 20H1C1 22 3 24 5 24L5 25C2.23858 25 0 22.7614 0 20ZM7 1H10.5V0H7V1ZM16 1H12.5V0H16V1ZM18 1H21.5V0H18V1ZM24 1V0H43C45.7614 0 48 2.23858 48 5V20C48 22.7614 45.7614 25 43 25H24V24H43C45 24 47 22 47 20V5C47 3 45 1 43 1H24ZM10.5 25H7V24H10.5V25ZM12.5 25H16V24H12.5V25ZM21.5 25H18V24H21.5V25Z"/>-->
    <!--            </svg>-->
    <!--        </i>-->
</template>

<script>
export default {
    name: "mew-vid-rates",
    inject: ['v'],
    data(){
        return {
            valid: true,
        }
    },
    watch:{
        valid(val){
            if(!val){
                let t = setTimeout(()=>{
                    this.valid = true
                    clearTimeout(t)
                },500)
            }

        },
        'v.rate':function(val){
            this.valid = false
            this.v.el.playbackRate = Number(val)
        }
    },

}
</script>

<style lang="scss">
div.mew-vid-rates{
    margin-left: 20px;
    position: relative;
    height: 24px;
    display: flex;align-items: center;
    justify-content: center;
    cursor: pointer;
    div.mew-vid-rates-value{
        border-radius: 2px;
        color: rgba(255,255,255,.9);
        background-color: rgba(255,255,255,.15);
        border: .5px solid rgba(0,0,0,.6);
        width: 36px;height: 20px;
        text-align: center;line-height: 17px;
        padding:1px 0 0 0;
        transform: translateY(1px);
    }
    &:hover{
        ul{
            transform: scaleY(1);
        }
    }
    //i{
    //    height: 22px;
    //    text-align: center;
    //    cursor: pointer;
    //    &.text{
    //        font-size: 12px;
    //        position: absolute;left: 3.5px;top:3.5px;
    //        color: black;
    //        background-color:rgba(255,255,255,.8);
    //        width: 35.5px;height: 15px;line-height: 15px;
    //        border-radius: 2px;
    //        font-weight: bold;
    //        text-align: left;padding-left: 4px;
    //        transform: scale(1);
    //        i{
    //            opacity: .5;
    //            height: 8px;line-height: 8px;
    //            vertical-align: middle;
    //        }
    //    }
    //    path{
    //        fill:rgba(255,255,255,.6);
    //    }
    //}
    ul{
        position: absolute;bottom:40px;left: -8px;z-index: 10;
        transform: scaleY(0);
        transform-origin: center bottom;
        transition: transform 0s .4s;
        &:hover{
            transform: scaleY(1);
        }
        &::before{
            width: 70px;height: 200px;content: '';
            top: -5px;left: -5px;
        }
        li{
            color: rgba(255,255,255,.8);
            cursor: pointer;
            list-style: none;
            width: 60px;
            height: 30px;line-height: 21px;text-align: center;
            background-color:rgba(0,0,0,.5);
            backdrop-filter: blur(12px);
            &.current{
                color: #00bbff;
                cursor: default;
            }
            &:hover{
                color: rgba(255,255,255,1);
                background-color:rgba(0,0,0,.2);
            }
            &:first-child{
                border-radius: 3px 3px 0 0;
            }
            &:last-child{
                border-radius: 0 0 3px 3px;
            }
        }
    }
}
</style>