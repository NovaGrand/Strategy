<template>
    <div class="mew-vid-volume" v-if="!$global.mobile">
        <div class="mew-vid-volume-wrapper">
            <div class="slider">
                <progress :value="v.volume" max="1"/>
                <input type="range" v-model="v.volume" step="any" min="0" max="1">
            </div>
            <i :class="[tink]" @click="toggle" :title="v.volume === 0 ? 'Unmute (M)' : 'Mute (M)'">
                <svg v-if="v.volume >= 0.6" width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <path d="M7 16V31.0641H12L23 41V6L12 16H7ZM32.143 24C32.143 20.1653 29.9087 16.8723 26.6669 15.2691V32.7092C29.9087 31.1277 32.143 27.8347 32.143 24ZM26.6669 5V9.46294C32.9973 11.3261 37.6191 17.1323 37.6191 24C37.6191 30.8677 32.9973 36.6739 26.6669 38.5371V43C35.4506 41.0285 42 33.2725 42 24C42 14.7275 35.4506 6.97149 26.6669 5Z"/>
                </svg>
                <svg v-else-if="v.volume >= 0.3 && v.volume < 0.6" width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <path d="M26.6669 5V9.46294C32.9973 11.3261 37.6191 17.1323 37.6191 24C37.6191 30.8677 32.9973 36.6739 26.6669 38.5371V43C35.4506 41.0285 42 33.2725 42 24C42 14.7275 35.4506 6.97149 26.6669 5Z" fill-opacity="0.5"/>
                    <path d="M7 16V31.0641H12L23 41V6L12 16H7ZM32.143 24C32.143 20.1653 29.9087 16.8723 26.6669 15.2691V32.7092C29.9087 31.1277 32.143 27.8347 32.143 24Z" />
                </svg>
                <svg v-else-if="v.volume > 0 && v.volume < 0.3" width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <path d="M26.6669 5V9.46294C32.9973 11.3261 37.6191 17.1323 37.6191 24C37.6191 30.8677 32.9973 36.6739 26.6669 38.5371V43C35.4506 41.0285 42 33.2725 42 24C42 14.7275 35.4506 6.97149 26.6669 5Z" fill-opacity="0.5"/>
                    <path d="M32.143 24C32.143 20.1653 29.9087 16.8723 26.6669 15.2691V32.7092C29.9087 31.1277 32.143 27.8347 32.143 24Z" fill-opacity="0.5"/>
                    <path d="M7 16V31.0641H12L23 41V6L12 16H7Z"/>
                </svg>
                <svg v-else width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <path d="M26.6669 5V9.46294C32.9973 11.3261 37.6191 17.1323 37.6191 24C37.6191 30.8677 32.9973 36.6739 26.6669 38.5371V43C35.4506 41.0285 42 33.2725 42 24C42 14.7275 35.4506 6.97149 26.6669 5Z" fill="white" fill-opacity="0.5"/>
                    <path d="M32.143 24C32.143 20.1653 29.9087 16.8723 26.6669 15.2691V32.7092C29.9087 31.1277 32.143 27.8347 32.143 24Z" fill="white" fill-opacity="0.5"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M17.8702 10.6634L23 16V6L17.8702 10.6634Z" fill="white"/>
                    <path d="M7 16V31.0641H12L23 41V28.2069L33.8064 39.0133L37.0133 35.8064L7.2069 6L4 9.2069L10.7931 16H7Z" fill="white"/>
                </svg>
            </i>
        </div>
    </div>
</template>

<script>
export default {
    name: "volume",
    inject: ['v'],
    mounted(){
        let v = localStorage.getItem('volume')
        this.v.volume = v ? v : 1
    },
    data(){
        return {
            tink:'',
            temp: 0,
        }
    },
    watch:{
        'v.volume': function(val){
            localStorage.setItem('volume', val)
        }
    },
    methods:{
        toggle(){
            this.tink = this.tink === 'foo' ? 'bar' : 'foo'
            if(this.v.volume > 0){
                this.temp = this.v.volume
                this.v.volume = 0
            }
            else
                this.v.volume = this.temp ? this.temp : 0.2
        }
    }
}
</script>

<style lang="scss">
div.mew-vid-volume{
    position: relative;
    width: 40px;height: 25px;
    div.mew-vid-volume-wrapper:hover{
        div.slider{
            transform: rotate(-90deg) scaleX(1);
        }
    }
    div.slider{
        display: flex;
        position: absolute;left: -11px;top: -16px;
        transform-origin: left top;
        border-radius: 3px;
        backdrop-filter: blur(3px);
        background-color: rgba(0,0,0,.5);
        transform: rotate(-90deg) scaleX(0);
        &:hover{
            transform: rotate(-90deg) scaleX(1);
        }
        &::before{
            content: '';
            width: 140px;height: 46px;top: -4px;left: -40px;
        }
        progress{
            width: 80px;height: 4px;
            position: absolute;top: 17px;left: 10px;
            &::-webkit-progress-bar{
                border-radius: 10px;
                background-color: rgba(255,255,255,.3);
            }
            &::-webkit-progress-value{
                background:linear-gradient(90deg,#1092d3,#00bbff);
                border-radius: 10px;
            }
        }
        input{
            cursor: pointer;
            width: 100px;
            height: 38px;
            -webkit-appearance: none;
            background-color: transparent;
            &::-webkit-slider-runnable-track{
                width: 80px;height: 1px;
                position: absolute;left: 0;
                border-radius: 10px;
                transform: translateX(10px);
            }
            &::-webkit-slider-thumb {
                -webkit-appearance: none;
                width: 10px;height:10px;
                border-radius: 10px;
                transform: translateY(-4.2px);
                background-color: white;
                box-shadow: 0 0 4px rgba(0,0,0,.3);
            }
            &::-moz-range-thumb{

            }
        }
    }
    i{
        position: relative;
        width: 25px;height: 25px;
        cursor: pointer;
        @keyframes foo {
            0%{transform: scale(1)}
            100%{transform: scale(1.1)}
        }
        @keyframes bar {
            0%{transform: scale(1)}
            100%{transform: scale(1.1)}
        }
        &.foo{
            animation: foo .3s cubic-bezier(0.84, -1.13, 0.16, 2);
        }
        &.bar{
            animation: bar .3s cubic-bezier(0.84, -1.13, 0.16, 2);
        }
        path{
            fill: white;
        }
    }
}
</style>